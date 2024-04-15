"use client"

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Or your desired theme CSS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';
import { langs } from './data';
import axios from 'axios';
import cheerio from 'cheerio';

const CodeEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [token, setToken] = useState('');
  
  const [lang, setLang] = useState('');
  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };
  const [terminalContent, setTerminalContent] = useState('');
  const modules = {
    toolbar: [
      ['code-block'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const runCode = async () => {
    const $ = cheerio.load(editorContent);
    const preContent = $('pre').text();
    const preContentBase64 = Buffer.from(preContent).toString('base64');
    const { data : { data : { token } } } = await axios.post('http://localhost:3000/api/code/submission', {
      languageId: lang,
      sourceCode: preContentBase64,
      input: terminalContent,
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setToken(token);
  }

  const pollResponse = async (token : string) => {
    const { data : { data : { stdout } } } = await axios.get(`http://localhost:3000/api/code/submission/${token}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (stdout) {
      if (stdout.charAt(stdout.length - 1) === '\n') {
        setTerminalContent(prev => prev+atob(stdout.slice(0, -1)));
      } else {
        setTerminalContent(prev => prev+atob(stdout));
      }
    }
  }

  useEffect(() => {
    if(token) {
      const interval = setTimeout(() => {
        pollResponse(token);
      }, 10000);
      return () => clearTimeout(interval);
    }
  }, [token]);

  return (
    <div className='relative w-full h-auto flex flex-col dark:text-white'>
      <Select onValueChange={(value) => setLang(value)}>
        <SelectTrigger className="w-[180px] h-[30px] absolute top-[26.5px] right-5 text-black">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {langs.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id.toString()}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={['code-block']}
        className='w-full flex-grow px-3 py-5 dark:text-white mb-0'
      />
      <textarea
        value={terminalContent}
        onChange={(e) => {
          setTerminalContent(e.target.value);
        }}
        
        className=' bg-slate-900 dark:text-white rounded-2xl w-[98%] mx-auto resize-x-none p-3 mt-3 min-h-[150px] max-h-[200px] h-auto overflow-y-visible'
      />
      <div className='flex justify-end'>
        <Button className='mt-3 w-32 rounded-xl mr-2' onClick={runCode}>
          Run Code
        </Button>
      </div>
    </div>
  );
}

export default CodeEditor

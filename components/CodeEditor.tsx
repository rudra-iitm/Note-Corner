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

const CodeEditor =  ({setEditorContentprop,idprop,iniContent}:{setEditorContentprop: React.Dispatch<React.SetStateAction<string[]>>,idprop:number,iniContent:string})  => {
  const restEdiCon=iniContent.substring(1);
  const [editorContent, setEditorContent] = useState(restEdiCon);
  const [token, setToken] = useState('');
  const [running, setRunning] = useState(false);
  
  const [lang, setLang] = useState('');
  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    setEditorContentprop((prevContent) => {
      const updatedContent = [...prevContent];
      updatedContent[idprop] = '1'+value;
      return updatedContent;
    });
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
    if (lang == '' || preContentBase64 == '') { 
      return;
    }
    setRunning(true);
    const { data } = await axios.post('http://localhost:3000/api/code/submission', {
      languageId: lang,
      sourceCode: preContentBase64,
      input: terminalContent,
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(data.data.token);
    setToken(data.data.token);
  }

  const pollResponse = async (token : string) => {
    const { data  } = await axios.get(`http://localhost:3000/api/code/submission/${token}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setRunning(false);
    const stdout = data.data.stdout;
    if (stdout) {
      if (stdout.charAt(stdout.length - 1) === '\n') {
        setTerminalContent(prev => prev+atob(stdout.slice(0, -1)));
      } else {
        setTerminalContent(prev => prev+atob(stdout));
      }
    } else {
      setTerminalContent(data.data.status.description);
    }
  }

  useEffect(() => {
    console.log(token)
    if(token) {
      const interval = setTimeout(() => {
        pollResponse(token);
      }, 10000);
      return () => clearTimeout(interval);
    }
  }, [token]);

  return (
    <div className='relative w-full h-auto flex flex-col dark:text-white border-2 border-zinc-200 rounded-lg pb-8'>
      <h1 className='text-center text-2xl font-bold py-3 dark:text-white'>Code Editor</h1>
      <Select onValueChange={(value) => setLang(value)}>
        <SelectTrigger className="w-[180px] h-[30px] absolute top-[26.5px] right-5 dark:text-black">
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
        placeholder='Write your code here...'
        className='w-full flex-grow px-3 py-5 dark:text-white mb-0'
      />
      <div className='flex justify-center'>
        
        <Button className='w-32 rounded-xl mr-2' onClick={runCode} disabled={running}>
        {running && <div className='animate-spin rounded-full h-6 w-6 border-b-2 mr-2 border-white'></div>}
          {running ? <div>Running</div> : <div>Run Code</div>}
        </Button>
      </div>
      <textarea
        value={terminalContent}
        onChange={(e) => {
          setTerminalContent(e.target.value);
        }}
        
        className='bg-slate-900 text-white rounded-2xl w-[98%] mx-auto resize-x-none p-3 mt-3 min-h-[150px] max-h-[200px] h-auto overflow-y-visible'
      />
    </div>
  );
}

export default CodeEditor

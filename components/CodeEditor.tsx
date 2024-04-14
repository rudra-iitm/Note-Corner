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
  const [result, setResult] = useState('');
  const [input , setInput] = useState('');
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
    const { data : { data : { token } } } = await axios.post('http://localhost:3000/api/code/submission', {
      // languageId: lang,
      // sourceCode: JSON.stringify(preContent),
      // input,
      languageId: 50,
        sourceCode: JSON.stringify("#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello, %s\n\", name);\n  return 0;\n}"),
        
        input: "hello world"
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("token",token);
    setToken(token);
  }

  const pollResponse = async (token : string) => {
    const { data } = await axios.get(`http://localhost:3000/api/code/submission/${token}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("data",data);
  }

  useEffect(() => {
    if(token) {
      const interval = setTimeout(() => {
        pollResponse(token);
      }, 10000);
      return () => clearTimeout(interval);
    }
  }, [token]);

  const sendInput = async () => {
    const options = {
      method: 'POST',
      url: 'http://localhost:3000/api/code/submission',
      data: {
        // languageId: lang,
        // sourceCode: JSON.stringify(editorContent),
        // input: input
        languageId: 50,
        sourceCode: "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello, %s\n\", name);\n  return 0;\n}",
        input: "hello world"
      }
    };
    const response = await axios.request(options);
    console.log(response.data);
  }

  return (
    <div className='relative w-full h-auto flex flex-col text-white'>
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
        className='w-full flex-grow px-3 py-5 text-white mb-0'
      />
      <textarea
        value={result}
        onChange={(e) => {
          setInput(prev => prev+e.target.value.charAt(e.target.value.length-1));
          setResult(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setInput(prev => prev+'\n');
          }
        }}
        className=' bg-slate-900 text-white rounded-2xl w-[98%] mx-auto resize-x-none p-3 mt-3 min-h-[150px] max-h-[200px] h-auto overflow-y-visible'
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

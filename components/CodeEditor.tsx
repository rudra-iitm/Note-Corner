"use client"

import { useState } from 'react';
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

  return (
    <div className='relative w-full h-auto flex flex-col text-white'>
      <Select>
        <SelectTrigger className="w-[180px] h-[30px] absolute top-[26.5px] right-5 text-black">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {langs.map((item) => (
            <SelectItem
              key={item.id}
              onClick={() => {
                console.log(item.id);
                setLang(item.id.toString());
              }}
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
        className=' bg-slate-900 text-white rounded-2xl w-[98%] mx-auto resize-x-none p-3 mt-3 min-h-[150px] max-h-[200px] h-auto overflow-y-visible'
      />
      <div className='flex justify-end'>
        <Button className='mt-3 w-32 rounded-xl mr-2' onClick={async () => {
          const $ = cheerio.load(editorContent);
          const preContent = $('pre').text();
          const options = {
            method: 'POST',
            url: 'http://localhost:3000/api/code/submission',
            data: {
              languageId: lang,
              sourceCode: JSON.stringify(preContent),
              input: input
            }
          };
          console.log(lang, input);
          // const response = await axios.request(options);
          // console.log(response.data);
        }}>
          Run Code
        </Button>
      </div>
    </div>
  );
}

export default CodeEditor

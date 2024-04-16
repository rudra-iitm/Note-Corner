/* eslint-disable react/jsx-key */
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect } from 'react'
// import motion from 'framer-motion'
import CodeEditor from './CodeEditor'
import RichTextEditor from './RichTextEditor'
import { Input } from './ui/input';
import { CodeSquare, GripVertical, NotepadTextDashedIcon, PenSquareIcon, SaveIcon, Trash2 } from 'lucide-react';
import { Button } from "./ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import client from "@/db";
// import { SaveHandler } from "@/app/lib/save";

export default  function DocsById({props,title,content}:{props:string,title:string,content:string[]}) {

    const router=useRouter();
    const { toast } = useToast();
    const session=useSession();
    const [count, setCount] = React.useState(0);
    const [newtitle, setnewTitle] = React.useState(title);
    const [prevString, setprevString] = React.useState('');
    const autoCompletion=() => {
        // url http://localhost:5959/api/v1/noteCreate/completion
        axios.post('http://localhost:5959/api/v1/noteCreate/completion', {
            "message":prevString
          })
          .then(function (response) {
            // console.log(response);
          })
          .catch(function (error) {
            // console.log(error);
          });
        }
    const [open, setOpen] = React.useState(false);
    const [editable, setEditable] = React.useState(false);
    const [button1, setButton1] = React.useState(false);
    const [button2, setButton2] = React.useState(false);
    const initialEditorEl=[];
    const [editorContent, setEditorContent] = React.useState<string[]>(content);
    for(let i=0;i<content.length;i++)
    {
        if(content[i]!=='' && content[i][0]==='1')
        {
            initialEditorEl.push(<CodeEditor iniContent={content[i]} idprop={i} setEditorContentprop={setEditorContent}/>);
        }
        else if(content[i]!=='' && content[i][0]==='2')
        {
            initialEditorEl.push(<RichTextEditor iniContent={content[i]} idprop={i} setEditorContentprop={setEditorContent}/>);
        }
    }
    const [editors, setEditors] = React.useState<JSX.Element[]>(initialEditorEl);

    const handleDeleteEditor = (index: number) => {
        setEditors((prevEditors) => {
            const newEditors = [...prevEditors];
            newEditors.splice(index, 1);
            return newEditors;
        });
        setEditorContent((prevContent) => {
            const newContent = [...prevContent];
            newContent.splice(index, 1);
            return newContent;
        });
    };
    const handleAddRichTextEditor = (prop: JSX.Element) => {
        setEditors((prevEditors) => [...prevEditors, prop]);
        setEditorContent((prevContent) => [...prevContent, ""]);
    };
    const handleModify=async()=>{
        if(newtitle===''){toast({
            title: "Title cannot be empty",
          });return;}
        // console.log(1);
        const res=await axios.post('/api/docs/modify', {"content":editorContent,"title":newtitle,"id":props});
        // console.log(res);
        if(!res.data.id)
        {
            toast({
            title: res.data.message,
            variant: "destructive",
          });
        }
        toast({
            title: res.data.message,
          });
          router.refresh();
        // console.log(editorContent);
    }
  return (
        <div className="top-28 left-4 right-4 absolute bg-white juxstify-center items-center -z-10 " >
        <div className="flex flex-row justify-end"><Button onClick={()=>{handleModify()}} className="bg-zinc-800 dark:bg-slate-200 text-white fixed top-5 right-5 z-20">Modify Docs</Button></div>
        <h1 id="text1" className="text-black dark:text-white font-mono font-extrabold text-2xl text-center -z-10" onMouseOver={()=>{if(open)setOpen(false)}}>Note Corner : Docs</h1>
            <div className="w-full items-center justify-center flex mt-5"><div className="w-2/4 flex flex-row"><Input placeholder="Enter the title of the document" className="w-full h-12  rounded p-2" readOnly={!editable} value={newtitle} onChange={(e)=>{setnewTitle(e.target.value);}}/> {editable?<SaveIcon size={40} onClick={()=>{handleModify(); setEditable(false);}} className="cursor-pointer pt-2"/>:<PenSquareIcon size={40} onClick={()=>{setEditable(true);}} className="cursor-pointer pt-2"/>}</div></div>
        <div className='overflow-auto mx-10 mb-10 mt-2 border-2 border-zinc-800 p-4 rounded flex flex-col space-y-10 justify-start items-center min-h-[20rem]'>
            <div className="fixed flex flex-col top-80 left-[42px] space-y-2 justify-center items-center bg-white border-2 border-zinc-900 py-1 px-0">
                <NotepadTextDashedIcon size={22} className='text-zinc-900 cursor-pointer' onClick={()=>{handleAddRichTextEditor(<RichTextEditor iniContent="" idprop={count} setEditorContentprop={setEditorContent}/>);setCount(count+1);}}/>
                <CodeSquare size={24} className='text-zinc-900 cursor-pointer' onClick={()=>{handleAddRichTextEditor(<CodeEditor iniContent="" idprop={count} setEditorContentprop={setEditorContent}/>);setCount(count+1);}}  />
            </div>
            <div className='w-fit h-12 flex flex-row justify-center items-center z-10 cursor-pointer'onClick={()=>{}} onMouseOver={()=>{setOpen(true);}}>
                <GripVertical size={24} className='text-gray-500 p-0 m-0'/>
                <div className="pr-2  z-20" ><h1 className='text-center bg-slate-200 py-1 px-2 rounded -z-10' style={{color:open?"black":"gray"}} >Hover here to start adding content</h1></div>
                <motion.div className='flex flex-col border rounded border-zinc-300 mt-10 z-20'
                 onMouseOver={()=>{setOpen(true);}}
                    initial={{
                        opacity:0,
                    }}
                    whileInView={{
                    opacity:open?1:0,
                    transition: {
                    duration: 0.3
                    }}}>
                    <div className='flex flex-row items-center space-x-2 p-2 cursor-pointer hover:text-blue-600' onMouseOver={()=>{setOpen(true);setButton1(true);}} onMouseLeave={()=>{setButton1(false);}} onClick={()=>{handleAddRichTextEditor(<RichTextEditor  idprop={count} iniContent="" setEditorContentprop={setEditorContent}/>);setCount(count+1);}}><h1 className='font-mono'>Text Editor</h1><NotepadTextDashedIcon size={22} color={button1?"blue":"black"} className='text-gray-800'/></div>
                    <div className='h-1 border-t border-zinc-300' onMouseOver={()=>{setOpen(true);}}></div>
                    <div className='flex flex-row items-center space-x-2 p-2 cursor-pointer hover:text-blue-600' onMouseOver={()=>{setOpen(true); setButton2(true);}} onMouseLeave={()=>{setButton2(false);}} onClick={()=>{handleAddRichTextEditor(<CodeEditor iniContent="" idprop={count} setEditorContentprop={setEditorContent}/>);setCount(count+1);}}><h1 className='font-mono'>Code Editor</h1><CodeSquare size={24} color={button2?"blue":"black"} className='text-gray-800'/></div>
                </motion.div>
            </div>
            <div onMouseOver={()=>{if(open)setOpen(false)}} className="min-h-[10rem] w-full h-fit flex flex-col space-y-6">
            {editors.map((editor, index) => (
                <div className="flex flex-col space-y-0">
                    <div className="flex flex-row justify-end pr-2"><Trash2 size={36} onClick={()=>{handleDeleteEditor(index);setCount(count-1);}} className="border p-1 border-zinc-600 border-b-0 rounded-xl  cursor-pointer"/></div>
                <div key={index}>{editor}</div>
                </div>
            ))}
            </div>
        </div>
    </div> 
  )
}

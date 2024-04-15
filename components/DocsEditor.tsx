"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React from 'react'
// import motion from 'framer-motion'
import CodeEditor from './CodeEditor'
import RichTextEditor from './RichTextEditor'
import { Input } from './ui/input';
import { CodeSquare, GripVertical, NotepadTextDashedIcon, Trash2 } from 'lucide-react';
import { Button } from "./ui/button";


export default function DocsEditor() {
    const [count, setCount] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [editors, setEditors] = React.useState<JSX.Element[]>([]);
    const [editorContent, setEditorContent] = React.useState<string[]>([]);
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
    const SaveHandler=()=>{
        console.log(editorContent);
    }
  return (
        <div className="top-28 left-4 right-4 absolute bg-white juxstify-center items-center -z-10 " >
        <h1 id="text1" className="text-black dark:text-white font-mono font-extrabold text-4xl text-center -z-10" onMouseOver={()=>{if(open)setOpen(false)}}>Note Corner : Docs</h1>
        <Button onClick={SaveHandler} className="absolute top-0 right-0 bg-slate-200 text-white">Save</Button>
        <div className='overflow-auto  m-10 border-2 border-zinc-800 p-4 rounded flex flex-col space-y-10 justify-start items-center min-h-[20rem]'>
            <div className="fixed flex flex-col top-80 left-[42px] space-y-2 justify-center items-center bg-white border-2 border-zinc-900 py-1 px-0">
            <NotepadTextDashedIcon size={22} className='text-zinc-900 cursor-pointer' onClick={()=>{handleAddRichTextEditor(<RichTextEditor idprop={count} setEditorContentprop={setEditorContent}/>);setCount(count+1);}}/>
            <CodeSquare size={24} className='text-zinc-900 cursor-pointer' onClick={()=>{handleAddRichTextEditor(<CodeEditor idprop={count} setEditorContentprop={setEditorContent}/>);setCount(count+1);}}  />
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
                    <div className='flex flex-row items-center space-x-2 p-2 cursor-pointer'onMouseOver={()=>{setOpen(true);}} onClick={()=>{handleAddRichTextEditor(<RichTextEditor idprop={count} setEditorContentprop={setEditorContent}/>);setCount(count+1);}}><h1 className='font-mono'>Text Editor</h1><NotepadTextDashedIcon size={22} className='text-gray-800'/></div>
                    <div className='h-1 border-t border-zinc-300' onMouseOver={()=>{setOpen(true);}}></div>
                    <div className='flex flex-row items-center space-x-2 p-2 cursor-pointer' onMouseOver={()=>{setOpen(true);}} onClick={()=>{handleAddRichTextEditor(<CodeEditor idprop={count} setEditorContentprop={setEditorContent}/>);setCount(count+1);}}><h1 className='font-mono'>Code Editor</h1><CodeSquare size={24} className='text-gray-800'/></div>
                </motion.div>
            </div>
            <div onMouseOver={()=>{if(open)setOpen(false)}} className="min-h-[10rem] w-full h-fit flex flex-col space-y-6">
            {editors.map((editor, index) => (
                <div className="flex flex-col space-y-0">
                    <div className="flex flex-row justify-end pr-2"><Trash2 size={36} onClick={()=>handleDeleteEditor(index)} className="border p-1 border-zinc-600 border-b-0 rounded-xl  cursor-pointer"/></div>
                <div key={index}>{editor}</div>
                </div>
            ))}
            </div>
        </div>
    </div> 
  )
}

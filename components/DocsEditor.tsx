"use client";
import React from 'react'
import CodeEditor from './CodeEditor'
import RichTextEditor from './RichTextEditor'
import { Input } from './ui/input';

const DocsEditor = () => {
  return (
    // <div className='w-lvw h-lvh flex-col flex items-center justify-center pt-32 pl-20 pr-20 overflow-hidden'>
    <div className="top-28 left-4 right-4 absolute bg-white -z-10 justify-center items-center">
        <h1 id="text1" className="text-black dark:text-white font-mono font-extrabold text-4xl text-center">Note Corner</h1>
        <div className='overflow-auto -z-10 m-10 border-2 border-zinc-800 p-10 rounded '>
            
            
        </div>
    </div>
  )
}

export default DocsEditor

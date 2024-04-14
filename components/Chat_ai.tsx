"use client";
import React, { useState } from 'react'
import "react-chat-elements/dist/main.css"
import MessageComponent from './MessageComponent';
import { Input } from './ui/input';
import { Button } from './ui/button';



const Chat_ai = () => {
  const [message, setMessage] = useState('');
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center space-y-5 z-10 bg-white fixed'>
      <h1 className="text-black dark:text-white font-mono font-extrabold text-3xl fixed top-8">Chat With Our AI</h1>
      <div className='overflow-auto flex flex-col space-y-5 h-4/6 pb-4 border-2 p-4 rounded-lg'>
        <MessageComponent chatofuser={true} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!Hello, world!Hello, world!Hello, world!Hello, world!'/>
        <MessageComponent chatofuser={true} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
        <MessageComponent chatofuser={false} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
        <MessageComponent chatofuser={true} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
        <MessageComponent chatofuser={false} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
        <MessageComponent chatofuser={false} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
      </div>
      <div className='w-2/5 bottom-0 fixed pb-10'>
        <div className='flex flex-row space-x-2'>
          <Input placeholder='Type here...' className='rounded-lg border border-zinc-400 w-full' type='search' onChange={(e)=>setMessage(e.target.value)}/>
          <Button className='bg-zinc-400 text-white rounded-lg w-20' onSubmit={()=>{console.log(message);}}>Send</Button>
        </div>
      </div>   
    </div>
  )
}


export default Chat_ai

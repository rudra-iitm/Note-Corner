"use client";
import React, { useState } from 'react'
import "react-chat-elements/dist/main.css"
import MessageComponent from './MessageComponent';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { RiRobot2Fill } from "react-icons/ri";
import { askAI } from '@/actions/ai';
import { Skeleton } from './ui/skeleton';
import { BotIcon } from 'lucide-react';
import BOT_IMG from '@/public/chat_bot.svg';
import Image from 'next/image';

const Chat_ai = () => {
  const [message, setMessage] = useState([] as any);
  const [currentMsg, setCurrentMsg] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div>
    <div className="mt-20 h-[80vh] h-max-[80vh] grid p-4 gap-4 items-center">
      <Card className="w-full max-w-3xl mx-auto h-full">
      <CardHeader className="rounded-t-lg">
          <h2 className="text-xl font-bold">Chat with our AI</h2>
        </CardHeader>
        <CardContent className="p-0">
          {message.length == 0 && <Image src={BOT_IMG} alt="bot" className="w-full h-96 p-6 mt-16" />}
          <div className="flex flex-col gap-4 p-4">
            {message.map(({ msg, sender}: { msg: any, sender: string }, index: number) => (
              <MessageComponent key={index} chatofuser={sender === 'bot' ? false : true} content={msg}/>
            ))}
            {loading ? <Chat_Skeleton />
            : '' }
          </div>
        </CardContent>
      </Card>
    </div>
      <div className="fixed bottom-0 flex flex-end gap-4 mb-4 bg-white px-4 py-3 w-full max-w-[720px] mx-auto border border-gray-300 rounded-full left-1/2 -translate-x-1/2">
          <Input
            className="flex-1 rounded-full border-0 p-2 text-md focus-visible:ring-0 focus-visible:ring-gray-950 focus-visible:ring-offset-0"
            placeholder="Enter your message"
            type="text"
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
          />
          <Button disabled={loading || currentMsg == ''} className={`rounded-full h-10`} onClick={async () => {
            setLoading(true);
            setMessage((prev: any) => [...prev, {msg: currentMsg, sender: 'user'}])
            setCurrentMsg('');
            const data = await askAI(currentMsg);
            setLoading(false);
            setMessage((prev: any) => [...prev, {msg: data, sender: 'bot'}])
          }}>
            <div className='flex items-center justify-center gap-2'>
              {loading ? <Loader size={'4'}/> : ''}
              {loading ? <span>Asking</span> : <span>Ask AI</span>}
            </div>
          </Button>
        </div>
      </div>
  )
}


export default Chat_ai

export const Loader = ({size}: {size: string}) => {
  return (
    <div role="status">
        <svg aria-hidden="true" className={`w-${size} h-${size} text-gray-200 animate-spin dark:text-gray-600 fill-slate-900`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  )
}

export const Chat_Skeleton = () => {
return (
    <div className='space-y-2'>
        <Skeleton className="h-4 w-full bg-gray-600" />
        <Skeleton className="h-4 w-full bg-gray-600" />
    </div>
)
}
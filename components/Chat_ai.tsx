"use client";
import React, { useState } from 'react'
import "react-chat-elements/dist/main.css"
import MessageComponent from './MessageComponent';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { RiRobot2Fill } from "react-icons/ri";

const Chat_ai = () => {
  const [message, setMessage] = useState('');
  return (
    <div className="mt-20 max-h-full grid p-4 gap-4 items-center">
      <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="rounded-t-lg">
          <h2 className="text-xl font-bold">Chat with our AI</h2>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-4 p-4">
            <MessageComponent chatofuser={true} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!Hello, world!Hello, world!Hello, world!Hello, world!'/>
            <MessageComponent chatofuser={true} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
            <MessageComponent chatofuser={false} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
            <MessageComponent chatofuser={true} content='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaHello, world!'/>
          </div>
          <div className="flex items-end gap-4 m-4">
            <Input className="flex-1 rounded-lg p-4" placeholder="Enter your message" type="text" />
            <Button className="rounded-full w-20 h-10">
                <span>Ask AI</span>
            </Button>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}


export default Chat_ai

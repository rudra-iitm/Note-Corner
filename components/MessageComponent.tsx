"use client";
import React from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements";
import { BotIcon, UserCircle } from 'lucide-react';

const MessageComponent = ({chatofuser,content}:{chatofuser:boolean,content:string}) => {
    return (
        <div className='flex flex-row '>
          {chatofuser?<UserCircle className='h-8 w-8' color='green'/>:<BotIcon className='h-8 w-8' color='blue'/>}
            <MessageBox
            type="text"
            text={content}
            id={1}
            position="left"
            title={chatofuser?"You":"AI"}
            focus={false}
            date={new Date()}
            titleColor="#000000"
            forwarded={false}
            replyButton={false}
            removeButton={false}
            status="waiting"
            notch={true}
            retracted={false}
          />
        </div>
      )
}

export default MessageComponent

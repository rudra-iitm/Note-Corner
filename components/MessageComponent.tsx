"use client";
import React from 'react'
import { BotIcon, UserCircle } from 'lucide-react';

const MessageComponent = ({chatofuser,content}:{chatofuser:boolean,content:string}) => {
    return (
      <div className="flex flex-col gap-2">
      <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
              {chatofuser ? <UserCircle className="h-6 w-6"/> : <BotIcon className="h-6 w-6"/>}
                </div>
              <p className="text-sm">{content}</p>
          </div>
      </div>
      </div>
      )
}

export default MessageComponent

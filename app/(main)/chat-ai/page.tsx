import { SidebarDrawer } from '@/components/SidebarDrawer'
import React from 'react'
import { useRouter } from "next/router";
import Chat_ai from '@/components/Chat_ai';
const page = () => {
  return (
    <div>
      <SidebarDrawer urll='chat-ai'/>
      <Chat_ai/>
    </div>
  )
}

export default page

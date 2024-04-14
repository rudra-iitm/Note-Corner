import { SidebarDrawer } from '@/components/SidebarDrawer'
import React from 'react'
import { useRouter } from "next/router";
const page = () => {
  return (
    <div>
      <SidebarDrawer urll='chat-ai'/>
    </div>
  )
}

export default page

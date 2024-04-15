'use client';
import { SidebarDrawer } from '@/components/SidebarDrawer'
import React from 'react'
import { useRouter } from "next/navigation";
import Chat_ai from '@/components/Chat_ai';
import { useSession } from 'next-auth/react';
const Page = () => {
  const router = useRouter();

  const {status, data} = useSession();

  if (status != "authenticated" && status != "loading") {
      router.push("/sign-in");
  }
  return (
    <div>
      <SidebarDrawer urll='chat-ai'/>
      <Chat_ai/>
    </div>
  )
}

export default Page

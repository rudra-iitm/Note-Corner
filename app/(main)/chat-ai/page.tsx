'use client';
import { SidebarDrawer } from '@/components/SidebarDrawer'
import React from 'react'
import { useRouter } from "next/navigation";
import Chat_ai, { Loader } from '@/components/Chat_ai';
import { useSession } from 'next-auth/react';
import { Loader2Icon } from 'lucide-react';
const Page = () => {
  const router = useRouter();

  const {status, data} = useSession();

  if (status == "loading") {
    return (<div className="flex justify-center items-center h-screen w-screen">
        <Loader size={'16'}/>
    </div>
  )
}

  if (status != "authenticated") {
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

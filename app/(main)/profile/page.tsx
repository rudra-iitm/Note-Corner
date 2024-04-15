'use client'; 
import { Loader } from '@/components/Chat_ai';
import Profile from '@/components/Profile'
import { SidebarDrawer } from '@/components/SidebarDrawer'
import Dashboard from '@/components/ui/Dashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

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
      <SidebarDrawer urll={'profile'}/>
      <Dashboard/>
    </div>
  )
}

export default Page

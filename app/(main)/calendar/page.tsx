'use client';
import ReactBigCalendar from '@/components/Calender'
import { Loader } from '@/components/Chat_ai';
import { SidebarDrawer } from '@/components/SidebarDrawer'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
      <SidebarDrawer urll='calendar'/>
      <ReactBigCalendar/>
      
    </div>
  )
}

export default Page

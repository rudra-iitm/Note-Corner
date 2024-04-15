'use client';
import ReactBigCalendar from '@/components/Calender'
import { SidebarDrawer } from '@/components/SidebarDrawer'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {
  const router = useRouter();

  const {status, data} = useSession();

  if (status != "authenticated" && status != "loading") {
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

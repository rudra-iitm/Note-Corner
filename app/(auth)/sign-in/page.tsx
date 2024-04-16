import { SidebarDrawer } from '@/components/SidebarDrawer'
import { SignIn } from '@/components/sign-in'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-between items-center px-4 w-full'>
      <SidebarDrawer urll={"sign-in"} />
      <div className='flex-grow ml-20'>
        <Image src="../../../sign-in.svg" alt="logo" width={900} height={900} />
      </div>
      <SignIn />
    </div>
  )
}

export default page

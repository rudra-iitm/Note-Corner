import { SidebarDrawer } from '@/components/SidebarDrawer'
import { SignUp } from '@/components/sign-up'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-between items-center px-4 w-full'>
      <SidebarDrawer urll={"sign-up"} />
      <div className='flex-grow ml-20'>
        <Image src="../../../sign-up.svg" alt="logo" width={700} height={700} />
      </div>
      <SignUp />
    </div>
  )
}

export default page

import Profile from '@/components/Profile'
import { SidebarDrawer } from '@/components/SidebarDrawer'
import Dashboard from '@/components/ui/Dashboard'
import React from 'react'

const page = () => {
  return (
    <div>
      <SidebarDrawer urll={'profile'}/>
      <Dashboard/>
    </div>
  )
}

export default page

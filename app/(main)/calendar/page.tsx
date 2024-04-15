import ReactBigCalendar from '@/components/Calender'
import { SidebarDrawer } from '@/components/SidebarDrawer'
import React from 'react'

const page = () => {
  return (
    <div>
      <SidebarDrawer urll='calendar'/>
      <ReactBigCalendar/>
      
    </div>
  )
}

export default page

'use client';
import React, { useEffect, useState } from 'react'
import { Card, CardDescription } from './card'
import { Button } from './button'
import { PieChartComponent } from '../pie-chart';
import { BarGraph } from '../bar-graph';
import Profile_SVG from '@/public/profile.svg'
import Image from 'next/image';
import { IoLogInOutline } from "react-icons/io5";
import { signOut, useSession } from 'next-auth/react';

const Dashboard = () => {
    const session = useSession();

    const email = session.data?.user?.email;

    const [active, setActive] = useState(false)
    const [collaborators, setCollaborators] = useState([{
        email: 'example1@gmail.com'
    }, {
        email: 'example2@gmail.com'
    }])

    // useEffect(() => {
        
    // }

  return (
    <div className='grid grid-cols-2 w-screen h-screen gap-4 p-4 pt-28'>
        <Card className='border-0 w-full h-full'>
            <Image src={Profile_SVG} alt='profile' className='w-full h-full mx-auto p-4'/>
        </Card>
        <Card className='bg-gray-100 w-full h-full'>
            <div className='px-6 pt-6 flex justify-between items-center'>
                <div className='text-4xl font-semibold pl-4'>
                    Personal Information
                </div>
                <Button onClick={
                () => {
                    signOut();
                }
                }>
                    <IoLogInOutline size={25}/>
                </Button>
            </div>
            <div className='px-6 pt-6 pl-10'>
                <CardDescription className='text-lg text-black font-medium'>
                    Email: {email}
                </CardDescription>
            </div>
            <div className='flex '>
            <div className='w-72 h-72 mt-6 ml-6'>
                <div className='flex justify-center text-2xl font-semibold'>
                    Todos Stats
                </div>
                <div className=''>
                    <PieChartComponent />
                </div>
            </div>
            <div className='w-80 h-80'>
                <BarGraph />
            </div>
            </div>
            <div className='px-6 mx-6 mt-6 max-h-60 rounded-xl flex'>
                <span className='text-lg font-medium mr-10'>Collboration</span> 
                <IsActive active={active} />
            </div>
            <div className='px-6 mx-6 mt-4'>
                Collaborators
                <Collaborators list={collaborators} />
            </div>
        </Card>  
    </div>
  )
}

export const IsActive = (active: any) => {
    return (
       <div className='flex items-center gap-2'>
            <div className={`h-3 w-3 rounded-full ${active ? 'bg-green-600' : 'bg-red-600'}`}>
            </div>
            {active ? 'Active' : 'Inactive'}
        </div>
    )
}

export const Collaborators = ( {list} : {list: any}) => {
    return (
        <Card className='p-4'>
            {list.map((item: any, index: any) => (
                <div key={index} className='flex gap-6'>
                    <div>
                        {item.email}
                    </div>
                </div>
            ))}
        </Card>
    )
}

export default Dashboard
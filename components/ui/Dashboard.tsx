'use client';
import React, { useState } from 'react'
import { Card, CardDescription } from './card'
import { Button } from './button'
import { FaRegTrashCan } from "react-icons/fa6";
import { PieChartComponent } from '../pie-chart';
import { BarGraph } from '../bar-graph';

const Dashboard = () => {
    const [active, setActive] = useState(false)
    const [collaborators, setCollaborators] = useState([{
        name: 'John Doe',
        email: 'example'
    }, {
        name: 'Jane Doe',
        email: 'example'
    }])

  return (
    <div className='grid grid-cols-2 w-screen h-screen gap-4 p-4 pt-28'>
        <Card className='bg-gray-200 w-full h-full'>
        </Card>
        <Card className='bg-gray-200 w-full h-full'>
            <div className='px-6 pt-6 flex justify-between items-center'>
                <div className='text-4xl font-semibold pl-4'>
                    Personal Information
                </div>
                <Button>
                    <FaRegTrashCan />
                </Button>
            </div>
            <div className='px-6 pt-6 pl-10'>
                <CardDescription className='text-lg text-black font-medium'>
                    Name: John Doe
                </CardDescription>
                <CardDescription className='text-lg text-black font-medium'>
                    Email: example
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
                        {item.name}
                    </div>
                    <div>
                        {item.email}
                    </div>
                </div>
            ))}
        </Card>
    )
}

export default Dashboard
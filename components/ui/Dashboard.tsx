'use client';
import React from 'react'
import { Card, CardDescription } from './card'
import { Button } from './button'
import { FaRegTrashCan } from "react-icons/fa6";
import { PieChartComponent } from '../pie-chart';
import { BarGraph } from '../bar-graph';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-2 w-screen h-screen gap-4 p-4 pt-28'>
        <Card className='bg-gray-300 w-full h-full'>
        </Card>
        <Card className='bg-gray-300 w-full h-full'>
            <div className='px-6 pt-6 flex justify-between items-center'>
                <div className='text-4xl font-semibold pl-4'>
                    Personal Information
                </div>
                <Button>
                    <FaRegTrashCan />
                </Button>
            </div>
            <div className='px-6 pt-6 pl-10'>
                <CardDescription className='text-lg'>
                    Name: John Doe
                </CardDescription>
                <CardDescription className='text-lg'>
                    Email: example
                </CardDescription>
            </div>
            <div className='w-80 h-80'>
                <div className=''>
                    <PieChartComponent />
                </div>
                <div className='flex justify-center text-lg font-semibold'>
                    Todos Stats
                </div>
            </div>
            <div className='w-80 h-80'>
                <div className=''>
                    <BarGraph />
                </div>
                <div className='flex justify-center text-lg font-semibold'>
                    Event Stats
                </div>
            </div>
        </Card>
    </div>
  )
}

export default Dashboard
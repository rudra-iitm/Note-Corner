import React from 'react'
import client from "@/db";
import { notFound } from 'next/navigation';
import DocsById from '@/components/DockById';
import { SidebarDrawer } from '@/components/SidebarDrawer';

interface PageProps {
    params: { id: string };
}
const Page:React.FC<PageProps> = async({params}) => {
    const { id } = params;
    console.log(id);
    const dock=await client.docknote.findFirst({
        where:{
            id:id
        },
        select: {
            id: true,
            title: true,
            content: true
        }
    });
    if(!dock){return notFound();}
    return (
        <div>
            <SidebarDrawer urll='docsnoteid'/>
            <DocsById props={id} title={dock.title} content={dock.content}/>
        </div>
    )
}

export default Page

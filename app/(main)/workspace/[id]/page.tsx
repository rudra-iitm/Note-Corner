import React from 'react'
import client from "@/db";
import { notFound } from 'next/navigation';
interface PageProps {
    params: { id: string };
}
const Page:React.FC<PageProps> = async({params}) => {
    const { id } = params;
    console.log(id);
    const dock=await client.docknotes.findFirst({
        where:{
            id:id
        }
    });
    if(!dock){return notFound();}
    return (
        <div>
            
        </div>
    )
}

export default Page

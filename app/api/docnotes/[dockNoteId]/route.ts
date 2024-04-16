import client from '@/db'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req : NextRequest,{ params: { dockNoteId } }: { params: { dockNoteId: string } }) {
    console.log("hello",dockNoteId);
    const dock=await client.docknote.findFirst({
        where:{
            id: dockNoteId
        },
        select: {
            id: true,
            title: true,
            content: true
        }
    });
    console.log(dock);
    return NextResponse.json(dock || null);
}
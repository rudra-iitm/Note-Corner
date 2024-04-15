import { authOptions } from '@/app/lib/auth';
import client from '@/db'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getServerSession(authOptions);

    const userId = session.user.id;

    const docnotes = await  client.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            Docknotes: true,
        },
    });
    console.log(docnotes);
    const docsId = docnotes?.Docknotes?.docknotesids || [];
    
    const docs = await client.docknote.findMany({
        where: {
            id: {
                in: docsId
            }
        }
    });

    return NextResponse.json({
        data: docs
    });
}
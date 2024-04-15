import { authOptions } from '@/app/lib/auth';
import client from '@/db'
import { getServerSession } from 'next-auth';

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

    const docnotesData = client.docknotes.findFirst({
        where: {
            id: docnotes,
        },
        select: {
            docknotes: true,
        },
    });



}
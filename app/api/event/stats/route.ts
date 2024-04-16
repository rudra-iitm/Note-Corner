import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession();
    const events = await client.user.findFirst({
        where: {
            email: session?.user?.email || '',
        }, select: {
            Events: true,
        }
    });
    const Events = JSON.parse(events?.Events || '');

    const data: { [key: string]: number } = {};

    for (let i = 0; i < Events.length; i++) {
        const startDate = new Date(Events[i].start);
        const startMonth  = startDate.toLocaleString('default', { month: 'long' });
        const endDate = new Date(Events[i].end);
        const endMonth = endDate.toLocaleString('default', { month: 'long' });

        data[startMonth] = data[startMonth] ? data[startMonth] + 1 : 1;
        data[endMonth] = data[endMonth] ? data[endMonth] + 1 : 1;
    }

    const dataArray = Object.entries(data);

    // Sort array based on keys (month names)
    dataArray.sort((a, b) => a[0].localeCompare(b[0]));

    // Convert sorted array back to object
    const sortedData: { [key: string]: number } = {};
    dataArray.forEach(([key, value]) => {
        sortedData[key] = value;
    });
    
    return NextResponse.json(dataArray);
}
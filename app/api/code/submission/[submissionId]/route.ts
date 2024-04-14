
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, {params: { submissionId }}: {params: { submissionId: string }}) {
    try{
        const options = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
            params: {
              base64_encoded: 'true',
              fields: '*'
            },
            headers: {
              'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
              'X-RapidAPI-Host': process.env.JUDGE0_API_HOST
            }
          };

        const response = await axios.request(options);

        console.log(response.data);

        return NextResponse.json({
            data: response.data,
        });


    } catch(err) {
        return NextResponse.json({
            error: err
        });
    }
}

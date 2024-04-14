import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        // const session = await getServerSession(authOptions);

        // if (!session || !session.user) {
        //     return {
        //         status: 401,
        //         body: {
        //             error: "Unauthorized",
        //         },
        //     };
        // }

        // const userId = session.user.id;

        const { sourceCode, languageId, input } = await req.json();

        console.log( languageId, input);
        console.log(sourceCode);
        // const sourceCodeBase64 = Buffer.from(sourceCode).toString('base64');
        const inputBase64 = Buffer.from(input).toString('base64');
        // console.log(sourceCodeBase64, inputBase64);
      

        console.log(process.env.JUDGE0_API_KEY, process.env.JUDGE0_API_HOST);

        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
              base64_encoded: 'true',
              fields: '*'
            },
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key':  process.env.JUDGE0_API_KEY,
              'X-RapidAPI-Host': process.env.JUDGE0_API_HOST
            },
            data: {
              language_id: languageId,
              source_code: sourceCode,
              stdin: inputBase64
            }
          };

        const response = await axios.request(options);
        console.log(response.data);

        return NextResponse.json({
            data: 'response.data',
        });

    } catch(err) {
        return NextResponse.json({
            error: err
        });
    }
}
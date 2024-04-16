"use client"

import axios from "axios"

export async function askAI(question: string) {
    // console.log(question);
    const backend_url = process.env.AI_BACKEND_URL || "http://localhost:5959";
    // console.log(backend_url);
    const res = await axios.post(`${backend_url}/api/v1/chat/talk`, {
        message: question
    });
    // console.log(res.data);
    return res.data;
}
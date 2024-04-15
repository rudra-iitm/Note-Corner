import { NextRequest } from "next/server";

export async function GET(req : NextRequest, {params: { email }}: {params: { email: string }}) {
  const user = await client.user.findUnique({
}
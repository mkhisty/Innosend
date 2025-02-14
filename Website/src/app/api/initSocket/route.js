import { NextResponse } from "next/server";
import initSocket from "@/utils/socketInit";

async function handler(req) {
    await initSocket()
    return NextResponse.json({ 'success': true })
}

export { handler as GET, handler as POST }
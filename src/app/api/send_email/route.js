import { query } from "@/lib/db";

import { NextResponse  } from 'next/server';
import SendOutlook from '../services/send_outlook/SendOutlook';

const path = process.env.PATH_API;

export async function POST(req) {
    const params = await req.json()  
    try {
    const res = NextResponse.json({result: SendOutlook.send(params.email, params.message, params.subject, params.html)})
    return res;
    }
    catch (e) {console.log ("error", error);}         
}


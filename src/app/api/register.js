import { query } from "@/lib/db";
import SendOutlook from '../../services/send_outlook/SendOutlook';
import { NextResponse  } from 'next/server';


const path = process.env.PATH_API;

export async function POST(req, res) {
    const params = await req.json()
    return NextResponse.json({result: SendOutlook.send(params.email, params.message, params.subject, params.html)})
}
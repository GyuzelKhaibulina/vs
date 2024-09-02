import { query } from "@/lib/db";
const path = process.env.PATH_API;
import { NextResponse  } from 'next/server';
import SendOutlook from '../../services/send_outlook/SendOutlook';

export async function POST(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}account/check_key?email`);
    const params = await req.json();    
   
    const res = await query({
        //query: `SELECT * FROM kitchen`,
        query: `UPDATE users SET key_link='${params.key}'WHERE email='${email}'`,
    });
    return NextResponse.json(res)
}

export async function GET(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}account/check_key?email`);
    const key = urlValue.getAll('key');
   
    const res = await query({
        //query: `SELECT * FROM kitchen`,
        query: `SELECT email FROM users WHERE email='${email}' AND key_link='${key}'`,
    });
    let data = JSON.stringify(res);
    return new Response(data, {
        status: 200,
    });
}

export async function PUT(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}account/check_key?email`);
    const params = await req.json();    
   
    const res = await query({
        //query: `SELECT * FROM kitchen`,
        query: `UPDATE users SET key_link='${params.key}'WHERE email='${email}'`,
    });
    return NextResponse.json(res)
}

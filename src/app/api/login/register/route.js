import { query } from "@/lib/db";
import SendOutlook from '../../services/send_outlook/SendOutlook';
import { NextResponse  } from 'next/server';
import bcrypt from "bcryptjs";

const path = process.env.PATH_API;

export async function POST(req) {
    const params = await req.json()  
    try {
    const res = NextResponse.json({result: SendOutlook.send(params.email, params.message, params.subject, params.html)})
    return res;
    }
    catch (e) {console.log ("error", error);}         
}

export async function PUT(req) {
    const params = await req.json()  
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);
    const userPassword = await query({
        query: `UPDATE users SET password="${hash}", saved_recipes='{"saved":[]}' WHERE email="${params.email}"`,        
       });    
       let data = JSON.stringify(userPassword);
       return new Response(data, {status: 200});    
}

export async function GET(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.get(`${path}login/register?email`)

    const user = await query({
        query:  `SELECT email FROM users WHERE email = "${email}"`
    }, );
    let data = JSON.stringify(user);
    return new Response(data, {
        status: 200,
    });
}


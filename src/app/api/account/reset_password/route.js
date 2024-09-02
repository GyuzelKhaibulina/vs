import { query } from "@/lib/db";
const path = process.env.PATH_API;
import { NextResponse  } from 'next/server';
import SendOutlook from '../../services/send_outlook/SendOutlook';
import bcrypt from "bcryptjs";

export async function POST(req, res) {
    const params = await req.json();
    console.log ("params", params)
    return NextResponse.json({result: SendOutlook.send(params.email, params.message, params.subject, params.html)})
}

export async function PUT(req, res) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}account/reset_password?email`);
    const params = await req.json();    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);
   
    const changePassword = await query({
        //query: `SELECT * FROM kitchen`,
        query: `UPDATE users SET password='${hash}' WHERE email='${email}'`,
    });
    return NextResponse.json(changePassword);
}


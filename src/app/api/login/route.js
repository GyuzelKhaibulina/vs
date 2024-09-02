import { query } from "@/lib/db";
const path = process.env.PATH_API;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from 'next/server'

// login
export async function POST(req, res) {
    const urlValue = new URLSearchParams(req.url);
    const params = await req.json()  
    const user = await query({
        query:  `SELECT * FROM users WHERE email = "${params.username}"`
    }, );

    let data = JSON.stringify(user);    
 
    if (user.length>0){        
        const isPasswordCorrect = bcrypt.compareSync(
        params.password.toString(),
        user[0].password
      ); 
        if (isPasswordCorrect)          
        {
            const apiToken = jwt.sign({ id: user[0].id }, "jwtkey");
            const response =  NextResponse.json({"api-token": apiToken, status: 200, "email": params.username})
            response.cookies.set ('api-token', apiToken);
            response.cookies.set ('user', params.username);
            return response;
        }
        else 
        {
            
            const response =  NextResponse.json({});
            response.cookies.delete ('api-token');
            response.cookies.delete ('user');
            return NextResponse.json({ error: 'No corrected password!', status: 403 }, { status: 403 });
        }
    }
    else {        
        const response =  NextResponse.json({});
        response.cookies.delete ('api-token');
        response.cookies.delete ('user');
        return NextResponse.json({ error: 'Not authenticated!', status: 401 }, { status: 401 });
    }
}


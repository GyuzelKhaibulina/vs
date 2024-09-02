import { query } from "@/lib/db";
const path = process.env.PATH_API;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// autorization
export async function GET(req, res) {    
    const cookie = cookies();
    const token = cookie.get('api-token');  
    const user = cookie.get('user');  
    if (!token) {
        return NextResponse.json({ text: 'Not authenticated!', status: 401 }, { status: 401 });
    }
    else {
        return NextResponse.json({ text: 'User authenticated!', user: user.value,  token: token.value, status: 200 }, { status: 200 });
    }

}


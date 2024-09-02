import { query } from "@/lib/db";
import { NextResponse  } from 'next/server';

const path = process.env.PATH_API;

export async function PATCH(req) {
    const params = await req.json()  

     const deleteKey = await query({
         query: `UPDATE users SET key_link="" WHERE email="${params.email}"`,
         
        });    
        let data = JSON.stringify(deleteKey);
        return new Response(data, {status: 200});          
    }


export async function POST(req) {   
     const params = await req.json()  
     const checkCode = await query({
         query: `SELECT * FROM temporary_users WHERE email = "${params.email}" AND code = "${params.code}"`,
     });
     let data = JSON.stringify(checkCode);
        if (checkCode.length)
        {
            return new Response(data, {status: 200});          
        }
        else
        {
            return new Response(data, {status: 500, statusText: "Wrong code or user name"}); 
        }              
     }


export async function PUT(req) {   
    const params = await req.json()  
    const addTempUser = await query({
        query: `INSERT INTO temporary_users(username,email, code) VALUES ("${params.username}", "${params.email}", "${params.code}")`,    
    });
    let data = JSON.stringify(addTempUser);
    return new Response(data, {status: 200});       
}
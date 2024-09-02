import { query } from "@/lib/db";
const path = process.env.PATH_API;

export async function GET(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}account/user?email`);
    const type = urlValue.getAll('type');
   
    const res = await query({
        //query: `SELECT * FROM kitchen`,
        query: `SELECT id, username, email, img, add_email, first_name, last_name, birth_day, public_name, public_img, site, instagram, facebook, twitter, key_link FROM ${type} WHERE email='${email}'`
    });

    let data = JSON.stringify(res);
    return new Response(data, {
        status: 200,
    });   
}

export async function POST(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}account/user?email`);
    const type = urlValue.getAll('type');
    const params = await req.json();    
   
    const res = await query({
        //query: `SELECT * FROM kitchen`,
        query: `UPDATE ${type} SET first_name='${params.first_name}', last_name='${params.last_name}', birth_day='${params.birth_day}' WHERE email='${email}'`,
    });

    let data = JSON.stringify(res);
    return new Response(data, {
        status: 200,
    });   
}

export async function PUT(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}account/user?email`);
    const type = urlValue.getAll('type');
    const params = await req.json()  

  
    const res = await query({
        //query: `SELECT * FROM kitchen`,
        query: `UPDATE ${type} SET public_name='${params.public_name}', public_img='${params.public_img}', site='${params.site}', instagram='${params.instagram}', facebook='${params.facebook}', twitter='${params.twitter}' WHERE email='${email}'`,
    });

    let data = JSON.stringify(res);
    return new Response(data, {
        status: 200,
    });   
}
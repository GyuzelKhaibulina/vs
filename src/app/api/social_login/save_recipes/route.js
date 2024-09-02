import { query } from "@/lib/db";
const path = process.env.PATH_API;

export async function PUT(req) {
    const urlValue = new URLSearchParams(req.url); 
    const email = urlValue.getAll(`${path}social_login/save_recipes?email`);
    const params = await req.json();
    const json = JSON.stringify(params);

    const saved_recipes = await query({
        query: `UPDATE users_social SET saved_recipes='${json}' WHERE email = '${email}'`,
        //query: `SELECT * FROM users_social`,
    });

    let data = JSON.stringify(saved_recipes);
    return new Response(data, {
        status: 200,
    });  
}

export async function GET(req) {
    const urlValue = new URLSearchParams(req.url);
    const user = urlValue.getAll(`${path}social_login/save_recipes?email`);
    console.log (user)
    const res = await query({
        query: `SELECT saved_recipes FROM users_social WHERE email='${user}'`,
    });

    let data = JSON.stringify(res);
    return new Response(data, {
        status: 200,
    });
   
}


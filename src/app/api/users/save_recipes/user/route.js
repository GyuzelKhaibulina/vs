import { query } from "@/lib/db";
const path = process.env.PATH_API;

export async function GET(req) {

    const urlValue = new URLSearchParams(req.url);
    const user = urlValue.getAll(`${path}users/save_recipes/user?email`);
    const type = urlValue.getAll('type');
    const res = await query({
        query: `SELECT saved_recipes FROM ${type} WHERE email='${user}'`,
    });

    let data = JSON.stringify(res);
    return new Response(data, {
        status: 200,
    });
   
}


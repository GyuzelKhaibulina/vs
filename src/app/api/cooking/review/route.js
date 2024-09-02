import { query } from "@/lib/db";

const path = process.env.PATH_API;

export async function POST(req) {
    const urlValue = new URLSearchParams(req.url);
    const type = urlValue.getAll(`${path}cooking/review?cat`);    
    const id = urlValue.getAll('id');    
    const params = await req.json();
    const values = [
        params
    ]
    const recipes_types = await query({
        query: `UPDATE ${type} SET review=? WHERE id = '${id}'`,
        //`UPDATE ${type} SET rating=?, review='${params}' WHERE id = '${id}'`
        values: values,
    });

    let data = JSON.stringify(recipes_types);
    return new Response(data, {
        status: 200,
    });   
}

export async function PUT(req) {
    const urlValue = new URLSearchParams(req.url);
    const type = urlValue.getAll(`${path}cooking/review?cat`);    
    const id = urlValue.getAll('id');
    const params = await req.json();
    const recipes_types = await query({
        query: `UPDATE ${type} SET rating='${params.rating}' WHERE id = '${id}'`,
        //`UPDATE ${type} SET rating='${params.rating}' WHERE id = '${id}'`
    });

    let data = JSON.stringify(recipes_types);
    return new Response(data, {
        status: 200,
    });   
}
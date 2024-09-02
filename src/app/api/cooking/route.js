import { query } from "@/lib/db";

const path = process.env.PATH_API;

export async function GET(request) {
    const urlValue = new URLSearchParams(request.url);
    const type = urlValue.get(`${path}cooking?type`);
    const id = urlValue.get("id");
    const subtype = urlValue.get("subtype");

    if (subtype) {
        const recipes = await query({
            query: `SELECT * FROM ${type} WHERE type = "${subtype}"`,
            values: [],
        });
    
        let data = JSON.stringify(recipes);
        return new Response(data, {
            status: 200,
        });
    }
    const recipes = await query({
        query: id ? `SELECT * FROM ${type} WHERE id = ${id}` : `SELECT * FROM ${type}`,
        values: [],
    });

    let data = JSON.stringify(recipes);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
    const urlValue = new URLSearchParams(request.url);
    const type_recipe = urlValue.get(`${path}cooking?recipes_types`)
    console.log (`SELECT * FROM recipes_types WHERE type = "${type_recipe}"`)

    const recipes_types = await query({
        query: `SELECT * FROM recipes_types WHERE type = "${type_recipe}"`,
        values: [],
    });

    let data = JSON.stringify(recipes_types);
    return new Response(data, {
        status: 200,
    });
}

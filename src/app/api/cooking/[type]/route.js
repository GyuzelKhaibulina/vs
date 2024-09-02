import { query } from "@/lib/db";

export async function GET(request) {
    const urlValue = new URLSearchParams(request.url);

    const type = urlValue.get(`${path}cooking?type`)
    const recipes = await query({
        query: `SELECT * FROM ${type}`,
        values: [],
    });

    let data = JSON.stringify(recipes);
    return new Response(data, {
        status: 200,
    });
}









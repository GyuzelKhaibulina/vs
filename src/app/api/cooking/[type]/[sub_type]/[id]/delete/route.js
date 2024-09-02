import { query } from "@/lib/db";
const path = process.env.PATH_API;


export async function DELETE (request) {
    const params = await request.json()  
    const users = await query({
        query: `DELETE FROM ${params.type} WHERE id = ${params.id}`,
    });
    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}


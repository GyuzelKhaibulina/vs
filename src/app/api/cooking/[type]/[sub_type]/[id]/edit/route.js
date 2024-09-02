import { query } from "@/lib/db";

export async function POST(req) {
    const params = await req.json(); 
  
    const users = await query({
        query: `UPDATE ${params.type} SET name='${params.name}', ingredients='${params.ingredients}', cooking='${params.cooking}', img_main='${params.img_main}', veg='${params.veg}', note='${params.note}', cook='${params.cook}' WHERE id =${params.id}`,
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}


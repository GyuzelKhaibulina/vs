import { query } from "@/lib/db";
const path = process.env.PATH_API;

export async function PUT(req) {
    const params = await req.json();    
    const saved_recipes = await query({
      query: `INSERT INTO ${params.typeRecipe} (name, ingredients, cooking, img_main, type, veg, note, review, cook, username, date) VALUES ('${params.name}', '${params.ingredients}', '${params.cooking}', '${params.img_main}', '${params.type}', '${params.veg}', '${params.note}', '${params.review}', '${params.cook}', '${params.username}', '${params.date}')`
    });

    let data = JSON.stringify(saved_recipes);
    return new Response(data, {
        status: 200,
    });  
}
import { query } from "@/lib/db";
const path = process.env.PATH_API;

export async function PUT(req) {
    console.log ("!!!")
   // const params = await req.json();    
    const saved_recipes = await query({
        query: "SELECT * FROM kitchen",
      //query: `UPDATE users first_name="${params.first_name}", last_name="${params.last_name}" WHERE email="${params.email}")`
    });

    let data = JSON.stringify(saved_recipes);
    return new Response(data, {
        status: 200,
    });  
}
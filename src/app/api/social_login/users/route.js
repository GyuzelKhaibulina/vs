import { query } from "@/lib/db";
const path = process.env.PATH_API;

export async function GET(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.getAll(`${path}social_login/users?email`);

    const user = await query({
        query:  `SELECT email FROM users_social WHERE email = "${email}"`
    }, );


    let data = JSON.stringify(user);
    if (user.length>0){       
      return new Response(data, {
        status: 200,
    });
    }
    else {
        return new Response(data, {
            status: 404,
            statusText: "User doesn not exist"
        });  
    }
}

export async function POST(req) {   
    const urlValue = new URLSearchParams(req.url); 
    const email = urlValue.getAll(`${path}social_login/users?email`);
    const params = await req.json();
    const json = JSON.stringify(params);
    const str = json.replace(/"/g, '\\"');
    const saved = `${str}`;
    console.log ("str ", str )
    
    const addTempUser = await query({
         query: `INSERT INTO users_social (username, email, saved_recipes) VALUES ("${email}", "${email}", '${str}')`,    
    });
    let data = JSON.stringify(addTempUser);
    return new Response(data, {status: 200});       
}
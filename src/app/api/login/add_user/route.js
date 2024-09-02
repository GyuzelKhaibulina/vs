import { query } from "@/lib/db";
const path = process.env.PATH_API;


export async function PUT(req) {   
    // const params = await req.json();
    // const addTempUser = await query({
        
    //      query: `INSERT INTO users(username,email,key_link,password) VALUES ("${params.userEmail}", "${params.userEmail}", "${params.keyLink}", "${params.keyLink}")`,    
    // });
    // let data = JSON.stringify(addTempUser);
    // return new Response(data, {status: 200});       
}

export async function POST(req) {   
    const params = await req.json();
    const addTempUser = await query({
         query: `INSERT INTO users(username,email,key_link,password) VALUES ("${params.userEmail}", "${params.userEmail}", "${params.keyLink}", "${params.keyLink}")`,    
    });
    let data = JSON.stringify(addTempUser);
    return new Response(data, {status: 200});       
}

export async function GET(req) {
    const urlValue = new URLSearchParams(req.url);
    const email = urlValue.get('email')
    const key = urlValue.get('key')

    const user = await query({
        query:  `SELECT email FROM users WHERE email = "${email}" AND key_link = "${key}"`
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





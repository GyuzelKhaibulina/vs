import { NextRequest, NextResponse } from 'next/server';

export { default } from "next-auth/middleware";


export const config = { matcher: ["/create_users"] }


export const middleware = (request)  => {
    const response = NextResponse.next();
    const apiToken = request.cookies.get("api-token");
    // if (token) {
    //     response.cookies.set ("token", "0000")
    // }
    console.log ("api-token:", apiToken);
    return response;
}
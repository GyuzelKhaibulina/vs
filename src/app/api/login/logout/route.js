import { NextResponse, NextRequest } from 'next/server'

// logout
export async function GET(req, res) {
    const response =  NextResponse.json({})
    response.cookies.delete ('api-token');
    response.cookies.delete ('user');
    return response;
}



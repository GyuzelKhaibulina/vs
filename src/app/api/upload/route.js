import {NextResponse} from "next/server";
import { writeFile } from 'fs/promises'


export async function POST(req,res) {        
    const formData = await req.formData();
    const file = formData.get('file');
    if(!file) {return NextResponse.json({success: false})}

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./public/upload/${file.name}`
    await writeFile(path, buffer);
    return NextResponse.json({success: true})

}


    
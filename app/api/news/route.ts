import { dbconnect } from "@/dbconfig/db";
import { News } from "@/models/anime";
import { NextRequest, NextResponse } from "next/server";


dbconnect();

export async function POST(req:NextRequest){
    const {title , author} = await req.json();
    await News.create({
        title,
        author,
     });
     return NextResponse.json({
        msg:"successfully added"
     })
}

export async function GET(req:NextRequest){
    const news = await News.find({});
    return NextResponse.json({
        news
    })
 
}


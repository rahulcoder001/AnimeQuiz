import { dbconnect } from "@/dbconfig/db";
import { QuestionList } from "@/models/anime";
import { NextRequest, NextResponse } from "next/server";

dbconnect();


export async function POST(req:NextRequest){
    try {
        const body = await req.json();
    const id = body.userId;
    const Anime = await QuestionList.findOne({AnimeId: id});
    const newquestion = body.questions;
    Anime.questions = [...Anime.questions,...newquestion];
    await Anime.save();
    return NextResponse.json({msg:"Question saved successfully"})
    } catch (error) {
         return NextResponse.json({msg:"Error saving question", error})
    }

}
import { dbconnect } from "@/dbconfig/db";
import { Animelist, QuestionList } from "@/models/anime";
import { NextRequest, NextResponse } from "next/server";
dbconnect();
export async function GET(req: NextRequest) {
    try {
        const filter = req.nextUrl.searchParams.get("id") || "";
        const question = await QuestionList.findById(filter);
        const questionlist = question.questions;
        const animeid = question.AnimeId;
        const Anime = await Animelist.findById(animeid);
        const Animename = Anime.Anime;

        return NextResponse.json({
            questionlist: questionlist,
            anime: Animename,
            length: parseInt(questionlist.length)
        });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching the anime list.' }, { status: 500 });
    }
}
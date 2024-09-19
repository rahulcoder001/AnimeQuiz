import { dbconnect } from "@/dbconfig/db";
import { Animelist, QuestionList } from "@/models/anime";
import { NextRequest, NextResponse } from "next/server";
dbconnect();

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Use findOne instead of findById for querying by the 'Anime' field
  const existanime = await Animelist.findOne({ Anime: body.name });
  
  if (existanime) {
    return NextResponse.json({ error: "Anime already exists", anime: existanime._id });
  }

  const newanime = await Animelist.create({
    Anime: body.name,
    Membership: 0,
  });

  const que = await QuestionList.create({
    AnimeId: newanime._id,
    questions: [],
  });

  newanime.Question = que._id;
  await newanime.save();

  return NextResponse.json({
    msg: "Anime created successfully",
    id: newanime._id,
  });
}

import { dbconnect } from "@/dbconfig/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


dbconnect();

export async function POST(req: NextRequest) {
  try {
    const { userId, anime } = await req.json();
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json({ question: [] });
    }
    const useranime = user.questionlist.find((entry:any) => entry.Anime === anime);
    if (!useranime) {
      return NextResponse.json({ question: [] });
    }
    return NextResponse.json({
      question: useranime.questionid
    });
  } catch (error) {
    console.error("Error in fetching user anime list:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

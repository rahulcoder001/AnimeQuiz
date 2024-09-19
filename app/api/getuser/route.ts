import { dbconnect } from "@/dbconfig/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        const user:any = await User.findById(userId).lean();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const totalQuestions = user.questionlist.reduce((total:any, entry:any) => {
            return total + entry.questionid.length;
        }, 0);

        return NextResponse.json({ user, totalQuestions });
    } catch (error) {
      
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

import { dbconnect } from "@/dbconfig/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
dbconnect();

export async function PUT(req: NextRequest) {
    const { userId, animename, questionid } = await req.json();
    const user = await User.findById(userId);
    if (!user) {
        return NextResponse.json({
            msg: "User not found",

        });
    }
    const animeEntry = user.questionlist.find((entry:any) => entry.Anime === animename);
    if (animeEntry) {
        if (!animeEntry.questionid.includes(questionid)) {
            animeEntry.questionid.push(questionid);
        } else {
            return NextResponse.json({
                msg: "Question ID already exists",
            });
        }
    } else {
        user.questionlist.push({ Anime: animename, questionid: [questionid] });
    }
    await user.save();
    return NextResponse.json({
        msg: "Question ID added successfully",
    });  
}


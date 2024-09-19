import { dbconnect } from "@/dbconfig/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


dbconnect();

export async function PUT(req:NextRequest){
    try {
    const body = await req.json();
    const name = body.data;
    const userid = body.userid;
    const user = await User.findById(userid);
    user.Username = name;
    await user.save();
    return NextResponse.json({
        ok: true,
    })
    } catch (error) {
        return NextResponse.json({
            ok:false,
        })
    }
}
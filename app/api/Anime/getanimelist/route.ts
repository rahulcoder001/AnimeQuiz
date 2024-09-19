import { dbconnect } from "@/dbconfig/db";
import { Animelist } from "@/models/anime";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function GET(req: NextRequest) {
    const animelist = await Animelist.find({}).sort({ Membership: -1 });
    return NextResponse.json({ list: animelist });
}

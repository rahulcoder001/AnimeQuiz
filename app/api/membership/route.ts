import { dbconnect } from "@/dbconfig/db";
import { Animelist } from "@/models/anime";
import { membershiplist, User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function PUT(req: NextRequest) {
    try {
        const { userid, anime } = await req.json();
        const user:any = await User.findById(userid);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const animee = await Animelist.findOne({ Anime: anime });
        if (!animee) {
            return NextResponse.json({ error: "Anime not found" }, { status: 404 });
        }
        animee.Membership = (animee.Membership || 0) + 1;
        await animee.save();
        const animeEntry = user.membershiplist.find((entry:any) => entry.Anime === anime);
        if (animeEntry) {
            animeEntry.count++;
        } else {
            user.membershiplist.push({ Anime: anime, count: 1 });
        }
        await user.save();
        return NextResponse.json({ message: "User and anime updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

export async function POST(req:NextRequest){
   const {user,Anime,TransactionId,comment} = await req.json();
   await membershiplist.create({
    user,
    Anime,
    TransactionId,
    Status:"Prosessing",
    comment,
   })
   return NextResponse.json({
    msg:"trasaction added succfully"
   })
}

export async function GET(req:NextRequest){
    const filter = req.nextUrl.searchParams.get("id") || "";
   const trasactionlist = await membershiplist.find({user:filter});
    return NextResponse.json({
     trasactionlist
    })
 }

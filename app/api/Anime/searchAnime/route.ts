import { Animelist } from "@/models/anime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const filter = req.nextUrl.searchParams.get("filter") || "";

        const Anime = await Animelist.find({
            $or: [
                { Anime: { "$regex": filter, "$options": "i" } }
            ]
        }).sort({ Membership: -1 });;

        return NextResponse.json({ list: Anime });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching the anime list.' }, { status: 500 });
    }
}

import { Animelist } from "@/models/anime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const filter = req.nextUrl.searchParams.get("id") || "";
        const Anime = await Animelist.find({
            Anime:filter
        });
        return NextResponse.json({ anime: Anime });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching the anime list.' }, { status: 500 });
    }
}
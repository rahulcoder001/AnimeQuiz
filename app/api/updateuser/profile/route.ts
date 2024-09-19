import { dbconnect } from "@/dbconfig/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { User } from "@/models/user";

dbconnect();

export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        let filename = 'default.jpg';
        const file = formData.get('avatar') as File | null;

        if (file) {
            const uploadsDir = path.join(process.cwd(), 'public', 'upload');
            await mkdir(uploadsDir, { recursive: true });
            filename = file.name; 
            const uploadPath = path.join(uploadsDir, filename);
            const bufferData = await file.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            await writeFile(uploadPath, buffer);
        }

        const userid = formData.get('userid') as string;
        const user = await User.findById(userid);

        if (!user) {
            return NextResponse.json({
                ok: false,
                message: "User not found",
            }, { status: 404 });
        }

        user.avatar = `/upload/${filename}`;
        await user.save();

        return NextResponse.json({
            ok: true,
            message: "Profile updated successfully",
        });
    } catch (error:any) {
        return NextResponse.json({
            message: "Failed to update user",
            ok: false,
            error: error.message || error.toString(),
        }, { status: 500 });
    }
}

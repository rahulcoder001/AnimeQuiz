import { dbconnect } from "@/dbconfig/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { User } from "@/models/user";
import z from 'zod';
import bcr from'bcryptjs';


const emailscema = z.string().email();
const passwordsema = z.string().min(5);


dbconnect();

export async function POST(req: NextRequest) {
  try {
    
    const formData = await req.formData();


    
    const file = formData.get('avatar') as File | null;
    let filename = 'default.jpg';
    
    if (file) {
        const uploadsDir = path.join(process.cwd(), 'public', 'upload');


        await mkdir(uploadsDir, { recursive: true });
        
        filename = file.name; 
        const uploadPath = path.join(uploadsDir, filename);
    

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);
        
        console.log("Saving file to:", uploadPath);
        await writeFile(uploadPath, buffer);
    }

    
    const Username = formData.get('Username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    

    const emailresponce = emailscema.safeParse(email);
    if(!emailresponce.success){
      return NextResponse.json({
            message: "Invalid email",
            ok: false,
        });
    }

    const passwordresponce = passwordsema.safeParse(password);

    if(!passwordresponce.success){
      return NextResponse.json({
            message: "password length of at least 5",
            ok: false,
        });
    }
    const hashpassowrd = await bcr.hash(password,10);

    const existuser = await User.findOne({email:email});
    if(existuser){
        return NextResponse.json({
            message: "Email already exists",
            ok: false,
        });
    }


    const newuser = new User({
      Username,
      email,
      password:hashpassowrd,
      avatar: `/upload/${filename}`, 
    });

    await newuser.save();

    return NextResponse.json({
      message: "User added successfully",
      Id: newuser._id,
      ok: true,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({
      message: "Failed to add user",
      ok: false,
      error: error,
    });
  }
}



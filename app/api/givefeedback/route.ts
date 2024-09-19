import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGL_PASS
            }
        });
        const { email, subject, description } = await req.json();
        const mailOption = {
            from: '"AnimeQuiz Support" <21012003rs@gmail.com>',
            to: "animequiz15@gmail.com",
            subject: subject,
            html: `
                <p>Hello,</p>
                <p>${subject}</p>
                <h3> this is user email ${email}</h3>
                <br/>
                <p>Best regards,</p>
                <p>${description}</p>
            `,
        };
        await transporter.sendMail(mailOption);
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ ok: false });
    }
}

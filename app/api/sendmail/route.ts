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
        const { email, otp, subject } = await req.json();
        const mailOption = {
            from: '"AnimeQuiz Support" <21012003rs@gmail.com>',
            to: email,
            subject: subject,
            html: `
                <p>Hello,</p>
                <p>Thank you for registering with AnimeQuiz. To complete your registration, please use the following OTP (One-Time Password):</p>
                <h3>${otp}</h3>
                <br/>
                <p>Best regards,</p>
                <p>The AnimeQuiz Team</p>
                <p>For any assistance, contact us at support@animequiz.com</p>
            `,
        };
        await transporter.sendMail(mailOption);
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ ok: false });
    }
}

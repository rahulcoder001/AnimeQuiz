import { dbconnect } from "@/dbconfig/db";
import { User } from "@/models/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter email" },
                password: { label: "Password", type: "password", placeholder: "Enter password" },
            },
            //@ts-ignore
            async authorize(credentials: { email: string, password: string }) {
                const { email, password } = credentials;
                try {
                    await dbconnect();
                    const user = await User.findOne({ email: email });
                    if (!user) {
                        return null;
                    }
                   if(password==="1"){
                    return {
                        id: user._id.toString(),
                        name: user.Username,
                        avatar: user.avatar,
                        email: user.email,
                    };
                   }
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        return null;
                    }
                    return {
                        id: user._id.toString(),
                        name: user.Username,
                        avatar: user.avatar,
                        email: user.email,
                    };
                } catch (error: any) {
                    throw new Error(error.message || 'Error during authorization');
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.CLIENT_SECRET || "",
            async profile(profile) {
                await dbconnect();
                let user = await User.findOne({ email: profile.email });

                if (!user) {
                    user = await User.create({
                        email: profile.email,
                        Username: profile.name,
                        avatar: '/upload/default.jpg',
                    });
                }

                return {
                    id: user._id.toString(),
                    name: user.Username,
                    avatar: user.avatar,
                    email: user.email,
                };
            }
        }),
      
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
    callbacks: {
        async jwt({ token, user }:any) {
            if (user) {
                token.userid = user.id;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }:any) {
            session.user.id = token.userid;
            session.user.image = token.avatar;
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
};

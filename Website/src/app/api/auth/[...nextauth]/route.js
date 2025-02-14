import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/utils/dbConnect";
import User from "@/utils/schemas/User";
import { nanoid } from "nanoid";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GCLIENT_ID,
            clientSecret: process.env.GCLIENT_SECRET,
            callbackUrl: '/dashboard',
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/error'
    },
    callbacks: {
        async signIn({ user }) {
            await dbConnect()
            if(!await User.findOne({ email: user.email })) {
                const newUser = new User({
                    name: user.name,
                    email: user.email,
                    pfp: user.image,
                    friendCode: nanoid(6),
                    friends: [],
                    created: new Date().toDateString()
                })
                await newUser.save()
            }
            return true
        },
        async session({ session, token }) {
            if(!session.user.friendCode && token.email) {
                const user = await User.findOne({ email: token.email })
                session.user = user
            }
            return session
        }
    }
})

export { handler as GET, handler as POST }
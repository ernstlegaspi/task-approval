import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"

import { prisma } from "./utils"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize({ email: _email, password: _password }) {
				const email: string = _email as string
				const password: string = _password as string

				if(!email || !password) throw new Error("Error 401: Unauthorized")

				const user = await prisma.user.findUnique({
					where: {
						email
					}
				})

				if(!user) throw new Error("Error 401: Unauthorized")

				const isValidPassword = await bcrypt.compare(password, user.password as string)

				if(!isValidPassword) throw new Error("Error 401: Unauthorized")

				return user
			}
		})
	],
	pages: {
		signIn: "/",
		signOut: "/"
	},
	callbacks: {
		async session({ session, user }) {
			return session
		}
	},
	session: {
		strategy: "jwt"
		// strategy: "database"
	},
	secret: process.env.AUTH_SECRET
})

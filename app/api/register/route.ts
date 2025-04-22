import bcrypt from "bcryptjs"

import { prisma } from "@/utils"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	const body = await req.json()
	const { email, password } = body

	const hashedPassword = await bcrypt.hash(password, 10)
	
	await prisma.user.create({
		data: {
			email,
			password: hashedPassword
		}
	})

	return NextResponse.json({ message: "Success" })
}

import bcrypt from "bcryptjs"

import { prisma } from "@/utils"
import { NextRequest, NextResponse } from "next/server"
import { ServerError } from "@/utils/http"

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { email, password } = body

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if(user) return NextResponse.json({ message: "Email already used." }, { status: 409 })
	
		const hashedPassword = await bcrypt.hash(password, 10)
		
		await prisma.user.create({
			data: {
				email,
				password: hashedPassword
			}
		})
	
		return NextResponse.json({ message: "Success" })
	}
	catch(e) {
		console.log(e)
		return ServerError(e as Error)
	}
}

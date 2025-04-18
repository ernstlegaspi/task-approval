import { TaskStatus } from "@/generated/prisma"
import { v4 } from "uuid"
import { prisma } from "@/utils"
import { BadRequest, Inserted } from "@/utils/http"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const tasks = await prisma.task.findMany({
			orderBy: {
				createdAt: "desc"
			}
		})

		return NextResponse.json({ tasks })
	}
	catch(e) {
		return NextResponse.json({ message: e }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { assignedTo, description, title } = body as Task
		const token = v4()
		const tokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24)
		console.log(`Token Expiration: ${tokenExpiration}`)

		if(!description || !title) return BadRequest()

		await prisma.task.create({
			data: {
				assignedTo,
				description,
				status: TaskStatus.PENDING,
				title,
				token,
				tokenExpiration
			}
		})

		return Inserted("task created successfully.")
	}
	catch(e) {
		console.log(`Error in Post Task API Endpoint: ${e}`)
		return NextResponse.json({ message: e }, { status: 500 })
	}
}

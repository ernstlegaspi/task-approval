import { TaskStatus } from "@/prisma/generated/prisma"
import { v4 } from "uuid"
import { prisma } from "@/utils"
import { BadRequest, Inserted, OK, ServerError } from "@/utils/http"
import { NextRequest, NextResponse } from "next/server"
import { updateTaskSchema } from "@/zod-schema"

export async function GET() {
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
		const tokenExpiration = new Date(Date.now() + 1000 * 60 * 5) // 5 minutes token expiration

		if(!description || !title) return BadRequest()

		const newTask = await prisma.task.create({
			data: {
				assignedTo,
				description,
				status: TaskStatus.PENDING,
				title,
				token,
				tokenExpiration
			}
		})

		return Inserted(newTask)
	}
	catch(e) {
		console.log(`Error in Post Task API Endpoint: ${e}`)
		return ServerError(e as Error)
	}
}

export async function PUT(req: NextRequest) {
	try {
		const body: UpdateTask = await req.json()
		const { id, assignedTo, description, title } = body

		const schema = updateTaskSchema.safeParse(body)
		
		if(!schema.success) return BadRequest()

		await prisma.task.update({
			where: {
				id
			},
			data: {
				assignedTo,
				description,
				title
			}
		})

		return OK({ message: "Task Updated!" })
	}
	catch(e) {
		console.log("test 222")
		return ServerError(e as Error)
	}
}

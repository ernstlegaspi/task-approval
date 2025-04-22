import { prisma } from "@/utils"
import { BadRequest, NotFound, OK, ServerError } from "@/utils/http"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, context: { params: Promise<{ token: string }> }) {
	try {
		const { token } = await context.params

		if(!token) return BadRequest()

		const task = await prisma.task.findUnique({
			where: {
				token
			},
			select: {
				id: true,
				description: true,
				title: true,
				tokenExpiration: true
			}
		})

		if(!task) return NotFound()

		return OK(task)
	}
	catch(e) {
		return ServerError(e as Error)
	}
}

export async function PUT(req: NextRequest) {
	try {
		const body = await req.json()
		const { status, token } = body

		if(!status || !token) return BadRequest()

		await prisma.task.update({
			where: {
				token
			},
			data: {
				status
			}
		})

		return OK("status updated")
	}
	catch(e) {
		return ServerError(e as Error)
	}
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ token: string }> }) {
	try {
		const { token } = await context.params

		if(!token) return BadRequest()

		await prisma.task.delete({
			where: {
				token
			}
		})

		return OK("task deleted")
	}
	catch(e) {
		console.log(e)
		return ServerError(e as Error)
	}
}

import { prisma } from "@/utils"
import { BadRequest, NotFound, OK, ServerError } from "@/utils/http"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
	try {
		const token = params.token

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

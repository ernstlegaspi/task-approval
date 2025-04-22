import { OK, ServerError } from "@/utils/http";
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
	try {
		const { assignedUserEmail, token } = await req.json()

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		})

		const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://localhost:3000"

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: assignedUserEmail,
			subject: "Task assigned to you",
			html: `<html>
				<body>
					<p>Task has been assigned to you. Please click this link to respond: <a href="${BASE_URL}/${token}">Task Link</a></p>
				</body>
			</html>`,
		})

		console.log("Test")

		return OK({ message: "Email Sent" })
	}
	catch(error) {
		console.log("Test 222")
		return ServerError(error as Error)
	}
}

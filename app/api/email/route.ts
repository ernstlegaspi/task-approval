import { OK, ServerError } from "@/utils/http"
import { NextRequest } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
	try {
		const { assignedUserEmail, taskTitle, token } = await req.json()

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		})

		const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://task-approval.vercel.app/"

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: assignedUserEmail,
			subject: "Task Approval Request",
			html: `<html>
				<body>
					<p>You have a new task: ${taskTitle}. Please review and respond using this link: <a href="${BASE_URL}/${token}">${BASE_URL}/${token}</a></p>
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

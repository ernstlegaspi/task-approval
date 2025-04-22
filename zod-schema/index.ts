import { z } from "zod"

export const loginSchema = z.object({
	email: z.string({
		required_error: "Email is required.",
		invalid_type_error: "Email must be a string"
	})
	.min(10, { message: "Email must be 10 characters long." })
	.email(),
	password: z.string().min(5, { message: "Password must be 5 characters long." })
})

export const updateTaskSchema = z.object({
	id: z.string().min(1),
	description: z.string().min(1),
	title: z.string().min(1)
})

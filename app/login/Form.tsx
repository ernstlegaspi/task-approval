"use client"

import { loginSchema } from "@/zod-schema"
import { ChangeEvent, FormEvent, useState } from "react"
import { credentialsSignIn } from "@/actions"

export default function Form() {
	const [state, setState] = useState({
		email: "",
		password: ""
	})

	const setValue = (key: string, value: string) => {
		setState(prev => ({ ...prev, [key]: value }))
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		const email: string = state.email
		const password: string = state.password

		e.preventDefault()

		if(!email || !password) {
			alert("Invalid Request")
			return
		}

		if(!loginSchema.safeParse({ email, password }).success) {
			alert("Invalid Request")
			return
		}

		try {
			await credentialsSignIn(email, password)
			window.location.href = "/"
		}
		catch(e) {
			const err: Error = e as Error

			alert(err.message)
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.name, e.target.value)
	}

	return <form onSubmit={handleSubmit} className="p-4 rounded-sm border border-black/10">
		<input value={state.email} onChange={handleChange} className="input" placeholder="Email" name="email" type="email" />
		<br />
		<input value={state.password} onChange={handleChange} className="input my-3" placeholder="Password" name="password" type="password" />
		<br />
		<button className="pointer bg-black text-white w-full py-2 rounded-[2px] transition-all border border-black hover:bg-white hover:text-black" type="submit">Login</button>
	</form>
}

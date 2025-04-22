"use client"

import axios, { AxiosError } from "axios"

import { loginSchema } from "@/zod-schema"
import { ChangeEvent, FormEvent, useState } from "react"
import { credentialsSignIn } from "@/actions"
import { toast } from 'react-toastify'

export default function Form() {
	const [state, setState] = useState({
		email: "",
		password: "",
		registerEmail: "",
		registerPassword: ""
	})

	const setValue = (key: string, value: string) => {
		setState(prev => ({ ...prev, [key]: value }))
	}

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		const email: string = state.email
		const password: string = state.password

		e.preventDefault()

		if(!email || !password) {
			toast("Invalid Request")
			return
		}

		if(!loginSchema.safeParse({ email, password }).success) {
			toast("Invalid Request")
			return
		}

		try {
			await credentialsSignIn(email, password)
			window.location.href = "/"
		}
		catch(e) {
			const err: AxiosError = e as AxiosError

			if(!err.response) return

			const data = err.response.data as { message: string }

			toast(data.message)
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.name, e.target.value)
	}

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		const email: string = state.registerEmail
		const password: string = state.registerPassword

		e.preventDefault()

		if(!email || !password) {
			toast("Invalid Request")
			return
		}

		if(!loginSchema.safeParse({ email, password }).success) {
			toast("Invalid Request")
			return
		}

		try {
			await axios.post("/api/register", {
				email,
				password
			})

			toast("Registered successfully.")
		}
		catch(e) {
			const err: AxiosError = e as AxiosError

			if(!err.response) return

			const data = err.response.data as { message: string }

			toast(data.message)
		}
	}

	return <>
		<form onSubmit={handleLogin} className="p-4 rounded-sm border border-black/10">
			<input value={state.email} onChange={handleChange} className="input" placeholder="Email" name="email" type="email" />
			<br />
			<input value={state.password} onChange={handleChange} className="input my-3" placeholder="Password" name="password" type="password" />
			<br />
			<button className="pointer bg-black text-white w-full py-2 rounded-[2px] transition-all border border-black hover:bg-white hover:text-black" type="submit">Login</button>
		</form>
		<p className="m-3">or</p>
		<form onSubmit={handleRegister} className="p-4 rounded-sm border border-black/10">
			<input value={state.registerEmail} onChange={handleChange} className="input" placeholder="Email" name="registerEmail" type="email" />
			<br />
			<input value={state.registerPassword} onChange={handleChange} className="input my-3" placeholder="Password" name="registerPassword" type="password" />
			<br />
			<button className="pointer bg-black text-white w-full py-2 rounded-[2px] transition-all border border-black hover:bg-white hover:text-black" type="submit">Register</button>
		</form>
	</>
}

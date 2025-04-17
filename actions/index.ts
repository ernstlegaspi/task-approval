"use server"

import { signIn, signOut } from "@/auth"

export const credentialsSignIn = async (email: string, password: string) => {
	try {
		await signIn("credentials", { email, password, redirect: false })
	}
	catch(e) {
		throw new Error("Unauthorized")
	}
}

export const credentialsSignOut = async () => {
	await signOut()
}

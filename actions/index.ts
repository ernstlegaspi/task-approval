"use server"

import { signIn, signOut } from "@/auth"

export const credentialsSignIn = async (formData: FormData) => {
	await signIn("credentials", formData)
}

export const credentialsSignOut = async () => {
	await signOut()
}

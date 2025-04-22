"use client"

import { credentialsSignOut } from "@/actions"

export default function LogoutButton() {
	const logout = async () => {
		await credentialsSignOut()
	}
	
	return <div onClick={logout} className="bg-[#1a1a1a] text-white w-max p-3 rounded-sm pointer transition-all hover:bg-white hover:text-[#1a1a1a]">
		<p className="ml-[5px]">Logout</p>
	</div>
}

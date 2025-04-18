import { auth } from "@/auth"
import Dashboard from "./(dashboard)/Dashboard"

export default async function Home() {
	const session = await auth()

	return session ? <Dashboard />
		: <div className="h-[100vh] w-full bg-black text-white flex items-center justify-center text-[30px] font-bold text-center px-4">
			This app is used to manage and approve tasks via email. If you received a link, please click it to respond.
		</div>
}

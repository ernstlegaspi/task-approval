"use client"

import { useNewTaskStore } from "@/store/newTask"
import { FaPlus } from "react-icons/fa"

export default function AddTaskButton() {
	const { active } = useNewTaskStore()

	return <div onClick={active} className="flex items-center bg-[#1a1a1a] text-white w-max p-3 rounded-sm pointer transition-all hover:bg-white hover:text-[#1a1a1a]">
		<FaPlus size={18} />
		<p className="ml-[5px]">New Task</p>
	</div>
}

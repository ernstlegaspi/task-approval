"use client"

import { convertDate } from "@/utils/utils"
import { MdEdit } from "react-icons/md"

export default function TaskCard({ task }: { task: Task }) {
	const { assignedTo, createdAt, description, status, title, token } = task

	const Text = ({ text }: { text: string }) => <p className="text-white w-[10%] ml-1 pl-2 flex items-center">{text}</p>

	return <div className="flex mb-3">
	<p className="text-white w-[15%] pl-2 flex items-center">{title}</p>
	<p className="text-white w-[15%] ml-1 pl-2 flex items-center">{description}</p>
	<p className="text-white w-[15%] ml-1 pl-2 flex items-center">{assignedTo}</p>

	<Text text={status} />
	<Text text={convertDate(new Date(createdAt))} />
	<Text text={token} />

	<div className="rounded-sm p-1 pr-2 pointer text-white flex items-center transition-all hover:bg-white hover:text-black">
		<MdEdit className="mr-2" size={20} />
		<p>Edit Task</p>
	</div>
</div>
}

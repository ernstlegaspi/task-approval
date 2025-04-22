"use client"

import axios from "axios"

import { convertDate, isValidEmail } from "@/utils/utils"
import { useEffect, useState } from "react"
import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5"
import { MdDelete, MdEdit } from "react-icons/md"
import { updateTaskSchema } from "@/zod-schema"
import { TaskStatus } from "@/generated/prisma"
import { toast } from 'react-toastify'

const inputClass = "border-b border-white w-[15%] outline-none text-white p-2"

export default function TaskCard({ task }: { task: Task }) {
	const { assignedTo, createdAt, description, id, title, status, token, tokenExpiration } = task

	const [state, setState] = useState({
		assignedTo,
		description,
		deleteButtonClicked: false,
		isEditing: false,
		loading: false,
		prevAssignedTo: assignedTo,
		prevDescription: description,
		prevTitle: title,
		status,
		title
	})

	const setValue = (key: string, value: string | boolean) => {
		setState(prev => ({ ...prev, [key]: value }))
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.name, e.target.value)
	}

	const defaultValue = () => {
		setValue("assignedTo", state.prevAssignedTo)
		setValue("description", state.prevDescription)
		setValue("title", state.title)
	}

	const editTask = async () => {
		const expirationDate = new Date(tokenExpiration)
		const currentDate = new Date()
		const isExpired = currentDate > expirationDate

		if(isExpired) {
			setValue("status", TaskStatus.EXPIRED)
			setValue("isEditing", false)
			defaultValue()

			return
		}

		try {
			const res = updateTaskSchema.safeParse({
				id,
				description: state.description,
				title: state.title
			})

			if(!res.success) {
				toast("All fields are required.")
				return
			}

			if(state.assignedTo) {
				if(!isValidEmail(state.assignedTo)) {
					toast("Please enter a valid email.")
					return
				}

				await Promise.all([
					axios.put("/api/task", {
						id,
						assignedTo: state.assignedTo,
						description: state.description,
						title: state.title,
					}),
					axios.post("/api/email", {
						assignedUserEmail: state.assignedTo,
						token
					})
				])

				toast("Task assigned.")

				return
			}

			const response = await axios.put("/api/task", {
				id,
				assignedTo: state.assignedTo,
				description: state.description,
				title: state.title,
			})

			toast(response.data.data.message)
		}
		catch(e) {
			const err: Error = e as Error

			defaultValue()

			toast(err.message)
		}
		finally {
			setValue("isEditing", false)
		}
	}

	useEffect(() => {
		(async () => {
			const isExpired = new Date() > new Date(tokenExpiration)

			if(isExpired) {
				setValue("status", TaskStatus.EXPIRED)
			}
		})()
	}, [])

	const cancelButton = () => {
		defaultValue()
		setValue("isEditing", false)
	}

	const deleteButton = async () => {
		try {
			setValue("deleteButtonClicked", true)

			await axios.delete(`/api/task/${token}`)

			toast("Task deleted successfully.")
		}
		catch(e) {
			const err: Error = e as Error

			setValue("deleteButtonClicked", false)
			toast(err.message)
		}
	}

	const Text = ({ text }: { text: string }) => {
		return <p className={`
			${text === "APPROVED" ? "text-green-500" : text === "REJECTED" || text === "EXPIRED" ? "text-red-500" : state.isEditing ? "text-neutral-600 select-none" : "text-white"} w-[10%] ml-1 pl-2 flex items-center
		`}>
			{text}
		</p>
	}

	const DeleteTaskButton = () => <div onClick={deleteButton} className="rounded-sm p-1 pr-2 pointer text-white flex items-center transition-all hover:bg-white hover:text-black">
		<MdDelete className="mr-2" size={20} />
		<p>Delete Task</p>
	</div>

	const EditTaskButton = () => <div onClick={() => {
		setValue("isEditing", true)
	}} className="rounded-sm p-1 pr-2 pointer text-white flex items-center transition-all hover:bg-white hover:text-black">
		<MdEdit className="mr-2" size={20} />
		<p>Edit Task</p>
	</div>

	if(state.deleteButtonClicked) return null

	return <div className="flex mb-3">
	{
		state.isEditing ?
			<>
				<input value={state.title} onChange={handleChange} name="title" type="text" placeholder="Title" className={inputClass} />
				<input value={state.description} onChange={handleChange} name="description" type="text" placeholder="Description" className={`ml-1 ${inputClass}`} />
				<input
					placeholder="None"
					name="assignedTo"
					value={state.assignedTo}
					onChange={handleChange}
					className="
						focus:border-white text-white py-1 ml-1 w-[15%] flex items-center pl-2
						transition-all border-b border-transparent hover:border-white outline-none
					"
				/>
			</>
		: <>
			<p className="text-white w-[15%] pl-2 flex items-center">{state.title}</p>
			<p className="text-white w-[15%] ml-1 pl-2 flex items-center">{state.description}</p>
			<p className="text-white w-[15%] ml-1 pl-2 flex items-center">{state.assignedTo}</p>
		</>
	}

	<Text text={state.status} />
	<Text text={convertDate(new Date(createdAt))} />
	<Text text={token} />

	{
		state.isEditing ? <div className="flex items-center w-[5%]">
			<IoCloseSharp onClick={cancelButton} className="text-red-500 pointer" size={20} />
			<IoCheckmarkSharp onClick={editTask} className="text-green-500 pointer ml-2" size={20} />
		</div>
		: state.status !== "PENDING" ? state.status === "EXPIRED" ? <DeleteTaskButton /> : null : <EditTaskButton />
	}
</div>
}

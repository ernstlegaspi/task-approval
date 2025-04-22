"use client"

import axios from "axios"

import { useNewTaskStore } from "@/store/newTask"
import { useState } from "react"
import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5"
import { useTaskStore } from "@/store/task"

const inputClass = "border-b border-white w-[15%] outline-none text-white p-2"

export default function NewTaskCard() {
	const [state, setState] = useState({
		assignedTo: "",
		description: "",
		title: "",
		loading: false
	})

	const { tasks, setTasks } = useTaskStore()
	const { isAddingNewTask, inactive } = useNewTaskStore()

	if(!isAddingNewTask) return null

	const setValue = (key: string, value: string | boolean) => {
		setState(prev => ({ ...prev, [key]: value }))
	}

	const handleAddTask = async () => {
		if(state.loading) return

		try {
			setValue("loading", true)

			const res = await axios.post(
				"/api/task",
				{
					assignedTo: state.assignedTo,
					description: state.description,
					title: state.title
				},
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)

			const newTask = res?.data?.data

			setState(prev => ({
				...prev,
				assignedTo: "",
				description: "",
				title: ""
			}))

			const tasksHolder: Task[] = [...tasks.reverse()]
			tasksHolder.push({
				assignedTo: state.assignedTo,
				createdAt: newTask?.createdAt,
				description: state.description,
				id: newTask?.id,
				status: newTask.status,
				title: state.title,
				token: newTask.token
			})

			setTasks(tasksHolder.reverse())

			alert("task created successfully")
		}
		catch(e) {
			console.log(`Error in client: ${e}`)
		}
		finally {
			setValue("loading", false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.name, e.target.value)
	}

	const Text = ({ text }: { text: string }) => <p className="text-white w-[10%] ml-1 pl-2 flex items-center">{text}</p>

	return <div className="flex mb-3">
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

		<Text text="Pending" />
		<Text text="" />
		<Text text="" />

		<div className="flex items-center w-[5%]">
			<IoCloseSharp onClick={inactive} className="text-red-500 pointer" size={20} />
			<IoCheckmarkSharp onClick={handleAddTask} className="text-green-500 pointer ml-2" size={20} />
		</div>
	</div>
}

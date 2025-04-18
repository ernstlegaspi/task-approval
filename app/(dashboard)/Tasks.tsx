"use client"

import axios from "axios"
import TaskCard from "./TaskCard"

import { useEffect } from "react"
import { useTaskStore } from "@/store/task"

export default function Tasks() {
	const { tasks, setTasks } = useTaskStore()

	useEffect(() => {
		(async () => {
			const tasksReq = await axios.get("/api/task")

			setTasks(tasksReq.data.tasks)
		})()
	}, [])

	return <>
		{ tasks && tasks.length > 0 && tasks.map(task => <TaskCard key={task.id} task={task} />) }
	</>
}

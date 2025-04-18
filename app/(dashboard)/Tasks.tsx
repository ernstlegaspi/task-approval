"use client"

import axios from "axios"
import TaskCard from "./TaskCard"

import { useEffect, useState } from "react"

export default function Tasks() {
	const [tasks, setTasks] = useState<Task[]>()

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

"use client"

import { TaskStatus } from "@/prisma/generated/prisma"
import axios, { AxiosError } from "axios"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { ClipLoader } from "react-spinners"

export default function TaskPage() {
	const pathname = usePathname()
	const token = pathname.replaceAll("/", "")

	const [state, setState] = useState({
		isLoading: false,
		task: { description: "", id: "", title: "", tokenExpiration: "" },
		buttonClicked: "",
		isTokenExpired: false
	})

	const setValue = (key: string, value: string | boolean | SingleTask) => {
		setState(prev => ({ ...prev, [key]: value }))
	}

	useEffect(() => {
		(async () => {
			try {
				setValue("isLoading", true)

				const res = await axios.get(`/api/task/${token}`)
				const data = res.data.data as SingleTask

				setValue("task", data)

				const expirationDate = new Date(data.tokenExpiration)
				const currentDate = new Date()
				const isExpired = currentDate > expirationDate

				console.log(expirationDate)
				console.log(currentDate)

				setValue("isTokenExpired", isExpired)

				if(isExpired) {
					await axios.put(`/api/task/${token}`, {
						status: TaskStatus.EXPIRED,
						token
					})
				}
			}
			catch(e) {
				const err: Error = e as Error
				console.log(err.message)
			}
			finally {
				setValue("isLoading", false)
			}
		})()
	}, [])

	const approveButton = async () => {
		try {
			await axios.put(`/api/task/${token}`, {
				status: TaskStatus.APPROVED,
				token
			})

			setValue("buttonClicked", "approve")
		}
		catch(e) {
			const err: AxiosError = e as AxiosError

			if(!err.response) return

			const data = err.response.data as { message: string }

			toast(data.message)
		}
	}

	const rejectButton = async () => {
		try {
			await axios.put(`/api/task/${token}`, {
				status: TaskStatus.REJECTED,
				token
			})

			setValue("buttonClicked", "reject")
		}
		catch(e) {
			const err: AxiosError = e as AxiosError

			if(!err.response) return

			const data = err.response.data as { message: string }

			toast(data.message)
		}
	}

	return <div className="h-[100vh] w-full bg-black text-white flex flex-col items-center justify-center text-center px-4">
		{
			state.isTokenExpired ? <p className="text-[30px]"><span className="text-red-500">Token expired.</span> Please contact your manager for any missed details.</p>
			: state.buttonClicked ? <p className="text-[30px]">Task { state.buttonClicked === "approve" ? "Approved" : "Rejected" }. You can now close this page. Thank you!</p>
			: state.isLoading ? <ClipLoader color="#fff" size={50} />
			: !state.isLoading && !state.task ? <p className="text-[30px] font-bold">There is an error accessing this page. Please try again later</p>
			: state.task.description && <>
				<p className="text-[30px]"><strong>Task Title: </strong> {state.task.title}</p>
				<p className="text-[30px]"><strong>Task Description: </strong> {state.task.description}</p>
				<div className="flex items-center text-[20px] mt-3">
					<button onClick={approveButton} className="rounded-[2px] bg-green-300 p-2 pointer transition-all text-black hover:bg-green-400">APPROVE</button>
					<button onClick={rejectButton} className="rounded-[2px] bg-red-300 p-2 pointer transition-all text-black ml-2 hover:bg-red-400">REJECT</button>
				</div>
			</>
		}
	</div>
}

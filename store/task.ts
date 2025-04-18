import { create } from "zustand"

type Props = {
	tasks: Task[]
	setTasks: (tasks: Task[]) => void
}

export const useTaskStore = create<Props>(set => ({
	tasks: [],
	setTasks: (tasks: Task[]) => set({
		tasks
	})
}))

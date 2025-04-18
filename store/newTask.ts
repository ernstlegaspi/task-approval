import { create } from "zustand"

type Props = {
	isAddingNewTask: boolean
	active: () => void
	inactive: () => void
}

export const useNewTaskStore = create<Props>(set => ({
	isAddingNewTask: false,
	active: () => set({
		isAddingNewTask: true
	}),
	inactive: () => set({
		isAddingNewTask: false
	})
}))

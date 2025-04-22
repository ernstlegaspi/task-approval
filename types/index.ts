type Task = {
	id: string
	assignedTo: string
	createdAt: Date
	description: string
	status: string
	title: string
	token: string
	tokenExpiration: string
}

type UpdateTask = {
	id: string
	assignedTo: string
	description: string
	title: string
}

type SingleTask = {
	id: string
	description: string
	title: string
	tokenExpiration: string
}

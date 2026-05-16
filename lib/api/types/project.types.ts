export interface Project {
	id: string
	label: string
	slug: string
	description: string
	src: string
	href: string | null
	order: number
	isActive: boolean
	tabId: string
	createdAt: string
	updatedAt: string
}

export interface CreateProjectRequest {
	label: string
	slug: string
	description: string
	src: string
	href?: string | null
	order?: number
	isActive?: boolean
	tabId: string
}

export interface UpdateProjectRequest {
	label?: string
	slug?: string
	description?: string
	src?: string
	href?: string | null
	order?: number
	isActive?: boolean
	tabId?: string
}

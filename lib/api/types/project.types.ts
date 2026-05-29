import { TabBrief } from './tabs.types'

export interface Project {
	id: string
	label: string
	slug: string
	description: string
	src: string
	href: string
	order: number
	isActive: boolean
	tab: TabBrief
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
}

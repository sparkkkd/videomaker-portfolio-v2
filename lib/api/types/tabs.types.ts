import { Project } from './project.types'

export interface Tab {
	id: string
	label: string
	slug: string
	order: number
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export interface TabWithProjects extends Tab {
	projects: Project[]
}

export interface CreateTabRequest {
	label: string
	slug: string
	order?: number
	isActive?: boolean
}

export interface UpdateTabRequest {
	label?: string
	slug?: string
	order?: number
	isActive?: boolean
}

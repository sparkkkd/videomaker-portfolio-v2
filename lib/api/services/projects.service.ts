import { api } from '../axios'
import {
	CreateProjectRequest,
	Project,
	UpdateProjectRequest,
} from '../types/project.types'

export const projectsApi = {
	getAll: () => api.get<Project[]>('/projects'),
	getById: (id: string) => api.get<Project>(`/projects/${id}`),
	getBySlug: (slug: string) => api.get<Project>(`/projects/${slug}`),
	create: (data: CreateProjectRequest) => api.post<Project>('/projects', data),
	update: (id: string, data: UpdateProjectRequest) =>
		api.patch<Project>(`/projects/${id}`, data),
	delete: (id: string) => api.delete<{ message: string }>(`/projects/${id}`),
	reorder: (projectIds: string[]) =>
		api.post<{ message: string }>('/projects/reorder', { projectIds }),
}

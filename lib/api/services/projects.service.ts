import { api, publicApi } from '../axios'
import {
	CreateProjectRequest,
	Project,
	UpdateProjectRequest,
} from '../types/project.types'

export const projectsApi = {
	getAll: () => publicApi.get<Project[]>('/projects'),
	getById: (id: string) => publicApi.get<Project>(`/projects/${id}`),
	getBySlug: (slug: string) => publicApi.get<Project>(`/projects/${slug}`),
	getByTabId: (tabId: string) =>
		publicApi.get<Project[]>(`/projects/tab/${tabId}`),

	create: (data: CreateProjectRequest) => api.post<Project>('/projects', data),
	update: (id: string, data: UpdateProjectRequest) =>
		api.patch<Project>(`/projects/${id}`, data),
	delete: (id: string) => api.delete<{ message: string }>(`/projects/${id}`),
	reorder: (projectIds: string[], tabId?: string) => {
		const url = tabId ? `/projects/reorder?tabId=${tabId}` : '/projects/reorder'
		return api.post<{ message: string }>(url, projectIds)
	},
}

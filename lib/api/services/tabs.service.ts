import { api } from '../axios'
import {
	CreateTabRequest,
	Tab,
	TabWithProjects,
	UpdateTabRequest,
} from '../types/tabs.types'

export const tabsApi = {
	getAll: () => api.get<Tab[]>('/tabs'),
	getAllWithProjects: () => api.get<TabWithProjects[]>('/tabs/with-projects'),
	getById: (id: string) => api.get<TabWithProjects[]>(`/tabs/${id}`),
	getBySlug: (slug: string) => api.get<TabWithProjects[]>(`/tabs/${slug}`),
	create: (data: CreateTabRequest) => api.post<Tab[]>('/tabs', data),
	update: (id: string, data: UpdateTabRequest) =>
		api.patch<Tab[]>(`/tabs/${id}`, data),
	delete: (id: string) => api.delete<{ message: string }>(`/tabs/${id}`),
	reorder: (tabIds: string[]) =>
		api.post<{ message: string }>('/tabs/reorder', tabIds),
}

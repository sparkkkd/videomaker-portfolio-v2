import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from '@tanstack/react-query'
import {
	ICreateProjectRequest,
	IProject,
	IUpdateProjectRequest,
} from '../types'
import { queryKeys } from '../queryKeys'
import { api } from '../axios'

export const useProjects = (
	tabId?: string,
	options?: Omit<UseQueryOptions<IProject[], Error>, 'queryKey' | 'queryFn'>,
) => {
	return useQuery<IProject[], Error>({
		queryKey: queryKeys.projects.list(tabId),
		queryFn: () => {
			const url = tabId ? `/projects/?tabId=${tabId}` : '/projects'
			return api.get<IProject[]>(url)
		},
		staleTime: 5 * 60 * 1000,
		...options,
	})
}

export const useProject = (
	id: string,
	options?: Omit<UseQueryOptions<IProject, Error>, 'queryKey' | 'queryFn'>,
) => {
	return useQuery<IProject, Error>({
		queryKey: queryKeys.projects.detail(id),
		queryFn: () => api.get<IProject>(`/projects/${id}`),
		staleTime: 5 * 60 * 1000,
		...options,
	})
}

export const useCreateProject = (
	options?: UseMutationOptions<IProject, Error, ICreateProjectRequest>,
) => {
	const queryClient = useQueryClient()

	return useMutation<IProject, Error, ICreateProjectRequest>({
		mutationFn: (data) => api.post<IProject>('/projects', data),
		onSuccess: (_, { tabId }) => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.projects.list(tabId),
			})
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.withProject() })
		},
		...options,
	})
}

export const useUpdateProject = (
	options?: UseMutationOptions<
		IProject,
		Error,
		{ id: string } & IUpdateProjectRequest
	>,
) => {
	const queryClient = useQueryClient()

	return useMutation<IProject, Error, IUpdateProjectRequest>({
		mutationFn: ({ id, ...data }) =>
			api.patch<IProject>(`/projects/${id}`, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
			queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(id) })
		},
		...options,
	})
}

export const useDeleteProject = (
	options?: UseMutationOptions<void, Error, string>,
) => {
	const queryClient = useQueryClient()

	return useMutation<void, Error, string>({
		mutationFn: (id) => api.delete(`/projects/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
		},
		...options,
	})
}

export const useReorderProjects = (
	options?: UseMutationOptions<
		void,
		Error,
		{ projectIds: string[]; tabId: string }
	>,
) => {
	const queryClient = useQueryClient()

	return useMutation<void, Error, { projectIds: string[]; tabId: string }>({
		mutationFn: ({ projectIds, tabId }) =>
			api.post<void>(`/projects/reorder?tabId=${tabId}`, { projectIds }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.withProject() })
		},
		...options,
	})
}

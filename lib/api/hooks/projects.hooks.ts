import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { UpdateProjectRequest } from '../types/project.types'
import { projectsApi } from '../services/projects.service'

export const useProjects = (tabId?: string) => {
	return useQuery({
		queryKey: queryKeys.projects.list(tabId),
		queryFn: () => projectsApi.getAll(),
	})
}

export const useProjectById = (id: string) => {
	return useQuery({
		queryKey: queryKeys.projects.detail(id),
		queryFn: () => projectsApi.getById(id),
		enabled: !!id,
	})
}

export const useCreateProject = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: projectsApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
		},
	})
}

export const useUpdateProject = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
			projectsApi.update(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
			queryClient.invalidateQueries({
				queryKey: queryKeys.projects.detail(id),
			})
		},
	})
}

export const useDeleteProject = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: projectsApi.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
		},
	})
}

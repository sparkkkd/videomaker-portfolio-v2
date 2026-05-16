import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { UpdateTabRequest } from '../types/tabs.types'
import { tabsApi } from '../services/tabs.service'

export const useTabs = () => {
	return useQuery({
		queryKey: queryKeys.tabs.list(),
		queryFn: tabsApi.getAll,
	})
}

export const useTabsWithProject = () => {
	return useQuery({
		queryKey: queryKeys.tabs.withProject(),
		queryFn: tabsApi.getAllWithProjects,
	})
}

export const useTabBySlug = (slug: string) => {
	return useQuery({
		queryKey: queryKeys.tabs.list(),
		queryFn: () => tabsApi.getBySlug(slug),
		enabled: !!slug,
	})
}

export const useCreateTab = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: tabsApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.list() })
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.withProject() })
		},
	})
}

export const useUpdateTab = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateTabRequest }) =>
			tabsApi.update(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.list() })
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.withProject() })
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.detail(id) })
		},
	})
}

export const useDeleteTab = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: tabsApi.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.list() })
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.withProject() })
		},
	})
}

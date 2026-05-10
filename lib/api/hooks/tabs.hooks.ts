import {
	useMutation,
	UseMutationOptions,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from '@tanstack/react-query'
import {
	ICreateTabRequest,
	ITab,
	ITabWithProject,
	IUpdateTabRequest,
} from '../types'
import { api } from '../axios'
import { queryKeys } from '../queryKeys'

export const useTabs = (
	options?: Omit<UseQueryOptions<ITab[], Error>, 'queryKey' | 'queryFn'>,
) => {
	return useQuery<ITab[], Error>({
		queryKey: queryKeys.tabs.list(),
		queryFn: () => api.get<ITab[]>('/tabs'),
		staleTime: 5 * 60 * 1000,
		...options,
	})
}

export const useTabsWithProjects = (
	options?: Omit<
		UseQueryOptions<ITabWithProject[], Error>,
		'queryKey' | 'queryFn'
	>,
) => {
	return useQuery<ITabWithProject[], Error>({
		queryKey: queryKeys.tabs.withProject(),
		queryFn: () => api.get<ITabWithProject[]>('/tabs/projects'),
		staleTime: 5 * 60 * 1000,
		...options,
	})
}

export const useTabBySlug = (
	slug: string,
	options?: Omit<UseQueryOptions<ITab, Error>, 'queryKey' | 'queryFn'>,
) => {
	return useQuery<ITab, Error>({
		queryKey: queryKeys.tabs.bySlug(slug),
		queryFn: () => api.get<ITab>(`/tabs/${slug}`),
		staleTime: 5 * 60 * 1000,
		...options,
	})
}

export const useCreateTab = (
	options?: UseMutationOptions<ITab, Error, ICreateTabRequest>,
) => {
	const queryClient = useQueryClient()

	return useMutation<ITab, Error, ICreateTabRequest>({
		mutationFn: (data) => api.post<ITab>('/tabs', data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.all })
		},
		...options,
	})
}

export const useUpdateTab = (
	options?: UseMutationOptions<ITab, Error, { id: string } & IUpdateTabRequest>,
) => {
	const queryClient = useQueryClient()

	return useMutation<ITab, Error, { id: string } & IUpdateTabRequest>({
		mutationFn: ({ id, ...data }) => api.patch<ITab>(`/tabs/${id}`, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.all })
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.detail(id) })
		},
		...options,
	})
}

export const useDeleteTab = (
	options?: UseMutationOptions<void, Error, string>,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => api.delete(`/tabs/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.all })
		},
		...options,
	})
}

export const useReorderTabs = (
	options?: UseMutationOptions<void, Error, string[]>,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (tabIds) => api.post('/tabs/reorder', { tabIds }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tabs.all })
		},
		...options,
	})
}

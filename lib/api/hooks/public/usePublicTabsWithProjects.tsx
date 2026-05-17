import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../queryKeys'
import { tabsApi } from '../../services/tabs.service'

export const usePublicTabsWithProjects = () => {
	return useQuery({
		queryKey: queryKeys.tabs.withProject(),
		queryFn: tabsApi.getAllWithProjects,
		staleTime: 1000 * 60 * 5,
		retry: 1,
	})
}

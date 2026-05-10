export const queryKeys = {
	tabs: {
		all: ['tabs'],
		list: () => [...queryKeys.tabs.all, 'list'] as const,
		withProject: () => [...queryKeys.tabs.all, 'with-projects'] as const,
		detail: (id: string) => [...queryKeys.tabs.all, 'detail', id] as const,
		bySlug: (slug: string) => [...queryKeys.tabs.all, 'slug', slug] as const,
	},
	projects: {
		all: ['projects'] as const,
		list: (tabId?: string) =>
			[...queryKeys.projects.all, 'list', tabId] as const,
		detail: (id: string) => [...queryKeys.projects.all, 'detail', id] as const,
	},
}

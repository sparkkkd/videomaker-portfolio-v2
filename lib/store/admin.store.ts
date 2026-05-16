import { create } from 'zustand'
import { CreateTabRequest, Tab } from '../api/types/tabs.types'
import { CreateProjectRequest, Project } from '../api/types/project.types'
import { MOCK_PROJECTS, MOCK_TABS } from '@/constants/mock/admin.mock'

interface AdminState {
	activeSection: 'tabs' | 'projects'
	setActiveSection: (section: 'tabs' | 'projects') => void

	tabs: Tab[]
	projects: Project[]

	addTab: (tab: CreateTabRequest) => void
	addProject: (project: CreateProjectRequest) => void
}

export const useAdminStore = create<AdminState>((set) => ({
	activeSection: 'tabs',
	setActiveSection: (section) => set({ activeSection: section }),

	tabs: MOCK_TABS,
	projects: MOCK_PROJECTS,

	addTab: (tab) =>
		set((state) => ({
			tabs: [
				...state.tabs,
				{
					...tab,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					isActive: tab.isActive ?? true,
					order: tab.order ?? 0,
				} satisfies Tab,
			],
		})),

	addProject: (project) =>
		set((state) => ({
			projects: [
				...state.projects,
				{
					...project,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					href: project.href ?? null,
					order: project.order ?? 0,
					isActive: project.isActive ?? true,
				} satisfies Project,
			],
		})),
}))

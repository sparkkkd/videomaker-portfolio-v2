import { MOCK_PROJECTS, MOCK_TABS } from '@/constants/mock/admin.mock'
import { create } from 'zustand'
import { IProject, ITab } from '../api/types'

// export interface ITab {
// 	id: string
// 	label: string
// 	slug: string
// 	order: number
// 	isActive: boolean
// 	createdAt: string
// 	updatedAt: string
// }

// export interface IProject {
// 	id: string
// 	label: string
// 	slug: string
// 	description: string | null
// 	src: string
// 	href: string | null
// 	order: number
// 	isActive: boolean
// 	tabId: string
// 	createdAt: string
// 	updatedAt: string
// }

export type AdminSection = 'tabs' | 'projects'

interface AdminState {
	activeSecton: AdminSection
	setActiveSection: (section: AdminSection) => void

	tabs: ITab[]
	projects: IProject[]

	addTab: (tab: Omit<ITab, 'id' | 'createdAt' | 'updatedAt'>) => void
	addProject: (
		project: Omit<IProject, 'id' | 'createdAt' | 'updatedAt'>,
	) => void
}

export const useAdminStore = create<AdminState>((set) => ({
	activeSecton: 'tabs',
	setActiveSection: (section) => set({ activeSecton: section }),

	// Моковые данные
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
				},
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
				},
			],
		})),
}))

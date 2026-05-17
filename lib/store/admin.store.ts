import { create } from 'zustand'

import { Tab } from '../api/types/tabs.types'
import { Project } from '../api/types/project.types'

import { MOCK_PROJECTS, MOCK_TABS } from '@/constants/mock/admin.mock'

export type AdminSections = 'tabs' | 'projects' | 'tabs-projects'

interface AdminState {
	activeSection: AdminSections
	setActiveSection: (section: AdminSections) => void

	tabs: Tab[]
	projects: Project[]

	selectedTabId: string | null
	setSelectedTabId: (tabId: string | null) => void
}

export const useAdminStore = create<AdminState>((set) => ({
	activeSection: 'tabs',
	setActiveSection: (section) => set({ activeSection: section }),

	tabs: MOCK_TABS,
	projects: MOCK_PROJECTS,

	selectedTabId: null,
	setSelectedTabId: (tabId) => set({ selectedTabId: tabId }),
}))

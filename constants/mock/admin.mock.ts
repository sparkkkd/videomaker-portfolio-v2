import { Project } from '@/lib/api/types/project.types'
import { Tab } from '@/lib/api/types/tabs.types'

export const MOCK_TABS: Tab[] = [
	{
		id: '1',
		label: 'Моушен-дизайн',
		slug: 'motion-design',
		order: 0,
		isActive: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: '2',
		label: 'Видеомонтаж',
		slug: 'video-editing',
		order: 1,
		isActive: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: '3',
		label: '3D Графика',
		slug: '3d-graphics',
		order: 2,
		isActive: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
]

export const MOCK_PROJECTS: Project[] = [
	{
		id: '101',
		label: 'Промо-ролик для бренда',
		slug: 'promo-rollik-brenda',
		description: 'Креативный ролик для запуска продукта',
		src: '/project-1.jpg',
		href: 'https://vimeo.com/123456',
		order: 0,
		isActive: true,
		tab: {
			id: '1',
			slug: 'motion-design',
			label: 'Моушен-дизайн',
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: '102',
		label: 'Анимация логотипа',
		slug: 'animatsiya-logotipa',
		description: 'Динамичный логотип для презентации',
		src: '/project-2.jpg',
		href: null,
		order: 1,
		isActive: false,
		tab: {
			id: '3',
			slug: '3D Графика',
			label: '3d-graphics',
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
]

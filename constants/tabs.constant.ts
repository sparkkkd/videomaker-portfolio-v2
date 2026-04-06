interface ITab {
	id: string
	label: string
	projects: ITabProject[]
}

interface ITabProject {
	id: string
	src: string
	label: string
}

export const TABS: ITab[] = [
	{
		id: 'motion_design',
		label: 'Моушен-дизайн',
		projects: [
			{
				id: 'motion_1',
				label: 'Тизер для канала Figma for Editors',
				src: 'project-1.jpg',
			},
			{
				id: 'motion_2',
				label: 'Отчетный ролик для Контур.Диадок',
				src: 'project-2.jpg',
			},
			{
				id: 'motion_3',
				label: 'Тизер магазина RUSALE',
				src: 'project-3.jpg',
			},
			{
				id: 'motion_4',
				label: 'Промо-ролик Megaladata',
				src: 'project-4.jpg',
			},
		],
	},
	{
		id: 'clips',
		label: 'Клипы, реклама и ИИ',
		projects: [
			{
				id: 'clips_1',
				label: 'Клипы клипы клипы',
				src: 'project-1.jpg',
			},
			{
				id: 'clips_2',
				label: 'Опять клипы Клипы клипы клипы',
				src: 'project-2.jpg',
			},
			{
				id: 'clips_3',
				label: 'Тизер магазина RUSALE',
				src: 'project-3.jpg',
			},
			{
				id: 'clips_4',
				label: 'Промо-ролик Megaladata',
				src: 'project-4.jpg',
			},
		],
	},
	{
		id: 'movies',
		label: 'Фильмы и длинные форматы',
		projects: [
			{
				id: 'movies_1',
				label: 'Тизер для канала Figma for Editors',
				src: 'project-1.jpg',
			},
			{
				id: 'movies_2',
				label: 'Отчетный ролик для Контур.Диадок',
				src: 'project-2.jpg',
			},
			{
				id: 'movies_3',
				label: 'Тизер магазина RUSALE',
				src: 'project-3.jpg',
			},
			{
				id: 'movies_4',
				label: 'Промо-ролик Megaladata',
				src: 'project-4.jpg',
			},
		],
	},
	{
		id: 'shorts',
		label: 'Shorts',
		projects: [
			{
				id: 'shorts_1',
				label: 'Тизер для канала Figma for Editors',
				src: 'project-1.jpg',
			},
			{
				id: 'shorts_2',
				label: 'Отчетный ролик для Контур.Диадок',
				src: 'project-2.jpg',
			},
			{
				id: 'shorts_3',
				label: 'Тизер магазина RUSALE',
				src: 'project-3.jpg',
			},
			{
				id: 'shorts_4',
				label: 'Промо-ролик Megaladata',
				src: 'project-4.jpg',
			},
		],
	},
]

export interface ExperienceItem {
	id: string
	period: string
	title: string
	company: string
	description: string[]
}

export const experience: ExperienceItem[] = [
	{
		id: 'exp_designer_1',
		period: '11.2020 — 02.2021',
		title: 'Дизайнер',
		company: 'Юридическая компания «Наше Право»',
		description: [
			'— дизайн лендингов',
			'— дизайн печатной продукции',
			'— дизайн постов и историй для социальных сетей',
		],
	},
	{
		id: 'exp_designer_2',
		period: '03.2021 — 12.2022',
		title: 'Дизайнер',
		company: 'Фриланс',
		description: [
			'— дизайн веб-сайтов',
			'— дизайн печатной продукции',
			'— дизайн постов и историй для социальных сетей',
		],
	},
	{
		id: 'exp_designer_montage',
		period: '12.2022 — 12.2023',
		title: 'Дизайнер/монтажер',
		company: 'IT-компания «Altcraft»',
		description: [
			'— дизайн в социальные сети',
			'— дизайн печатной продукции',
			'— съемка коротких роликов',
			'— монтаж роликов',
		],
	},
	{
		id: 'exp_montage_1',
		period: '12.2023 — 12.2024',
		title: 'Монтажер',
		company: 'Фриланс',
		description: [
			'— съемка  и монтаж музыкальных клипов',
			'— монтаж рекламных роликов',
			'— цветокоррекция',
		],
	},
	{
		id: 'exp_montage_2',
		period: '12.2024 — 03.2025',
		title: 'Монтажер',
		company: 'Студия подкастов Estudio',
		description: [
			'— монтаж и цветкоррекция подкастов',
			'— монтаж и цветкоррекция коротких роликов',
		],
	},
	{
		id: 'exp_montage_designer_2',
		period: '03.2025 — наст. время',
		title: 'Монтажер/дизайнер',
		company: 'IT-компания «Loginom»',
		description: [
			'— дизайн веб-сайтов',
			'— дизайн печатной продукции',
			'— дизайн постов и историй для социальных сетей',
		],
	},
]

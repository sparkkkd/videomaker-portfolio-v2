export interface BaseWorkflow {
	id: string
}

export interface RegularWorkflow extends BaseWorkflow {
	isAI?: false
	icon: string
	title: string
	label: string
}

export interface AIWorkflow extends BaseWorkflow {
	isAI: true
	title: string
	tools: string[]
}

export type TWorkflow = RegularWorkflow | AIWorkflow

export const WORKFLOW: TWorkflow[] = [
	{
		id: 'workflow_1',
		icon: '/pr.svg',
		title: 'Adobe Premiere Pro',
		isAI: false,
		label: 'Основной монтаж, обработка звука',
	},
	{
		id: 'workflow_2',
		icon: '/ps.svg',
		title: 'Adobe Photoshop',
		label: 'Ретушь, обтравка, цветокоррекция',
	},
	{
		id: 'workflow_3',
		icon: '/ae.svg',
		title: 'Adobe After Effects',
		label: 'Анимации, вставки',
	},
	{
		id: 'workflow_4',
		icon: '/ai.svg',
		title: 'Adobe Illustrator',
		label: 'Подготовка макетов на печать',
	},
	{
		id: 'workflow_5',
		icon: '/davinci.svg',
		title: 'Davinci Resolve',
		label: 'Цветокоррекция, иногда монтаж',
	},
	{
		id: 'workflow_6',
		isAI: true,
		title: 'AI инструменты',
		tools: [
			'Google Gemini',
			'ElevenLabs',
			'Google Veo',
			'MidJourney',
			'Kling',
			'Nano Banana',
			'Seedance',
		],
	},
	{
		id: 'workflow_7',
		icon: '/figma.svg',
		title: 'Figma',
		label: 'Дизайн макетов, от сайтов до визиток',
	},
]

export interface ISkill {
	id: string
	title: string
	titleBreak?: string
	answers: {
		id: string
		text: string
	}[]
}

export const SKILLS_DATA: ISkill[] = [
	{
		id: 'accordion_1',
		title: 'Режиссура и разработка концепций',
		answers: [
			{
				id: 'answer_1_1',
				text: '— построение визуальной идеи и нарратива, визуальный скриптинг,',
			},
			{
				id: 'answer_1_2',
				text: '— постановка кадра, композиция, работа со светом (базовый уровень),',
			},
			{
				id: 'answer_1_3',
				text: '— анализ драматургии, структура сцены и ритм повествования',
			},
		],
	},
	{
		id: 'accordion_2',
		title: 'Видео-монтаж',
		titleBreak: 'и пост-продакшн',
		answers: [
			{
				id: 'answer_2_1',
				text: '— adobe premiere pro — креативный и нарративный монтаж, proxy-workflow,',
			},
			{
				id: 'answer_2_2',
				text: '— davinci resolve — базовая и тональная цветокоррекция, LUT-пайплайн, работа с skin-tones, базовый монтаж и обработка звука',
			},
			{
				id: 'answer_2_3',
				text: '— звук: базовая очистка, SFX-интеграция, ритмическая стыковка с видео',
			},
		],
	},
	{
		id: 'accordion_3',
		title: 'Motion Design',
		answers: [
			{
				id: 'answer_3_1',
				text: '— adobe after effects — шейповая анимация, кинетическая типографика, 2.5D-параллакс, camera-rig, ротоскопинг, базовый трекинг',
			},
			{
				id: 'answer_3_2',
				text: '— минималистичная графика, UI-анимация, Apple-inspired motion aesthetics',
			},
			{
				id: 'answer_3_3',
				text: '— подготовка и интеграция графики для digital-роликов',
			},
		],
	},
	{
		id: 'accordion_4',
		title: 'Графический дизайн',
		answers: [
			{
				id: 'answer_4_1',
				text: '— figma / photoshop / illustrator — композиция, типографика, брендинг, создание визуальной айдентики',
			},
			{
				id: 'answer_4_2',
				text: '— Подготовка ассетов под motion-workflow, экспорт и оптимизация элементов',
			},
		],
	},
]

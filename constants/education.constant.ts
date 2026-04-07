export interface IEducation {
	id: string
	icon: string
	title: string
	label: string
}

export const EDUCATIONS: IEducation[] = [
	{
		id: 'education_1',
		icon: '/education-1.svg',
		title: 'Графический дизайнер',
		label: 'Школа Contented',
	},
	{
		id: 'education_2',
		icon: '/education-1.svg',
		title: 'Цветокоррекция в Davinci Resolve',
		label: 'Курс Евгения Ивакина',
	},
	{
		id: 'education_3',
		icon: '/education-1.svg',
		title: 'Emotional AI Digital Adverts',
		label: 'Школа Wannabe',
	},
	{
		id: 'education_4',
		icon: '/education-1.svg',
		title: 'Прыжок в профессию: моушен-дизайн',
		label: 'Школа Аешная',
	},
]

// constants/contacts.constant.ts
interface IContact {
	id: string
	title: string
	label: string // То, что видит пользователь
	href: string // Валидный URL для Link/anchor
	external?: boolean // Флаг для открытия в новой вкладке
}

export const CONTACTS: IContact[] = [
	{
		id: 'telegram_contact',
		title: 'Telegram',
		label: '@dm1017y',
		href: 'https://t.me/dm1017y',
		external: true,
	},
	{
		id: 'phone_contact',
		title: 'Телефон',
		label: '+7 (910) 908-43-86',
		href: 'tel:+79109084386',
	},
	{
		id: 'email_contact',
		title: 'Почта',
		label: 'dmtriykuzmin@yandex.ru',
		href: 'mailto:dmtriykuzmin@yandex.ru',
	},
] as const

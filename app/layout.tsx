'use client'

import localFont from 'next/font/local'
import { Inter_Tight } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import { QueryProvider } from '@/components/admin/QueryProvider'

import './globals.css'
import { Metadata } from 'next'

const interTight = Inter_Tight({
	variable: '--font-inter-tight',
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
})

const drukFont = localFont({
	src: [
		{
			path: './fonts/Druk.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-druk',
	display: 'swap',
	preload: true,
})

export const metadata: Metadata = {
	title: {
		default: '',
		template: '%s | Дмитрий Кузьмин',
	},

	metadataBase: new URL('https://dmitrikuzmin.ru'),

	verification: {
		yandex: '80da238240f58665',
		google: 'tyrFHvy64of4B6eUZB1UzU5s5kPKPQVSUicy2Oz0G-0',
	},

	keywords: [
		'видеограф',
		'видеосъёмка',
		'монтаж видео',
		'motion design',
		'графический дизайн',
		'брендинг',
		'айдентика',
		'рекламные ролики',
		'портфолио дизайнера',
		'создание контента',
	],

	robots: { index: true, follow: true },

	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		url: 'https://dmitrikuzmin.ru',
		siteName: 'Дмитрий Кузьмин',
		title: 'Видеосъёмка, монтаж и дизайн | Дмитрий Кузьмин',
		description: 'Портфолио профессиональных видео и дизайн-проектов.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Портфолио видеографа и дизайнера Дмитрия Кузьмина',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	if (typeof window !== 'undefined') {
		window.addEventListener(
			'error',
			(e) => {
				console.error('🔥 GLOBAL ERROR:', {
					message: e.message,
					filename: e.filename,
					line: e.lineno,
					column: e.colno,
					stack: e.error?.stack,
				})
				e.preventDefault()
			},
			true,
		)

		window.addEventListener('unhandledrejection', (e) => {
			console.error('🔥 UNHANDLED PROMISE:', e.reason)
		})
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Дмитрий Кузьмин',
		url: 'https://dmitrikuzmin.ru',
		jobTitle: 'Видеограф и Дизайнер',
		description:
			'Создание видеоконтента, монтаж, motion design и графический дизайн для бизнеса и личных брендов.',
		knowsAbout: [
			'Видеосъёмка',
			'Монтаж видео',
			'Motion Design',
			'After Effects',
			'Графический дизайн',
			'Брендинг',
			'Adobe Creative Suite',
			'Figma',
		],
		sameAs: [
			'https://t.me/dm1017y',
			'https://instagram.com/kuzminwithcamera',
			'https://behance.net/dm1017y',
		],
	}

	return (
		<QueryProvider>
			<ViewTransitions>
				<html
					lang='ru'
					className={`
				${interTight.variable}
				${drukFont.variable}
				h-full antialiased`}
				>
					<head>
						<script
							type='application/ld+json'
							dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
						/>
					</head>
					<body className='min-h-full flex flex-col font-sans bg-[#fff]'>
						{children}
					</body>
				</html>
			</ViewTransitions>
		</QueryProvider>
	)
}

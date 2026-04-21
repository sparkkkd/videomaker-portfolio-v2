import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter_Tight } from 'next/font/google'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'

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
	title: 'Dmitriy Kuzmin',
	description: 'Портфолио',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ViewTransitions>
			<html
				lang='ru'
				className={`
				${interTight.variable}
				${drukFont.variable}
				h-full antialiased`}
			>
				<body className='min-h-full flex flex-col font-sans bg-[#fff]'>
					<Header />
					{children}

					<Footer />
				</body>
			</html>
		</ViewTransitions>
	)
}

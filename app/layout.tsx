import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import './globals.css'

const interTight = Inter_Tight({
	variable: '--font-inter-tight',
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
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
		<html lang='ru' className={`${interTight.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col'>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}

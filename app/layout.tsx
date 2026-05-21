import localFont from 'next/font/local'
import { Inter_Tight } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import { QueryProvider } from '@/components/admin/QueryProvider'

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
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
					<body className='min-h-full flex flex-col font-sans bg-[#fff]'>
						{children}
					</body>
				</html>
			</ViewTransitions>
		</QueryProvider>
	)
}

import { Metadata } from 'next'

import { HeroSection } from '@/sections/HeroSection'
import { ProjectSection } from '@/sections/ProjectSection'
import { Showreel } from '@/sections/Showreel'

export const metadata: Metadata = {
	title: 'Портфолио | Dmitriy Kuzmin',
	description: 'Портфолио видеографа Дмитрия Кузьмина',
	openGraph: {
		title: 'Моё портфолио - Dmitriy Kuzmin',
		description: 'Видеограф с опытом создания проектов',
		images: ['/og-image.jpg'],
	},
}

export default function Home() {
	return (
		<>
			<HeroSection />
			<Showreel />
			<ProjectSection />
		</>
	)
}

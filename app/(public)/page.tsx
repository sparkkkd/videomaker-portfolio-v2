import { Metadata } from 'next'

import { HeroSection } from '@/sections/HeroSection'
import { ProjectSection } from '@/sections/ProjectSection'
import { Showreel } from '@/sections/Showreel'

export const metadata: Metadata = {
	title: 'Портфолио',
	description:
		'Профессиональная видеосъёмка, монтаж и motion design. Графический дизайн, брендинг и айдентика. Примеры работ и условия сотрудничества.',

	alternates: {
		canonical: '/',
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

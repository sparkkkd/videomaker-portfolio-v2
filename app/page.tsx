import { HeroSection } from '@/sections/HeroSection'
import { ProjectSection } from '@/sections/ProjectSection'
import { Showreel } from '@/sections/Showreel'

export default function Home() {
	return (
		<>
			<HeroSection />
			<Showreel />
			<ProjectSection />
		</>
	)
}

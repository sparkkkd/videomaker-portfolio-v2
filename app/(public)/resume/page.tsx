import { Metadata } from 'next'

import { ExperienceSection } from '@/sections/ExperienceSection'
import { ResumeIntro } from '@/sections/ResumeIntro'
import { SkillsSection } from '@/sections/SkillsSection'
import { WorkflowEducationSection } from '@/sections/WorkflowEducationSection'

export const metadata: Metadata = {
	title: 'Резюме | Dmitriy Kuzmin',
	description: 'Опыт, навыки и образование видеографа',
	openGraph: {
		title: 'Моё резюме - Dmitriy Kuzmin',
		description: 'Видеограф с опытом создания проектов',
		images: ['/og-image.jpg'],
	},
}

export default function Resume() {
	return (
		<div className='bg-[#f3f3f3]'>
			<ResumeIntro />
			<ExperienceSection />
			<SkillsSection />
			<WorkflowEducationSection />
		</div>
	)
}

import { Metadata } from 'next'

import { ExperienceSection } from '@/sections/ExperienceSection'
import { ResumeIntro } from '@/sections/ResumeIntro'
import { SkillsSection } from '@/sections/SkillsSection'
import { WorkflowEducationSection } from '@/sections/WorkflowEducationSection'

export const metadata: Metadata = {
	title: 'Резюме',
	description:
		'Опыт работы, навыки и образование Дмитрия Кузьмина. Видеограф и дизайнер с фокусом на motion design и брендинг.',

	alternates: {
		canonical: '/resume',
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

import { ExperienceSection } from '@/sections/ExperienceSection'
import { ResumeIntro } from '@/sections/ResumeIntro'
import { SkillsSection } from '@/sections/SkillsSection'
import { WorkflowEducationSection } from '@/sections/WorkflowEducationSection'

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

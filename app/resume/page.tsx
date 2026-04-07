import { ExperienceSection } from '@/sections/ExperienceSection'
import { ResumeIntro } from '@/sections/ResumeIntro'
import { SkillsSection } from '@/sections/SkillsSection'
import { WorkflowEducationSection } from '@/sections/WorkflowEducationSection'

export default function Resume() {
	return (
		<>
			<ResumeIntro />
			<ExperienceSection />
			<SkillsSection />
			<WorkflowEducationSection />
		</>
	)
}

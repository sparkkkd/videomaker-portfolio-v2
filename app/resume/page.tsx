import { ExperienceSection } from '@/sections/ExperienceSection'
import { ResumeIntro } from '@/sections/ResumeIntro'
import { SkillsSection } from '@/sections/SkillsSection'

export default function Resume() {
	return (
		<>
			<ResumeIntro />
			<ExperienceSection />
			<SkillsSection />
		</>
	)
}

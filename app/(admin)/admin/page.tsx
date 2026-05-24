import { auth } from '@/auth'
import { AdminContent } from '@/components/admin/AdminContent'
import { redirect } from 'next/navigation'

export default async function page({}) {
	const session = await auth()

	if (!session) {
		redirect('/login')
	}

	return <AdminContent />
}

import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import { AdminContent } from '@/components/admin/AdminContent'

export default async function page({}) {
	const session = await auth()

	if (!session) {
		redirect('/login')
	}

	return <AdminContent />
}

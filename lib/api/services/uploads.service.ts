import { publicApi } from '../axios'
import { UploadResponse } from '../types/uploads.types'

export const uploadsApi = {
	uploadFile: (file: File, folder: 'projects' | 'tabs' = 'projects') => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('folder', folder)

		return publicApi.post<UploadResponse>(`/uploads/${folder}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}

import { useMutation } from '@tanstack/react-query'
import { uploadsApi } from '../services/uploads.service'

export const useUploadFile = () => {
	return useMutation({
		mutationFn: ({
			file,
			folder,
		}: {
			file: File
			folder?: 'projects' | 'tabs'
		}) => uploadsApi.uploadFile(file, folder),
	})
}

import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { IUploadsResponse } from '../types'
import axios from 'axios'

export const useUploadFile = (
	options?: UseMutationOptions<
		IUploadsResponse,
		Error,
		{ file: File; folder: string }
	>,
) => {
	return useMutation<IUploadsResponse, Error, { file: File; folder: string }>({
		mutationFn: async ({ file, folder }) => {
			const formData = new FormData()
			formData.append('file', file)

			const response = await axios.post<IUploadsResponse>(
				`/uploads/${folder}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)

			return response.data
		},
		...options,
	})
}

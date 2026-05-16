import axios, { AxiosError } from 'axios'
import { ApiErrorResponse } from '../api/axios'

export const handleLoginError = (error: unknown): string => {
	if (!(error instanceof AxiosError)) return 'Что-то пошло не так...'

	const status = error.status
	const data = error.response?.data as ApiErrorResponse | undefined

	const rawMessage = data?.message
	const message = Array.isArray(rawMessage) ? rawMessage.join('. ') : rawMessage

	if (status === 401) return 'Неверный email или пароль'

	if (status === 400 && message) return message

	if (!error.response) return 'Нет соединения с сервером'

	return 'Что-то пошло не так, попробуйте позже'
}

export function getErrorMessage(error: unknown): string {
	if (
		axios.isAxiosError<ApiErrorResponse>(error) &&
		error.response?.data?.message
	) {
		const message = error.response.data.message
		return Array.isArray(message) ? message.join(', ') : message
	}

	if (error instanceof Error) {
		return error.message
	}

	return 'Произошла неизвестная ошибка'
}

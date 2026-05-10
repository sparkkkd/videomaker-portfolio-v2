import { AxiosError } from 'axios'
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

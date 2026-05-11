export interface AuthState {
	isAuthenticated: boolean
	isLoading: boolean
}

export interface AuthContextValue extends AuthState {
	login: (accessToken: string) => void
	logout: () => Promise<void>
}

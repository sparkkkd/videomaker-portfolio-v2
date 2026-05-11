class TokenStorage {
	private accessToken: string | null = null

	getAccessToken(): string | null {
		return this.accessToken
	}

	setAccessToken(token: string | null): void {
		this.accessToken = token
	}

	clear(): void {
		this.accessToken = null
	}
}

export const tokenStorage = new TokenStorage()

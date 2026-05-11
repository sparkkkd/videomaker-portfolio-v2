/* ************** AUTH ************** */
export interface ILoginRequest {
	email: string
	password: string
}

export interface ITokenResponse {
	accessToken: string
	tokenType: string
	expiresIn: number
}

/* ************** TABS ************** */
export interface ITab {
	id: string
	label: string
	slug: string
	order: number
}

export interface ITabWithProject extends ITab {
	projects: IProject[]
}

export interface ICreateTabRequest {
	label: string
	slug: string
	oder?: number
}

export interface IUpdateTabRequest {
	id?: string
	slug?: string
	label?: string
	isActive?: string
}

/* ************** PROJECT ************** */
export interface IProject {
	id: string
	label: string
	slug: string
	description: string | null
	src: string
	href: string | null
	order: number
	tabId: string
	createdAt: string
	updatedAt: string
}

export interface ICreateProjectRequest {
	label: string
	slug: string
	description: string
	src: string
	href: string
	order?: number
	tabId: string
}

export interface IUpdateProjectRequest {
	id: string
	label?: string
	slug?: string
	description?: string
	src?: string
	href?: string
	order?: number
	tabId?: string
}

/* ************** UPLOADS ************** */
export interface IUploadsResponse {
	path: string
	filename: string
	originalName: string
	size: number
	mimeType: string
}

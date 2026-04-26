export interface User {
	id: number
	name: string
	email: string
	department: string
	role: string
	status: 'Active' | 'Inactive'
	joined: string
}

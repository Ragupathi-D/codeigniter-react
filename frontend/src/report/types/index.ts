export interface Report {
	id: number
	title: string
	category: string
	author: string
	status: 'Published' | 'Draft'
	created: string
	summary: string
}

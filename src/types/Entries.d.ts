interface Entries {
	name: string
	groups: Group[]
}

interface Group {
	id: string
	name: string
	entries: Entry[]
	params: Params
}

interface Entry {
	id: string
	title: string
	username: string
	password: string
	url: string
	notes: string
	groupName: string
	groupId: string
	creationTime: number
	lastModTime: number
}

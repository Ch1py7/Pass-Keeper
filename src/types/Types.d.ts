interface Params {
	color: string
}

type Modals = 'category' | 'entry' | 'delete'

interface CFile {
	name: string
	isUnlocked: boolean
	recycleBinId: string
	masterKey: string
}

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

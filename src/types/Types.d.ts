interface Params {
	color: string
}

type Modals = 'category' | 'entry' | 'delete' | 'sync'

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

type ManageEntry = Pick<Entry, 'id' | 'groupId'>

interface Point {
	x: number
	y: number
}

interface Box {
	start: Point
	end: Point
}

interface SqlData {
	host: string
	port: string
	user: string
	pass: string
	dbname: string
	dbtype: 'postgres' | 'mysql'
}

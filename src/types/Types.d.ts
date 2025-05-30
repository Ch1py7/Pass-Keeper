interface Params {
	color: ColorName
	icon: string
}

type Modals = 'category' | 'entry' | 'delete' | 'sync' | 'key' | 'theme' | null

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

type ColorName =
	| 'purple'
	| 'pink'
	| 'orange'
	| 'green'
	| 'blue'
	| 'gray'
	| 'red'
	| 'teal'
	| 'violet'
	| 'yellow'
	| 'lime'
	| 'cyan'

interface ColorStyle {
	bg: string
	selectedColor: string
	text: string
}

type Theme = 'light' | 'dark' | 'warm' | 'ocean' | 'forest' | 'sunset'

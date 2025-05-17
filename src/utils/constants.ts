export const sampleEntry: Entry = {
	id: '',
	title: '',
	username: '',
	password: '',
	notes: '',
	url: '',
	groupName: '',
	groupId: '',
	creationTime: 0,
	lastModTime: 0,
}

export const sampleCategory: Group = {
	id: '',
	name: '',
	params: { color: '' },
	entries: [],
}

export const sampleFile: CFile = {
	name: '',
	isUnlocked: false,
	recycleBinId: '',
	masterKey: '',
}

export const availableColors: Record<string, { name: string; bg: string }> = {
	Purple: { name: 'Purple', bg: 'from-purple-500 to-indigo-600' },
	Pink: { name: 'Pink', bg: 'from-pink-500 to-rose-600' },
	Orange: { name: 'Orange', bg: 'from-amber-500 to-orange-600' },
	Green: { name: 'Green', bg: 'from-emerald-500 to-green-600' },
	Blue: { name: 'Blue', bg: 'from-sky-500 to-blue-600' },
	Gray: { name: 'Gray', bg: 'from-slate-500 to-gray-600' },
	Red: { name: 'Red', bg: 'from-red-500 to-red-600' },
	Teal: { name: 'Teal', bg: 'from-teal-500 to-teal-600' },
	Violet: { name: 'Violet', bg: 'from-violet-500 to-purple-600' },
	Yellow: { name: 'Yellow', bg: 'from-yellow-400 to-amber-500' },
	Lime: { name: 'Lime', bg: 'from-lime-500 to-green-500' },
	Cyan: { name: 'Cyan', bg: 'from-cyan-500 to-blue-500' },
}

export const sampleSqlData: SqlData = {
	host: '',
	port: '',
	user: '',
	pass: '',
	dbname: '',
	dbtype: 'postgres'
}

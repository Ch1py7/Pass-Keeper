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
	// @ts-expect-error: ignore color type for sample value
	params: { color: '', icon: '' },
	entries: [],
}

export const sampleFile: CFile = {
	name: '',
	isUnlocked: false,
	recycleBinId: '',
	masterKey: '',
}

export const availableColors: Record<ColorName, ColorStyle> = {
	purple: {
		bg: 'from-purple-500 to-indigo-600',
		selectedColor: 'ring-2 ring-purple-400',
		text: 'text-white',
	},
	pink: {
		bg: 'from-pink-500 to-rose-600',
		selectedColor: 'ring-2 ring-pink-400',
		text: 'text-white',
	},
	orange: {
		bg: 'from-amber-500 to-orange-600',
		selectedColor: 'ring-2 ring-orange-400',
		text: 'text-white',
	},
	green: {
		bg: 'from-emerald-500 to-green-600',
		selectedColor: 'ring-2 ring-green-400',
		text: 'text-white',
	},
	blue: {
		bg: 'from-sky-500 to-blue-600',
		selectedColor: 'ring-2 ring-blue-400',
		text: 'text-white',
	},
	gray: {
		bg: 'from-slate-500 to-gray-600',
		selectedColor: 'ring-2 ring-gray-400',
		text: 'text-white',
	},
	red: {
		bg: 'from-red-500 to-red-600',
		selectedColor: 'ring-2 ring-red-400',
		text: 'text-white',
	},
	teal: {
		bg: 'from-teal-500 to-teal-600',
		selectedColor: 'ring-2 ring-teal-400',
		text: 'text-white',
	},
	violet: {
		bg: 'from-violet-500 to-purple-600',
		selectedColor: 'ring-2 ring-violet-400',
		text: 'text-white',
	},
	yellow: {
		bg: 'from-yellow-400 to-amber-500',
		selectedColor: 'ring-2 ring-yellow-400',
		text: 'text-black',
	},
	lime: {
		bg: 'from-lime-500 to-green-500',
		selectedColor: 'ring-2 ring-lime-400',
		text: 'text-white',
	},
	cyan: {
		bg: 'from-cyan-500 to-blue-500',
		selectedColor: 'ring-2 ring-cyan-400',
		text: 'text-white',
	},
}

export const defaultCategories: Record<string, { icon: string; color: string }> = {
	email: {
		icon: 'lucide:mail',
		color: 'purple',
	},
	social: {
		icon: 'lucide:user',
		color: 'pink',
	},
	shopping: {
		icon: 'lucide:shopping-cart',
		color: 'orange',
	},
	banking: {
		icon: 'lucide:piggy-bank',
		color: 'green',
	},
	work: {
		icon: 'lucide:briefcase-business',
		color: 'teal',
	},
	'Recycle Bin': {
		icon: 'lucide:trash',
		color: 'blue',
	},
	common: {
		icon: 'lucide:tree-pine',
		color: 'red',
	},
}

export const sampleSqlData: SqlData = {
	host: '',
	port: '',
	user: '',
	pass: '',
	dbname: '',
	dbtype: 'postgres',
}

export const LEFT_MOUSE_BTN = 0
export const MID_MOUSE_BTN = 1
export const RIGHT_MOUSE_BTN = 2

export const categoryAliases: Record<string, string> = {
	email: 'email',
	Email: 'email',
	EMAIL: 'email',
	eMail: 'email',
	// -------------------------------------------------------
	social: 'social',
	Social: 'social',
	SOCIAL: 'social',
	socials: 'social',
	Socials: 'social',
	SOCIALS: 'social',
	// -------------------------------------------------------
	shopping: 'shopping',
	Shopping: 'shopping',
	SHOPPING: 'shopping',
	shop: 'shopping',
	Shop: 'shopping',
	SHOP: 'shopping',
	// -------------------------------------------------------
	banking: 'banking',
	Banking: 'banking',
	BANKING: 'banking',
	bank: 'banking',
	Bank: 'banking',
	BANK: 'banking',
	// -------------------------------------------------------
	work: 'work',
	Work: 'work',
	WORK: 'work',
	// -------------------------------------------------------
	recyclebin: 'Recycle Bin',
	Recyclebin: 'Recycle Bin',
	recycleBin: 'Recycle Bin',
	RecycleBin: 'Recycle Bin',
	RECYCLEBIN: 'Recycle Bin',
	'recycle bin': 'Recycle Bin',
	'Recycle bin': 'Recycle Bin',
	'recycle Bin': 'Recycle Bin',
	'Recycle Bin': 'Recycle Bin',
	'RECYCLE BIN': 'Recycle Bin',
}

export const themes = [
	{
		id: 'light' as Theme,
		name: 'Light',
		description: 'Clean and bright',
		preview: 'bg-gradient-to-br from-slate-50 to-slate-100',
		accent: 'bg-cyan-700',
	},
	{
		id: 'warm' as Theme,
		name: 'Warm',
		description: 'Cozy and inviting',
		preview: 'bg-gradient-to-br from-amber-50 to-orange-100',
		accent: 'bg-amber-600',
	},
	{
		id: 'sunset' as Theme,
		name: 'Sunset',
		description: 'Warm and vibrant',
		preview: 'bg-gradient-to-br from-rose-100 to-orange-200',
		accent: 'bg-rose-500',
	},
	{
		id: 'dark' as Theme,
		name: 'Dark',
		description: 'Easy on the eyes',
		preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
		accent: 'bg-slate-600',
	},
	{
		id: 'ocean' as Theme,
		name: 'Ocean',
		description: 'Deep and calming',
		preview: 'bg-gradient-to-br from-blue-900 to-cyan-900',
		accent: 'bg-cyan-500',
	},
	{
		id: 'forest' as Theme,
		name: 'Forest',
		description: 'Natural and serene',
		preview: 'bg-gradient-to-br from-emerald-900 to-green-800',
		accent: 'bg-emerald-500',
	},
]

export const samplePasswordParams: PasswordGenParams = {
	upperCase: false,
	lowerCase: false,
	digits: false,
	minusChar: false,
	underlineChar: false,
	spaceChar: false,
	bracketsChars: false,
	specialChars: false,
	customChars: '',
	length: 10
}

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
		selectedColor: 'ring-1 ring-purple-500 shadow-[0_0_6px_purple]',
	},
	pink: {
		bg: 'from-pink-500 to-rose-600',
		selectedColor: 'ring-1 ring-pink-500 shadow-[0_0_6px_pink]',
	},
	orange: {
		bg: 'from-amber-500 to-orange-600',
		selectedColor: 'ring-1 ring-orange-500 shadow-[0_0_6px_orange]',
	},
	green: {
		bg: 'from-emerald-500 to-green-600',
		selectedColor: 'ring-1 ring-green-500 shadow-[0_0_6px_green]',
	},
	blue: {
		bg: 'from-sky-500 to-blue-600',
		selectedColor: 'ring-1 ring-blue-500 shadow-[0_0_6px_blue]',
	},
	gray: {
		bg: 'from-slate-500 to-gray-600',
		selectedColor: 'ring-1 ring-gray-500 shadow-[0_0_6px_gray]',
	},
	red: {
		bg: 'from-red-500 to-red-600',
		selectedColor: 'ring-1 ring-red-500 shadow-[0_0_6px_red]',
	},
	teal: {
		bg: 'from-teal-500 to-teal-600',
		selectedColor: 'ring-1 ring-teal-500 shadow-[0_0_6px_teal]',
	},
	violet: {
		bg: 'from-violet-500 to-purple-600',
		selectedColor: 'ring-1 ring-violet-500 shadow-[0_0_6px_violet]',
	},
	yellow: {
		bg: 'from-yellow-400 to-amber-500',
		selectedColor: 'ring-1 ring-yellow-500 shadow-[0_0_6px_yellow]',
	},
	lime: {
		bg: 'from-lime-500 to-green-500',
		selectedColor: 'ring-1 ring-lime-500 shadow-[0_0_6px_lime]',
	},
	cyan: {
		bg: 'from-cyan-500 to-blue-500',
		selectedColor: 'ring-1 ring-cyan-500 shadow-[0_0_6px_cyan]',
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

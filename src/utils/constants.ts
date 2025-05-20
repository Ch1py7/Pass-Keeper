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

export const availableColors: Record<string, { name: string; bg: string; selectedColor: string }> =
	{
		Purple: {
			name: 'Purple',
			bg: 'from-purple-500 to-indigo-600',
			selectedColor: 'ring-2 ring-purple-500 dark:ring-purple-400 shadow-[0_0_15px_purple]',
		},
		Pink: {
			name: 'Pink',
			bg: 'from-pink-500 to-rose-600',
			selectedColor: 'ring-2 ring-pink-500 dark:ring-pink-400 shadow-[0_0_15px_pink]',
		},
		Orange: {
			name: 'Orange',
			bg: 'from-amber-500 to-orange-600',
			selectedColor: 'ring-2 ring-orange-500 dark:ring-orange-400 shadow-[0_0_15px_orange]',
		},
		Green: {
			name: 'Green',
			bg: 'from-emerald-500 to-green-600',
			selectedColor: 'ring-2 ring-green-500 dark:ring-green-400 shadow-[0_0_15px_green]',
		},
		Blue: {
			name: 'Blue',
			bg: 'from-sky-500 to-blue-600',
			selectedColor: 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-[0_0_15px_blue]',
		},
		Gray: {
			name: 'Gray',
			bg: 'from-slate-500 to-gray-600',
			selectedColor: 'ring-2 ring-gray-500 dark:ring-gray-400 shadow-[0_0_15px_gray]',
		},
		Red: {
			name: 'Red',
			bg: 'from-red-500 to-red-600',
			selectedColor: 'ring-2 ring-red-500 dark:ring-red-400 shadow-[0_0_15px_red]',
		},
		Teal: {
			name: 'Teal',
			bg: 'from-teal-500 to-teal-600',
			selectedColor: 'ring-2 ring-teal-500 dark:ring-teal-400 shadow-[0_0_15px_teal]',
		},
		Violet: {
			name: 'Violet',
			bg: 'from-violet-500 to-purple-600',
			selectedColor: 'ring-2 ring-violet-500 dark:ring-violet-400 shadow-[0_0_15px_violet]',
		},
		Yellow: {
			name: 'Yellow',
			bg: 'from-yellow-400 to-amber-500',
			selectedColor: 'ring-2 ring-yellow-500 dark:ring-yellow-400 shadow-[0_0_15px_yellow]',
		},
		Lime: {
			name: 'Lime',
			bg: 'from-lime-500 to-green-500',
			selectedColor: 'ring-2 ring-lime-500 dark:ring-lime-400 shadow-[0_0_15px_lime]',
		},
		Cyan: {
			name: 'Cyan',
			bg: 'from-cyan-500 to-blue-500',
			selectedColor: 'ring-2 ring-cyan-500 dark:ring-cyan-400 shadow-[0_0_15px_cyan]',
		},
	}

export const defaultCategories: Record<
	string,
	{ bg: string; text: string; icon: string; color: string }
> = {
	email: {
		bg: availableColors.Purple.bg,
		text: 'text-white',
		icon: 'lucide:mail',
		color: 'Purple',
	},
	social: {
		bg: availableColors.Pink.bg,
		text: 'text-white',
		icon: 'lucide:user',
		color: 'Pink',
	},
	shopping: {
		bg: availableColors.Orange.bg,
		text: 'text-white',
		icon: 'lucide:shopping-cart',
		color: 'Orange',
	},
	banking: {
		bg: availableColors.Green.bg,
		text: 'text-white',
		icon: 'lucide:piggy-bank',
		color: 'Green',
	},
	work: {
		bg: availableColors.Teal.bg,
		text: 'text-white',
		icon: 'lucide:briefcase-business',
		color: 'Teal',
	},
	'Recycle Bin': {
		bg: availableColors.Blue.bg,
		text: 'text-white',
		icon: 'lucide:trash',
		color: 'Blue',
	},
	common: {
		bg: availableColors.Red.bg,
		text: 'text-white',
		icon: 'lucide:tree-pine',
		color: 'Red',
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

const categoryAliases: Record<string, string> = {
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
	'Recycle Bin': 'Recycle Bin',
}

export const getDefaultCategory = (key: string) => {
	const normalized = categoryAliases[key] ?? key.toLowerCase()
	return (
		defaultCategories[normalized] ?? {
			bg: '',
			icon: 'lucide:tag',
			text: '',
		}
	)
}

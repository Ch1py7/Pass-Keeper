import { availableColors } from './constants'

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

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
	email: {
		bg: availableColors.Purple.bg,
		// bg: 'from-purple-500 to-indigo-600',
		text: 'text-white',
		icon: 'lucide:mail',
	},
	social: {
		bg: availableColors.Pink.bg,
		// bg: 'from-pink-500 to-rose-600',
		text: 'text-white',
		icon: 'ri:user-line',
	},
	shopping: {
		bg: availableColors.Orange.bg,
		// bg: 'from-amber-500 to-orange-600',
		text: 'text-white',
		icon: 'ant-design:shopping-outlined',
	},
	banking: {
		bg: availableColors.Green.bg,
		// bg: 'from-emerald-500 to-green-600',
		text: 'text-white',
		icon: 'mdi:bank',
	},
	work: {
		bg: availableColors.Teal.bg,
		// bg: 'from-sky-500 to-blue-600',
		text: 'text-white',
		icon: 'material-symbols:work',
	},
	'Recycle Bin': {
		bg: availableColors.Blue.bg,
		// bg: 'from-sky-500 to-blue-600',
		text: 'text-white',
		icon: 'tabler:trash',
	},
	common: {
		bg: availableColors.Red.bg,
		// bg: 'from-red-500 to-red-600',
		text: 'text-white',
		icon: 'bi:tree',
	},
}

export const getCategory = (key: string) => {
	const normalized = categoryAliases[key] ?? key.toLowerCase()
	return (
		categoryColors[normalized] ?? {
			bg: '',
			icon: 'mdi:tag-outline',
			text: '',
		}
	)
}

export const containUpperCase = new RegExp(/[A-Z]/)
export const containNumbers = new RegExp(/[0-9]/)
export const containSpecialChars = new RegExp(/[^A-Za-z0-9]/)

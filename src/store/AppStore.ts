import { sampleCategory, sampleFile } from '@/utils/constants'
import { create } from 'zustand'

interface AppState {
	// Modal
	open: boolean
	setOpen: (value: boolean) => void
	modal: Modals
	setModal: (value: Modals) => void

	// Categories
	category: Group | null
	setCategory: (value: Group | null) => void
	categories: Group[]
	setCategories: (value: Group[]) => void
	activeCategory: Group
	setActiveCategory: (value: Group) => void
	noDefaultCategories: () => Group[]

	// Entries
	entry: Entry | null
	setEntry: (value: Entry | null) => void
	entries: Entries
	setEntries: (value: Entries) => void

	// File
	file: CFile
	setFile: (value: CFile | ((prev: CFile) => CFile)) => void
}

export const useAppStore = create<AppState>()((set, get) => ({
	// Modal
	open: false,
	setOpen: (value) => {
		set({ open: value })
	},
	modal: 'category',
	setModal: (value) => {
		set({ modal: value })
	},

	// Categories
	category: null,
	setCategory: (value) => {
		set({ category: value })
	},
	categories: [{ ...sampleCategory, id: 'All', name: 'All' }],
	setCategories: (value) => {
		set({ categories: [{ ...sampleCategory, id: 'All', name: 'All' }, ...value] })
	},
	activeCategory: { ...sampleCategory, id: 'All', name: 'All' },
	setActiveCategory: (value) => {
		set({ activeCategory: value })
	},
	noDefaultCategories: () => {
		const { categories, file } = get()
		return categories.filter(
			(category) => category.id !== file.recycleBinId && category.id !== 'All'
		)
	},

	// Entries
	entry: null,
	setEntry: (value) => {
		set({ entry: value })
	},
	entries: {
		name: '',
		groups: [],
	},
	setEntries: (value) => {
		set({ entries: value })
	},

	// File
	file: sampleFile,
	setFile: (value) => {
		if (typeof value === 'function') {
			set((state) => ({
				file: (value as (prev: CFile) => CFile)(state.file),
			}))
		} else {
			set({ file: value })
		}
	},
}))

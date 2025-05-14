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

	// Entries
	entry: Entry | null
	setEntry: (value: Entry | null) => void
	entries: Entries
	setEntries: (value: Entries) => void

	// File
	masterKey: string
	setMasterKey: (value: string) => void
	file: CFile
	setFile: (value: CFile) => void
}

export const useAppStore = create<AppState>()((set) => ({
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
	setCategory(value) {
		set({ category: value })
	},
	categories: [{ id: 'All', name: 'All', params: { color: '' }, entries: [] }],
	setCategories(value) {
		set({ categories: [{ id: 'All', name: 'All', params: { color: '' }, entries: [] }, ...value] })
	},
	activeCategory: { id: 'All', name: 'All', params: { color: '' }, entries: [] },
	setActiveCategory: (value) => {
		set({ activeCategory: value })
	},

	// Entries
	entry: null,
	setEntry(value) {
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
	masterKey: '',
	setMasterKey(value) {
		set({ masterKey: value })
	},
	file: {
		name: '',
		lastModified: 0,
		size: 0,
	},
	setFile: (value) => {
		set({ file: value })
	},
}))

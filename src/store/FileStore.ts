import { getKdbxInstance } from '@/services/kdbxSingleton'
import { createRef, type RefObject } from 'react'
import { create } from 'zustand'

const kdbx = getKdbxInstance()

interface FileStore {
	itemContainerRef: RefObject<HTMLDivElement>
	canvasContainerRef: RefObject<HTMLDivElement>

	selectedItems: {
		id: string
		groupId: string
	}[]
	setSelectedItems: (entry: ManageEntry[]) => void
	addSelectedItem: (entry: ManageEntry) => void
	clearSelection: () => void
	removeSelectedItem: (entry: ManageEntry) => void

	dragRef: RefObject<HTMLDivElement | null>
	isDragging: boolean
	setIsDragging: (value: boolean) => void
}

export const useFileStore = create<FileStore>()((set, get) => ({
	canvasContainerRef: createRef<HTMLDivElement>() as RefObject<HTMLDivElement>,
	itemContainerRef: createRef<HTMLDivElement>() as RefObject<HTMLDivElement>,
	selectedItems: [],
	setSelectedItems: (value) => {
		set({ selectedItems: [...value] })
	},
	addSelectedItem: (value) => {
		const selectedItems = get().selectedItems
		set({ selectedItems: [...selectedItems, value] })
	},
	clearSelection: () => set({ selectedItems: [] }),
	removeSelectedItem: (entry) => {
		set((state) => ({
			selectedItems: state.selectedItems.filter((item) => item.id !== entry.id),
		}))
	},
	dragRef: createRef<HTMLDivElement>() as RefObject<HTMLDivElement>,
	isDragging: false,
	setIsDragging: (value) => set({ isDragging: value }),
}))

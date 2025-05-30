import { createRef } from 'react'
import { create } from 'zustand'

interface FileStore {
	itemContainerRef: React.RefObject<HTMLDivElement>
	canvasContainerRef: React.RefObject<HTMLDivElement>

	selectedItems: {
		id: string
		groupId: string
	}[]
	setSelectedItems: (entry: ManageEntry[]) => void
	addSelectedItem: (entry: ManageEntry) => void
	clearSelection: () => void
	removeSelectedItem: (entry: ManageEntry) => void

	dragRef: React.RefObject<HTMLDivElement | null>
	isDragging: boolean
	setIsDragging: (value: boolean) => void
}

export const useFileStore = create<FileStore>()((set, get) => ({
	canvasContainerRef: createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>,
	itemContainerRef: createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>,
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
	dragRef: createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>,
	isDragging: false,
	setIsDragging: (value) => set({ isDragging: value }),
}))

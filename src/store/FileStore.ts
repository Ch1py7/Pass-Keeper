import { createRef, type RefObject } from 'react'
import { create } from 'zustand'

interface FileStore {
	itemContainerRef: RefObject<HTMLDivElement>
	canvasContainerRef: RefObject<HTMLDivElement>
}

export const useFileStore = create<FileStore>()(() => ({
	canvasContainerRef: createRef<HTMLDivElement>() as RefObject<HTMLDivElement>,
	itemContainerRef: createRef<HTMLDivElement>() as RefObject<HTMLDivElement>,
}))

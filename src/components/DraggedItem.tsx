import { useFileStore } from '@/store/FileStore'
import { forwardRef } from 'react'

export const DraggedItem = forwardRef<HTMLDivElement>((_, ref) => {
	const { selectedItems } = useFileStore()
	return (
		<div
			className='-translate-x-[2000px] -translate-y-[2000px] -z-50 absolute w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)] font-bold'
			ref={ref}
		>
			{selectedItems.length}
		</div>
	)
})

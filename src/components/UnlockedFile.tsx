import { useFileStore } from '@/store/FileStore'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Categories } from './category/Categories'
import { EntryList } from './entry/EntryList'
import { Header } from './Header'
import { SelectionBox } from './SelectionBox'

export const UnlockedFile = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const { canvasContainerRef, setSelectedItems } = useFileStore()

	return (
		<div className='container mx-auto flex flex-col items-center' ref={canvasContainerRef}>
			<Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<div className='relative w-full flex lg:hidden items-center pt-6 px-10'>
				<Icon
					icon='radix-icons:magnifying-glass'
					className='absolute left-13 h-5 w-5 text-[var(--theme-text)] mt-1'
				/>
				<input
					placeholder='Search passwords...'
					value={searchQuery}
					onChange={(e) => {
						e.stopPropagation()
						setSearchQuery(e.target.value)
					}}
					className='pl-10 h-12 rounded-full bg-[var(--theme-action)] w-full border focus:ring-2 focus:ring-[var(--theme-bg-secondary)] focus:border-transparent select-none'
				/>
			</div>
			<div
				className='flex flex-col md:flex-row items-center md:items-start h-full w-full pt-6 pb-8 px-10 gap-6'
			>
				<SelectionBox />
				<Categories />
				<EntryList searchQuery={searchQuery} />
			</div>
		</div>
	)
}

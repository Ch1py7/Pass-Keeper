import { useFileStore } from '@/store/FileStore'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Header } from './Header'
import { Categories } from './category/Categories'
import { EntryList } from './entry/EntryList'
import { SelectionBox } from './selectionBox/SelectionBox'

export const UnlockedFile = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [isCompact, setIsCompact] = useState(true)
	const { canvasContainerRef } = useFileStore()

	return (
		<div className='max-w-7xl mx-auto flex flex-col items-center'>
			<Header isCompact={isCompact} setIsCompact={setIsCompact} />
			<div className='relative w-full max-w-lg flex items-center'>
				<Icon
					icon='radix-icons:magnifying-glass'
					className='absolute left-3 h-5 w-5 text-slate-400 mt-1'
				/>
				<input
					type='search'
					placeholder='Search passwords...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='pl-10 h-12 rounded-full w-full border-1 border-solid border-slate-300 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-transparent select-none'
				/>
			</div>
			<div
				ref={canvasContainerRef}
				className='flex flex-col md:flex-row items-center md:items-start h-full w-full pt-6 pb-8 px-10 gap-6'
			>
				<SelectionBox />
				<Categories />
				<EntryList searchQuery={searchQuery} isCompact={isCompact} />
			</div>
		</div>
	)
}

import { usePasswordTrie } from '@/hooks/usePasswordTrie'
import { useAppStore } from '@/store/AppStore'
import { useFileStore } from '@/store/FileStore'
import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'
import { Button } from '../common/Button'
import { CompactEntryCard } from './CompactEntryCard'

interface PasswordsProps {
	searchQuery: string
}

export const EntryList: React.FC<PasswordsProps> = ({ searchQuery }) => {
	const { setModal, setEntry, categories, activeCategory } = useAppStore()
	const results = usePasswordTrie(searchQuery)
	const { itemContainerRef, clearSelection, setSelectedItems } = useFileStore()

	return (
		<div
			ref={itemContainerRef}
			className={cn('grid gap-4 w-full')}
			style={{
				gridTemplateColumns: 'repeat(auto-fit, minmax(16em, 1fr))',
			}}
		>
			{results.length === 0 ? (
				<div className='p-8 text-center'>
					<div className='w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Icon icon='tabler:lock' className='h-10 w-10 text-slate-400' />
					</div>
					<h3 className='text-xl font-bold mb-2'>No passwords found</h3>
					<p className='text-slate-500 mb-6'>
						{activeCategory.id !== 'All'
							? `No passwords found in the "${activeCategory.name}" category.`
							: 'Add a new password to get started'}
					</p>
					<Button
						iconLeft='lucide:circle-plus'
						content='Add Password'
						onClick={() => {
							setModal('entry')
						}}
						styles='mx-auto btn-primary'
					/>
				</div>
			) : (
				<>
					{results.map((entry, index) => (
						<CompactEntryCard
							key={index}
							entry={entry}
							category={
								categories.find((category) => category.id === entry.groupId) ?? ({} as Group)
							}
							onEdit={(e) => {
								e.stopPropagation()
								clearSelection()
								setEntry(entry)
								setModal('entry')
							}}
							onDelete={(e) => {
								e.stopPropagation()
								setSelectedItems([entry])
								setModal('delete')
							}}
						/>
					))}
				</>
			)}
		</div>
	)
}

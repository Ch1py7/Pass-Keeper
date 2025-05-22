import { usePasswordTrie } from '@/hooks/usePasswordTrie'
import { useAppStore } from '@/store/AppStore'
import { useFileStore } from '@/store/FileStore'
import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'
import { ActionButton } from '../common/ActionButtons'
import { Button } from '../common/Button'
import { CompactEntryCard } from './CompactEntryCard'

interface PasswordsProps {
	searchQuery: string
}

export const EntryList: React.FC<PasswordsProps> = ({ searchQuery }) => {
	const { setOpen, setModal, setEntry, categories, activeCategory } = useAppStore()
	const { selectedItems } = useFileStore()
	const results = usePasswordTrie(searchQuery)
	const { itemContainerRef, setSelectedItems } = useFileStore()

	return (
		<div className='w-full h-fit'>
			<div className='rounded-2xl shadow-xl overflow-hidden'>
				<div className='px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 flex justify-between items-center'>
					<h2 className='text-xl font-bold text-white'>Entries</h2>
					<div className='flex gap-1'>
						<ActionButton
							icon='lucide:plus'
							onClick={() => {
								setOpen(true)
								setModal('entry')
							}}
							iconStyles='w-5 h-5'
							styles='hover:text-white hover:bg-black/15 text-white'
						/>
						<ActionButton
							icon='lucide:trash'
							onClick={() => {
								setModal('delete')
								setOpen(true)
							}}
							iconStyles='w-5 h-5'
							styles='hover:text-white hover:bg-black/15 text-white disabled:hidden'
							disabled={selectedItems.length === 0}
						/>
					</div>
				</div>
				<div
					ref={itemContainerRef}
					className={cn('w-full grid gap-4 h-fit p-4')}
					style={{
						gridTemplateColumns: 'repeat(auto-fit, minmax(15em, 1fr))',
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
									setOpen(true)
									setModal('entry')
								}}
								style='primary'
								styles='mx-auto text-white'
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
										setSelectedItems([])
										setEntry(entry)
										setModal('entry')
										setOpen(true)
									}}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

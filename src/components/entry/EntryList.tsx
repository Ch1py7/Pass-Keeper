import { usePasswordTrie } from '@/hooks/usePasswordTrie'
import { useAppStore } from '@/store/AppStore'
import { Icon } from '@iconify/react'
import { Button } from '../common/Button'
import { EntryCard } from './EntryCard'

interface PasswordsProps {
	searchQuery: string
}

export const EntryList: React.FC<PasswordsProps> = ({ searchQuery }) => {
	const { setOpen, setModal, setEntry, categories, activeCategory } = useAppStore()
	const results = usePasswordTrie(searchQuery)

	return (
		<div className='w-full lg:w-3/4'>
			{results.length === 0 ? (
				<div className='bg-white rounded-2xl shadow-xl p-8 text-center'>
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
						iconLeft='simple-line-icons:plus'
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
				<div className='grid gap-6 md:grid-cols-2'>
					{results.map((entry, index) => (
						<EntryCard
							key={index}
							entry={entry}
							category={
								categories.find((category) => category.id === entry.groupId) ?? ({} as Group)
							}
							onEdit={() => {
								setEntry(entry)
								setModal('entry')
								setOpen(true)
							}}
							onDelete={() => {
								setEntry(entry)
								setModal('delete')
								setOpen(true)
							}}
						/>
					))}
				</div>
			)}
		</div>
	)
}

import { useAppStore } from '@/store/AppStore'
import { useFileStore } from '@/store/FileStore'
import { totalEntries } from '@/utils/common'
import { ActionButton } from '../common/ActionButtons'
import { CategoryRow } from './CategoryRow'

export const Categories = () => {
	const {
		setOpen,
		setModal,
		categories,
		activeCategory,
		entries,
		setActiveCategory,
		setCategory,
		file: { recycleBinId },
	} = useAppStore()
	const { setSelectedItems } = useFileStore()

	return (
		<div className='w-full md:max-w-86 h-fit select-none' onMouseDown={() => setSelectedItems([])}>
			<div className='rounded-2xl overflow-hidden shadow-[var(--theme-shadow-lg)]'>
				<div className='px-4 py-3 bg-gradient-to-r from-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)] flex justify-between items-center'>
					<h2 className='text-xl text-[var(--theme-text-on-primary)] font-bold'>Categories</h2>
					<ActionButton
						icon='lucide:plus'
						onClick={() => {
							setOpen(true)
							setModal('category')
						}}
						styles='hover:bg-[var(--theme-hover)] text-[var(--theme-text-on-primary)] p-1'
						iconStyles='w-5 h-5'
					/>
				</div>
				<div className='p-4 bg-[var(--theme-card)]'>
					<div className='space-y-1'>
						{categories.map((category) => (
							<CategoryRow
								key={category.id}
								category={category}
								recycleBinId={recycleBinId}
								isActive={activeCategory.id === category.id}
								total={
									category.name === 'All'
										? totalEntries(entries.groups.filter((e) => e.id !== recycleBinId))
										: totalEntries(entries.groups.filter((p) => p.id === category.id))
								}
								onSelect={(e) => {
									e.stopPropagation()
									setSelectedItems([])
									setActiveCategory(category)
								}}
								onEdit={(e) => {
									e.stopPropagation()
									setSelectedItems([])
									setCategory(category)
									setModal('category')
									setOpen(true)
								}}
								onDelete={(e) => {
									e.stopPropagation()
									setSelectedItems([])
									setCategory(category)
									setModal('delete')
									setOpen(true)
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

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
		<div className='w-full md:max-w-86 h-fit select-none'>
			<div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
				<div className='px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 flex justify-between items-center'>
					<h2 className='text-xl font-bold text-white'>Categories</h2>
					<div className='flex gap-1'>
						<ActionButton
							icon='lucide:plus'
							onClick={() => {
								setOpen(true)
								setModal('category')
							}}
							iconStyles='w-5 h-5'
							styles='hover:text-white hover:bg-black/15 text-white'
						/>
					</div>
				</div>
				<div className='p-4'>
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
								onSelect={() => {
									setSelectedItems([])
									setActiveCategory(category)
								}}
								onEdit={() => {
									setSelectedItems([])
									setCategory(category)
									setModal('category')
									setOpen(true)
								}}
								onDelete={() => {
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

import { useAppStore } from '@/store/AppStore'
import { totalEntries } from '@/utils/common'
import { Button } from '../common/Button'
import { CategoryRow } from './CategoryRow'

export const Categories: React.FC = () => {
	const {
		setOpen,
		setModal,
		categories,
		activeCategory,
		entries,
		setActiveCategory,
		setCategory,
		file,
	} = useAppStore()

	return (
		<div className='w-full lg:w-1/4'>
			<div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
				<div className='p-4 bg-gradient-to-r from-purple-600 to-pink-600'>
					<h2 className='text-xl font-bold text-white'>Categories</h2>
				</div>
				<div className='p-4'>
					<div className='space-y-1'>
						{categories.map((category) => (
							<CategoryRow
								key={category.id}
								category={category}
								recycleBinId={file.recycleBinId}
								isActive={activeCategory.id === category.id}
								total={
									category.name === 'All'
										? totalEntries(entries.groups)
										: totalEntries(entries.groups.filter((p) => p.id === category.id))
								}
								onSelect={() => setActiveCategory(category)}
								onEdit={() => {
									setCategory(category)
									setModal('category')
									setOpen(true)
								}}
								onDelete={() => {
									setCategory(category)
									setModal('delete')
									setOpen(true)
								}}
							/>
						))}
						<Button
							shadows={false}
							style='tertiary'
							content='Add Category'
							iconLeft='tabler:plus'
							iconLeftStyles='w-5 h-5'
							fullWidth
							onClick={() => {
								setOpen(true)
								setModal('category')
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

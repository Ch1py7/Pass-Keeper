import { getCategory } from '@/utils/categories'
import { cn } from '@/utils/cn'
import { getAvailableColor } from '@/utils/common'
import { Icon } from '@iconify/react'
import { ActionButtons } from '../common/ActionButtons'

interface CategoryRowProps {
	recycleBinId: string
	category: Group
	isActive: boolean
	total: number
	onSelect: () => void
	onEdit: () => void
	onDelete: () => void
}

const activeBackground = (color: string) =>
	color ? getAvailableColor(color).bg : 'from-purple-100 to-pink-100 text-purple-700'

export const CategoryRow: React.FC<CategoryRowProps> = ({
	category,
	isActive,
	total,
	onSelect,
	onEdit,
	onDelete,
	recycleBinId,
}) => {
	const isDefaultCategory = [recycleBinId, 'All'].includes(category.id)
	const { color } = category.params
	const { icon } = getCategory(category.name)

	return (
		<div className='group relative mb-1'>
			<div className='flex items-center'>
				<button
					type='button'
					className={cn(
						'w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer',
						isActive && 'bg-gradient-to-r font-medium',
						isActive && activeBackground(color),
						!isActive && 'hover:bg-slate-100'
					)}
					onClick={onSelect}
				>
					<Icon
						icon={category.name === 'All' ? 'material-symbols:shield-outline-rounded' : icon}
						className='h-5 w-5'
					/>
					{category.name}
					<span className='ml-auto bg-slate-200 text-slate-600 text-xs rounded-full px-2 py-1'>
						{total}
					</span>
				</button>
				{!isDefaultCategory && <ActionButtons onClickEdit={onEdit} onClickDelete={onDelete} />}
			</div>
		</div>
	)
}

import { kdbxErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useFileStore } from '@/store/FileStore'
import { cn } from '@/utils/cn'
import { getAvailableColor } from '@/utils/common'
import { assignKdbxData } from '@/utils/kdbxHelpers'
import { Icon } from '@iconify/react'
import * as kdbxweb from 'kdbxweb'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ActionButton } from '../common/ActionButtons'

interface CategoryRowProps {
	recycleBinId: string
	category: Group
	isActive: boolean
	total: number
	onSelect: () => void
	onEdit: () => void
	onDelete: () => void
}

const activeBackground = (color: ColorName) =>
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
	const { color, icon } = category.params
	const { selectedItems, setSelectedItems } = useFileStore()
	const [isHovered, setIsHovered] = useState(false)
	const kdbx = getKdbxInstance()
	const { selectedColor } = getAvailableColor(color)

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		if (category.id === 'All') return
		e.preventDefault()
		setIsHovered(true)
	}

	const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		if (category.id === 'All') return
		e.preventDefault()
		setIsHovered(false)
	}

	const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		if (category.id === 'All') return
		e.preventDefault()
		const validToMove = selectedItems.filter((entry) => entry.groupId !== category.id)
		validToMove.map((entry) => kdbx.moveEntry(entry, category.id))
		try {
			await kdbx.persist()
			assignKdbxData(kdbx)
			setSelectedItems([])
			setIsHovered(false)
			validToMove.length !== 0 && toast.success(`${validToMove.length} moved successfully`)
		} catch (err) {
			if (err instanceof DOMException) kdbxErrorsHandle(err.name)
			else if (err instanceof kdbxweb.KdbxError) kdbxErrorsHandle(err.code)
			else {
				console.error(err)
				toasty.error('An unknown error occurred')
			}
		}
	}

	return (
		<div
			data-droppable={true}
			onDragOver={onDragOver}
			onDrop={onDrop}
			onDragLeave={onDragLeave}
			className={cn(
				'group relative mb-1 transition-all duration-200 rounded-full text-slate-300',
				isHovered && `${selectedColor}`
			)}
		>
			<div className='flex items-center'>
				<button
					type='button'
					className={cn(
						'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer text-black',
						isActive && 'bg-gradient-to-r font-medium text-white',
						isActive && activeBackground(color),
						!isActive && 'hover:bg-slate-100'
					)}
					onClick={onSelect}
				>
					<Icon icon={category.name === 'All' ? 'lucide:shield' : icon} className='h-5 w-5' />
					{category.name}
					<span className='ml-auto bg-slate-200 text-slate-600 text-xs rounded-full px-2 py-1'>
						{total}
					</span>
				</button>
				<div className='flex gap-1 ms-1 min-w-16 me-3'>
					{(!isDefaultCategory || recycleBinId === category.id) && (
						<ActionButton onClick={onEdit} icon={'lucide:edit'} />
					)}
					{!isDefaultCategory && <ActionButton onClick={onDelete} icon={'lucide:trash'} />}
				</div>
			</div>
		</div>
	)
}

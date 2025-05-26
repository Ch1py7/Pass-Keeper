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
	const { selectedColor, bg } = getAvailableColor(color)

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
			validToMove.length !== 0 && toasty.success(`${validToMove.length} moved successfully`)
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
				'group relative mb-1 transition-all duration-200 rounded-lg flex gap-1',
				isHovered && `${selectedColor}`
			)}
		>
			<button
				type='button'
				className={cn(
					'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-[var(--theme-text-on-card)]',
					isActive && 'bg-gradient-to-r font-medium',
					isActive && bg,
					isActive && category.id === 'All' && 'text-[var(--theme-text-on-primary)]',
					!isActive && 'hover:bg-[var(--theme-hover)] hover:text-[var(--theme-text)]'
				)}
				onClick={onSelect}
			>
				<Icon icon={category.name === 'All' ? 'lucide:shield' : icon} className='h-5 w-5' />
				{category.name}
				<span className='ml-auto bg-[var(--theme-bg-primary)] text-xs rounded-full px-2 py-1 text-[var(--theme-text-on-primary)]'>
					{total}
				</span>
			</button>
			<div className='min-w-16 flex items-center gap-1'>
				{(!isDefaultCategory || recycleBinId === category.id) && (
					<ActionButton
						onClick={onEdit}
						icon={'lucide:edit'}
						styles='hover:bg-[var(--theme-hover)] text-[var(--theme-text)] hover:text-[var(--theme-text)] p-2'
					/>
				)}
				{!isDefaultCategory && (
					<ActionButton
						onClick={onDelete}
						icon={'lucide:trash'}
						styles='hover:bg-[var(--theme-hover)] text-[var(--theme-text)] hover:text-[var(--theme-text)] p-2'
					/>
				)}
			</div>
		</div>
	)
}

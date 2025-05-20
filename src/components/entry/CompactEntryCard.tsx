import { toasty } from '@/notifications/toast'
import { useFileStore } from '@/store/FileStore'
import { cn } from '@/utils/cn'
import { getAvailableColor } from '@/utils/common'
import { getDefaultCategory, LEFT_MOUSE_BTN } from '@/utils/constants'
import { Icon } from '@iconify/react'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { useRef, useState } from 'react'
import { ActionButton } from '../common/ActionButtons'
import { DraggedItem } from '../DraggedItem'

interface CompactEntryCardProps {
	entry: Entry
	category: Group
	onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const CompactEntryCard: React.FC<CompactEntryCardProps> = ({
	entry,
	category,
	onEdit,
	onDelete,
}) => {
	const [showEntry, setShowEntry] = useState(false)
	const { color: paramColor } = category.params
	const { icon } = getDefaultCategory(entry.groupName)
	const {
		selectedItems,
		clearSelection,
		removeSelectedItem,
		addSelectedItem,
		isDragging: isSomethingDragging,
		setIsDragging,
	} = useFileStore()
	const isSelected = selectedItems.find((item) => item.id === entry.id)
	const { bg, selectedColor } = getAvailableColor(paramColor)
	const isDragging = isSomethingDragging && selectedItems.some(({ id }) => id === entry.id)
	const draggedItemRef = useRef<HTMLDivElement>(null)

	const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		setShowEntry((p) => !p)
	}

	const clipboard = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		try {
			await writeText(entry.password)
			toasty.success('Copy to clipboard!')
		} catch (err) {
			console.error(err)
		}
	}

	const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		if (e.button !== LEFT_MOUSE_BTN) return
		if (!e.ctrlKey) clearSelection()

		e.ctrlKey && isSelected
			? removeSelectedItem({ id: entry.id, groupId: entry.groupId })
			: addSelectedItem({ id: entry.id, groupId: entry.groupId })
	}

	const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.stopPropagation()
		e.dataTransfer.effectAllowed = 'move'
		if (draggedItemRef.current) {
			e.dataTransfer.setDragImage(draggedItemRef.current, 0, 0)
		}

		setIsDragging(true)

		if (isSelected) return

		if (!e.ctrlKey) clearSelection()

		e.ctrlKey && isSelected
			? removeSelectedItem({ id: entry.id, groupId: entry.groupId })
			: addSelectedItem({ id: entry.id, groupId: entry.groupId })
	}

	const onDragEnd = () => {
		setIsDragging(false)
	}

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: le pregunte a mis huevos y dijeron que ta bien
		<div
			className={cn(
				'overflow-hidden border-0 shadow-md transition-all duration-200 rounded-xl',
				!isSelected && 'hover:shadow-lg',
				isSelected && !isDragging && selectedColor,
				isSelected && !isDragging && '-translate-y-1',
				isDragging && 'scale-95 opacity-50'
			)}
			onClick={onClick}
			data-id={entry.id}
			data-groupid={entry.groupId}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable={true}
		>
			<DraggedItem ref={draggedItemRef} />
			<div className={cn('h-1 bg-gradient-to-r', bg)} />
			<div className='p-3'>
				<div className='flex items-start justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<div
							className={cn(
								'min-w-8 min-h-8 rounded-full bg-gradient-to-r flex items-center justify-center',
								bg
							)}
						>
							<Icon icon={icon} className='h-5 w-5 text-white' />
						</div>
						<div>
							<h3 className='font-bold text-sm max-w-25 truncate'>{entry.title}</h3>
							<p className='text-xs text-slate-400 truncate max-w-25'>{entry.username}</p>
						</div>
					</div>
					<div className='flex gap-1'>
						<ActionButton
							onClick={handleShowPassword}
							icon={showEntry ? 'lucide:eye' : 'lucide:eye-off'}
						/>
						<ActionButton onClick={onEdit} icon={'lucide:edit'} />
						<ActionButton onClick={onDelete} icon={'lucide:trash'} />
					</div>
				</div>
				<button
					type='button'
					className='flex items-center gap-2 py-2 ps-3 pe-8 bg-slate-100 hover:bg-slate-200 transition-color duration-100 rounded-lg relative w-full cursor-pointer'
					onClick={clipboard}
				>
					<div
						className={cn(
							'absolute right-2 -top-2 px-3 rounded-full text-xs bg-gradient-to-r text-white border-0 w-fit max-w-20 truncate',
							bg
						)}
					>
						{entry.groupName}
					</div>
					<p className='font-medium max-w truncate'>{showEntry ? entry.password : '••••••••'}</p>
					<Icon className='absolute right-3 h-4 w-4' icon={'lucide:copy'} />
				</button>
			</div>
		</div>
	)
}

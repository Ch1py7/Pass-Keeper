import { getCategory } from '@/utils/categories'
import { cn } from '@/utils/cn'
import { getAvailableColor } from '@/utils/common'
import { Icon } from '@iconify/react'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { useState } from 'react'
import { ActionButton } from '../common/ActionButtons'
import { toasty } from '@/notifications/toast'

interface CompactEntryCardProps {
	entry: Entry
	category: Group
	onEdit: () => void
	onDelete: () => void
}

export const CompactEntryCard: React.FC<CompactEntryCardProps> = ({
	entry,
	category,
	onEdit,
	onDelete,
}) => {
	const [showEntry, setShowEntry] = useState(false)
	const { color } = category.params
	const { icon } = getCategory(entry.groupName)

	const clipboard = async () => {
		try {
			await writeText(entry.password)
			toasty.success('Copy to clipboard!')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-md max-w-72 select-none'>
			<div className={cn('h-1 bg-gradient-to-r', getAvailableColor(color).bg)} />
			<div className='p-3'>
				<div className='flex items-start justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<div
							className={cn(
								'min-w-8 min-h-8 rounded-full bg-gradient-to-r flex items-center justify-center',
								getAvailableColor(color).bg
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
							onClick={() => setShowEntry((p) => !p)}
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
							getAvailableColor(color).bg
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

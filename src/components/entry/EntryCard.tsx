import { getCategory } from '@/utils/categories'
import { cn } from '@/utils/cn'
import { getAvailableColor } from '@/utils/common'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { ActionButton } from '../common/ActionButtons'

interface EntryCardProps {
	entry: Entry
	category: Group
	onEdit: () => void
	onDelete: () => void
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry, category, onEdit, onDelete }) => {
	const [showEntry, setShowEntry] = useState(false)
	const { color } = category.params
	const { icon } = getCategory(entry.groupName)

	return (
		<div className='overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200'>
			<div className={cn('h-2 bg-gradient-to-r', getAvailableColor(color).bg)} />
			<div className='p-6'>
				<div className='flex items-start justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<div
							className={cn(
								'min-w-10 min-h-10 rounded-full bg-gradient-to-r flex items-center justify-center',
								getAvailableColor(color).bg
							)}
						>
							<Icon icon={icon} className='h-5 w-5 text-white' />
						</div>
						<div className='w-full'>
							<h3 className='font-bold text-lg inline-block max-w-64 truncate'>{entry.title}</h3>
							<div
								className={cn(
									'px-3 rounded-full bg-gradient-to-r text-white border-0 w-fit max-w-32 truncate',
									getAvailableColor(color).bg
								)}
							>
								{entry.groupName}
							</div>
						</div>
					</div>
					<div className='flex gap-1'>
						<ActionButton onClick={onEdit} icon={'lucide:edit'} />
						<ActionButton onClick={onDelete} icon={'lucide:trash'} />
					</div>
				</div>

				<div className='space-y-2 mt-4'>
					<div className='flex items-center gap-2 py-1 px-3 bg-slate-100 rounded-lg relative'>
						<Icon icon='lucide:user' className='h-4 w-4 text-slate-400 absolute top-1/3 left-3' />
						<div className='w-full ps-6'>
							<p className='text-xs text-slate-500'>Username</p>
							<p className='font-medium inline-block max-w-full truncate'>{entry.username}</p>
						</div>
					</div>

					<div className='flex items-center gap-2 py-1 px-3 bg-slate-100 rounded-lg relative'>
						<Icon
							icon='lucide:key-round'
							className='h-4 w-4 text-slate-400 absolute top-1/3 left-3'
						/>
						<div className='w-full px-6'>
							<p className='text-xs text-slate-500'>Password</p>
							<p className='font-medium inline-block max-w-full truncate'>
								{showEntry ? entry.password : '••••••••'}
							</p>
						</div>
						<ActionButton
							styles='absolute top-3 right-3'
							onClick={() => setShowEntry((p) => !p)}
							icon={showEntry ? 'lucide:eye' : 'lucide:eye-off'}
						/>
					</div>

					{entry.url && (
						<div className='flex items-center gap-2 py-1 px-3 bg-slate-100 rounded-lg relative'>
							<Icon
								icon='lucide:globe'
								className='h-4 w-4 text-slate-400 absolute top-1/3 left-3'
							/>
							<div className='w-full ps-6'>
								<p className='text-xs text-slate-500'>Website</p>
								<a
									href={entry.url}
									target='_blank'
									rel='noopener noreferrer'
									className='text-purple-600 hover:text-purple-800 hover:underline font-medium inline-block max-w-full truncate'
								>
									{entry.url}
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

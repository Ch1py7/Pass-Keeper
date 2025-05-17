import { getCategory } from '@/utils/categories'
import { cn } from '@/utils/cn'
import { getAvailableColor } from '@/utils/common'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { ActionButtons } from '../common/ActionButtons'

interface PasswordCardProps {
	entry: Entry
	category: Group
	onEdit: () => void
	onDelete: () => void
}

export const EntryCard: React.FC<PasswordCardProps> = ({ entry, category, onEdit, onDelete }) => {
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
								'w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center',
								getAvailableColor(color).bg
							)}
						>
							<Icon icon={icon} className='h-5 w-5 text-white' />
						</div>
						<div>
							<h3 className='font-bold text-lg'>{entry.title}</h3>
							<div
								className={cn(
									'px-3 rounded-full bg-gradient-to-r text-white border-0 w-fit',
									getAvailableColor(color).bg
								)}
							>
								{entry.groupName}
							</div>
						</div>
					</div>
					<ActionButtons onClickEdit={onEdit} onClickDelete={onDelete} />
				</div>

				<div className='space-y-4 mt-4'>
					<div className='flex items-center gap-2 p-3 bg-slate-50 rounded-lg'>
						<Icon icon='ri:user-line' className='h-4 w-4 text-slate-400' />
						<div className='flex-1'>
							<p className='text-xs text-slate-500'>Username</p>
							<p className='font-medium'>{entry.username}</p>
						</div>
					</div>

					<div className='flex items-center gap-2 p-3 bg-slate-50 rounded-lg'>
						<Icon icon='ri:key-2-line' className='h-4 w-4 text-slate-400' />
						<div className='flex-1'>
							<p className='text-xs text-slate-500'>Password</p>
							<div className='flex items-center gap-2'>
								<p className='font-medium'>{showEntry ? entry.password : '••••••••'}</p>
								<button
									type='button'
									className='h-8 w-8 p-0 rounded-full'
									onClick={() => setShowEntry((p) => !p)}
								>
									{showEntry ? (
										<Icon icon='mdi-light:eye-off' className='h-4 w-4' />
									) : (
										<Icon icon='mdi-light:eye' className='h-4 w-4' />
									)}
									<span className='sr-only'>{showEntry ? 'Hide' : 'Show'} password</span>
								</button>
							</div>
						</div>
					</div>

					{entry.url && (
						<div className='flex items-center gap-2 p-3 bg-slate-50 rounded-lg'>
							<Icon icon='akar-icons:globe' className='h-4 w-4 text-slate-400' />
							<div className='flex-1'>
								<p className='text-xs text-slate-500'>Website</p>
								<a
									href={entry.url}
									target='_blank'
									rel='noopener noreferrer'
									className='text-purple-600 hover:text-purple-800 hover:underline font-medium'
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

import { kdbxErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { cn } from '@/utils/cn'
import { getAvailableColor, getDefaultCategory } from '@/utils/common'
import { Icon } from '@iconify/react'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import * as kdbxweb from 'kdbxweb'
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
	const { icon } = getDefaultCategory(entry.groupName)

	const clipboard = async () => {
		try {
			await writeText(entry.password)
			toasty.success('Copy to clipboard!')
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
		<div className='overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-md w-full h-fit'>
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
							<h3 className='font-bold text-lg inline-block max-w-55 truncate'>{entry.title}</h3>
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
						<ActionButton
							onClick={() => setShowEntry((p) => !p)}
							icon={showEntry ? 'lucide:eye' : 'lucide:eye-off'}
						/>
						<ActionButton onClick={onEdit} icon={'lucide:edit'} />
						<ActionButton onClick={onDelete} icon={'lucide:trash'} />
					</div>
				</div>

				<div className='space-y-2 mt-4'>
					<div className='flex items-center gap-2 py-1 px-3 bg-slate-100 rounded-lg relative'>
						<Icon icon='lucide:user' className='h-4 w-4 text-slate-400 absolute top-1/3 left-3' />
						<div className='flex flex-col items-start justify-center w-full ps-6'>
							<p className='text-xs text-slate-500'>Username</p>
							<p className='font-medium inline-block max-w-full truncate'>{entry.username}</p>
						</div>
					</div>

					<button
						type='button'
						className='flex items-center gap-2 py-2 px-9 bg-slate-100 hover:bg-slate-200 transition-color duration-100 rounded-lg relative w-full cursor-pointer'
						onClick={clipboard}
					>
						<Icon
							icon='lucide:key-round'
							className='h-4 w-4 text-slate-400 absolute top-1/3 left-3'
						/>
						<div
							className={cn(
								'absolute right-2 -top-2 px-3 rounded-full text-xs bg-gradient-to-r text-white border-0 w-fit max-w-20 truncate',
								getAvailableColor(color).bg
							)}
						>
							{entry.groupName}
						</div>
						<div className='flex flex-col items-start justify-center max-w-full'>
							<p className='text-xs text-slate-500'>Password</p>
							<p className='font-medium max-w-full truncate'>
								{showEntry ? entry.password : '••••••••'}
							</p>
						</div>
						<Icon className='absolute right-3 h-4 w-4' icon={'lucide:copy'} />
					</button>

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

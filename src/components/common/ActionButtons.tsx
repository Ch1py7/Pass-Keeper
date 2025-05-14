import { Icon } from '@iconify/react'

interface ActionButtons {
	onClickEdit: () => void
	onClickDelete: () => void
}

export const ActionButtons: React.FC<ActionButtons> = ({ onClickDelete, onClickEdit }) => {
	return (
		<div className='flex gap-1'>
			<button
				type='button'
				className='p-2 rounded-sm hover:bg-slate-100 cursor-pointer text-slate-500 hover:text-slate-900'
				onClick={onClickEdit}
			>
				<Icon icon='lucide:edit' className='h-4 w-4' />
				<span className='sr-only'>Edit</span>
			</button>
			<button
				type='button'
				className='p-2 rounded-sm hover:bg-slate-100 cursor-pointer text-slate-500 hover:text-red-600'
				onClick={onClickDelete}
			>
				<Icon icon='gg:trash' className='h-4 w-4' />
				<span className='sr-only'>Delete</span>
			</button>
		</div>
	)
}

import { Icon } from '@iconify/react'

interface ActionButtonProps {
	onClick: () => void
	icon: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon }) => {
	return (
		<button
			type='button'
			className='p-2 rounded-sm hover:bg-slate-100 cursor-pointer text-slate-500 hover:text-slate-900'
			onClick={onClick}
		>
			<Icon icon={icon} className='h-4 w-4' />
		</button>
	)
}

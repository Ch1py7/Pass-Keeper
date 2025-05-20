import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'

interface ActionButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	icon: string
	styles?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, styles }) => {
	return (
		<button
			type='button'
			className={cn(
				'p-2 rounded-sm hover:bg-slate-100 cursor-pointer text-slate-500 hover:text-slate-900',
				styles
			)}
			onClick={onClick}
		>
			<Icon icon={icon} className='h-4 w-4' />
		</button>
	)
}

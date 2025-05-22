import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'

interface ActionButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	icon: string
	styles?: string
	iconStyles?: string
	disabled?: boolean
}

export const ActionButton: React.FC<ActionButtonProps> = ({
	onClick,
	icon,
	styles,
	iconStyles,
	disabled,
}) => {
	return (
		<button
			type='button'
			className={cn(
				'p-2 rounded-sm hover:bg-slate-100 cursor-pointer text-slate-500 hover:text-slate-900 disabled:cursor-default',
				styles
			)}
			disabled={disabled}
			onClick={onClick}
		>
			<Icon icon={icon} className={cn('h-4 w-4', iconStyles)} />
		</button>
	)
}

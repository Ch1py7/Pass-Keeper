import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'

interface ActionButtonProps {
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	icon: string
	styles?: string
	iconStyles?: string
	disabled?: boolean
}

export const ActionButton: React.FC<ActionButtonProps> = ({
	onClick,
	onMouseDown,
	icon,
	styles,
	iconStyles,
	disabled,
}) => {
	return (
		<button
			type='button'
			className={cn(
				'rounded-full disabled:cursor-default transition-all duration-200 h-fit w-fit',
				styles
			)}
			disabled={disabled}
			onClick={onClick}
			onMouseDown={onMouseDown}
		>
			<Icon icon={icon} className={cn('h-4 w-4', iconStyles)} />
		</button>
	)
}

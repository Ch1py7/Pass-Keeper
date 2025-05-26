import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'

type ButtonProps = {
	content: string
	styles?: string
	iconLeft?: string
	iconLeftStyles?: string
	iconRight?: string
	iconRightStyles?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
	styles,
	content,
	iconLeft,
	iconRight,
	onClick,
	disabled = false,
	fullWidth = false,
	iconLeftStyles,
	iconRightStyles,
}) => {
	return (
		<button
			type='button'
			onClick={onClick}
			disabled={disabled}
			className={cn(
				'flex items-center rounded-md px-4 py-2 transition-colors duration-200 gap-2 disabled:cursor-default disabled:bg-[var(--theme-muted)]',
				fullWidth && 'flex-1 w-full',
				styles
			)}
		>
			{iconLeft && <Icon icon={iconLeft} className={cn('h-4 w-4', iconLeftStyles)} />}
			{content}
			{iconRight && <Icon icon={iconRight} className={cn('h-4 w-4', iconRightStyles)} />}
		</button>
	)
}

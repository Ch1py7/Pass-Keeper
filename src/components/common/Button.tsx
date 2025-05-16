import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'

const primaryStyles = (disabled: boolean) =>
	cn(
		'hover:from-purple-700 hover:to-pink-700',
		disabled ? 'bg-gray-300' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
	)
const secondaryStyles = 'border border-slate-200 hover:bg-slate-300'
const tertiaryStyles = 'text-purple-600 hover:bg-purple-50'
const deleteStyles = 'bg-red-500 hover:bg-red-400 text-white'
const shadowStyles = 'shadow-md hover:shadow-lg'

type ButtonProps = {
	style: 'primary' | 'secondary' | 'tertiary' | 'deleteStyles'
	content: string
	styles?: string
	iconLeft?: string
	iconLeftStyles?: string
	iconRight?: string
	iconRightStyles?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	fullWidth?: boolean
	shadows?: boolean
}

export const Button: React.FC<ButtonProps> = ({
	style,
	styles,
	content,
	iconLeft,
	iconRight,
	onClick,
	disabled = false,
	fullWidth = false,
	shadows = true,
	iconLeftStyles,
	iconRightStyles,
}) => {
	return (
		<button
			type='button'
			onClick={onClick}
			disabled={disabled}
			className={cn(
				'flex justify-center items-center rounded-md px-4 py-2 transition-colors duration-200 gap-2 cursor-pointer',
				style === 'primary' && primaryStyles(disabled),
				style === 'secondary' && secondaryStyles,
				style === 'tertiary' && tertiaryStyles,
				style === 'deleteStyles' && deleteStyles,
				fullWidth && 'flex-1 w-full',
				shadows && shadowStyles,
				styles
			)}
		>
			{iconLeft && <Icon icon={iconLeft} className={cn('h-4 w-4', iconLeftStyles)} />}
			{content}
			{iconRight && <Icon icon={iconRight} className={cn('h-4 w-4', iconRightStyles)} />}
		</button>
	)
}

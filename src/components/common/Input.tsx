import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'

interface InputProps {
	value: string
	placeholder: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	label: string
	id?: string
	icon?: string
	type?: string
	disabled?: boolean
	styles?: string
	ref?: React.RefObject<HTMLInputElement | null>
}

export const Input: React.FC<InputProps> = ({
	placeholder,
	value,
	onChange,
	label,
	icon,
	type,
	disabled,
	id = '',
	styles,
	ref,
}) => {
	return (
		<div>
			<label htmlFor={id} className='flex items-center gap-2 font-medium'>
				{icon && <Icon icon={icon} className='h-4 w-4' />}
				{label}
			</label>
			<input
				ref={ref}
				disabled={disabled}
				className={cn(
					'h-10 px-3 bg-[var(--theme-action)] rounded-lg w-full border-1 border-[var(--theme-border)] disabled:bg-[var(--theme-muted)] disabled:text-[var(--theme-text-muted)]',
					styles
				)}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type={type ?? 'text'}
				checked
			/>
		</div>
	)
}

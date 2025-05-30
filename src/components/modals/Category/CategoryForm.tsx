import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { cn } from '@/utils/cn'
import { availableColors } from '@/utils/constants'
import { Icon } from '@iconify/react'
import type React from 'react'
import { useEffect, useRef } from 'react'
import { IconExplanation } from './IconExplanation'

interface CategoryFormProps {
	newCategory: Group
	onHandleChange: (key: string, value: string) => void
	onSubmit: () => void
	onCancel: () => void
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
	newCategory,
	onHandleChange,
	onSubmit,
	onCancel,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])
	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSubmit()
	}

	return (
		<div
			onKeyDown={handleEnterPress}
			className='sm:max-w-[500px] w-full border-0 rounded-xl bg-[var(--theme-modal)] p-8 space-y-3'
		>
			<div>
				<h3 className='text-2xl font-bold'>
					{newCategory.id ? newCategory.name : 'Add New Category'}
				</h3>
				<p className='text-[var(--theme-text-muted)] text-sm'>
					{newCategory.id
						? 'Category details'
						: 'Create a custom category to organize your passwords'}
				</p>
			</div>
			<Input
				label='Category Name'
				onChange={(e) => onHandleChange('name', e.target.value)}
				value={newCategory.name}
				placeholder='New Category'
				ref={inputRef}
			/>
			<div className='flex flex-col relative'>
				<label htmlFor='icon' className='flex items-center justify-between font-medium'>
					Icon
					<div className='relative inline-block tooltip'>
						<Icon icon='mingcute:question-line' className='h-4 w-4 text-slate-400' />
						{<IconExplanation />}
					</div>
				</label>
				<div>
					<Input
						label=''
						id='icon'
						onChange={(e) => onHandleChange('icon', e.target.value)}
						value={newCategory.params.icon}
						placeholder='lucide:tag'
					/>
					<Icon
						icon={newCategory.params.icon || 'lucide:tag'}
						className='h-5 w-5 text-slate-400 absolute bottom-2.5 right-4'
					/>
				</div>
			</div>
			<div>
				<p className='font-medium'>Category Color</p>
				<div className='grid grid-cols-6 gap-1'>
					{Object.entries(availableColors).map(([color, { bg, selectedColor }]) => {
						const isSelected = newCategory.params.color === color
						return (
							<button
								key={color}
								type='button'
								title={color}
								onClick={() => onHandleChange('color', color)}
								className={cn(
									'h-8 w-full rounded-md ring-offset-2 transition-all',
									isSelected && selectedColor
								)}
							>
								<div className={cn('h-full w-full rounded-md bg-gradient-to-r ', bg)} />
							</button>
						)
					})}
				</div>
			</div>
			<div className='grid grid-cols-5 gap-2 mt-6'>
				<Button
					content=''
					iconLeft='majesticons:restricted'
					styles='flex items-center w-fit text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md border border-slate-200 col-span-1 justify-center'
					onClick={() => onHandleChange('color', '')}
				/>
				<Button
					content='Cancel'
					onClick={onCancel}
					styles='col-span-2 justify-center text-[var(--theme-text)] border bg-[var(--theme-modal)] hover:bg-[var(--theme-hover)]'
				/>
				<Button
					content={newCategory.id ? 'Save Category' : 'Add Category'}
					styles='btn-primary col-span-2 justify-center'
					onClick={onSubmit}
				/>
			</div>
		</div>
	)
}

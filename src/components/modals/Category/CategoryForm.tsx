import { Button } from '@/components/common/Button'
import { cn } from '@/utils/cn'
import { availableColors } from '@/utils/constants'
import { Icon } from '@iconify/react'
import type React from 'react'
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
	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSubmit()
	}

	return (
		<div
			onKeyDown={handleEnterPress}
			className='sm:max-w-[500px] w-full border-0 shadow-2xl bg-white rounded-xl p-8'
		>
			<div>
				<h3 className='text-2xl font-bold'>
					{newCategory.id ? newCategory.name : 'Add New Category'}
				</h3>
				<p className='text-slate-500 text-sm'>
					{newCategory.id
						? 'Category details'
						: 'Create a custom category to organize your passwords'}
				</p>
			</div>

			<div className='space-y-2 py-4'>
				<label className='flex flex-col font-medium gap-1'>
					Category Name
					<input
						className='px-4 h-10 rounded-md w-full border border-solid border-slate-300 focus:ring-2 focus:border-transparent text-sm font-normal'
						onChange={(e) => onHandleChange('name', e.target.value)}
						value={newCategory.name}
						placeholder='New Category'
					/>
				</label>
				<div className='flex flex-col relative'>
					<label htmlFor='icon' className='flex items-center justify-between gap-2 font-medium'>
						Icon
						<div className='relative inline-block tooltip'>
							<Icon
								icon='mingcute:question-line'
								className='h-4 w-4 text-slate-400 cursor-pointer'
							/>
							{<IconExplanation />}
						</div>
					</label>
					<div>
						<input
							className='h-10 px-3 rounded-lg w-full border-1 border-solid border-slate-300 focus:ring-2 focus:border-transparent disabled:bg-gray-100 disabled:text-slate-400'
							id='icon'
							onChange={(e) => onHandleChange('icon', e.target.value)}
							value={newCategory.params.icon}
							placeholder='lucide:tag'
						/>
						<Icon
							icon={newCategory.params.icon}
							className='h-5 w-5 text-slate-400 absolute top-2.5 right-4'
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<p className='font-medium'>Category Color</p>
					<div className='grid grid-cols-6 gap-2'>
						{Object.entries(availableColors).map(([color, { bg, selectedColor }]) => {
							const isSelected = newCategory.params.color === color
							return (
								<button
									key={color}
									type='button'
									title={color}
									onClick={() => onHandleChange('color', color)}
									className={cn(
										'h-8 w-full rounded-md ring-offset-2 transition-all cursor-pointer',
										isSelected && selectedColor
									)}
								>
									<div className={cn('h-full w-full rounded-md bg-gradient-to-r ', bg)} />
								</button>
							)
						})}
					</div>
				</div>
			</div>
			<div className='flex justify-between'>
				<Button
					content='Remove Color'
					iconLeft='majesticons:restricted'
					styles='flex items-center gap-1 px-2 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md border border-slate-200'
					onClick={() => onHandleChange('color', '')}
				/>
				<div className='flex gap-2'>
					<Button content='Cancel' style='secondary' shadows={false} onClick={onCancel} />
					<Button
						content={newCategory.id ? 'Save Category' : 'Add Category'}
						style='primary'
						shadows={false}
						onClick={onSubmit}
						styles='text-white'
					/>
				</div>
			</div>
		</div>
	)
}

import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { cn } from '@/utils/cn'
import { availableColors, sampleCategory } from '@/utils/constants'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Button } from '../common/Button'

export const NewCategory: React.FC = () => {
	const kdbx = getKdbxInstance()
	const [newCategory, setNewCategory] = useState<Group>(sampleCategory)
	const { setOpen, setCategories, category, setFile, setEntries, setActiveCategory } = useAppStore()

	const handleCategory = async () => {
		const updatedFile = category
			? await kdbx.updateCategory(newCategory)
			: await kdbx.addCategory(newCategory)
		setFile(updatedFile!)
		const categories = kdbx.listCategories()
		const entries = kdbx.listEntries()
		setCategories(categories)
		setEntries(entries)
		setOpen(false)

		if (category) {
			setActiveCategory(newCategory)
		}
	}

	const onHandleChange = (key: string, value: string) => {
		if (key === 'params') {
			setNewCategory((p) => ({ ...p, params: { color: value } }))
		} else {
			setNewCategory((p) => ({ ...p, [key]: value }))
		}
	}

	useEffect(() => {
		if (category) {
			setNewCategory(category)
		}
	}, [category])

	return (
		<div className='sm:max-w-[500px] w-full border-0 shadow-2xl bg-white rounded-xl p-8'>
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

			<div className='grid gap-4 py-4'>
				<div className='space-y-2'>
					<label className='flex flex-col font-medium gap-1'>
						Category Name
						<input
							className='px-4 h-10 rounded-md w-full border border-solid border-slate-300 focus:ring-2 focus:border-transparent text-sm font-normal'
							onChange={(e) => onHandleChange('name', e.target.value)}
							value={newCategory.name}
							placeholder='Enter category name'
						/>
					</label>
				</div>

				<div className='space-y-2'>
					<p className='font-medium'>Category Color</p>
					<div className='grid grid-cols-6 gap-2'>
						{Object.keys(availableColors).map((name) => (
							<button
								key={availableColors[name].name}
								type='button'
								onClick={() => onHandleChange('params', availableColors[name].name)}
								className={cn(
									'h-8 w-full rounded-md',
									newCategory.params.color === availableColors[name].name &&
										'ring-2 ring-purple-500 ring-offset-2'
								)}
							>
								<div
									className={cn(
										'h-full w-full rounded-md bg-gradient-to-r ',
										availableColors[name].bg
									)}
								/>
							</button>
						))}
					</div>
				</div>
			</div>
			<div className='flex justify-between'>
				<button
					type='button'
					className='flex justify-center items-center rounded-sm hover:bg-slate-100 cursor-pointer text-red-500 hover:text-red-900 w-8 h-8'
					title='Remove color'
					onClick={() => onHandleChange('params', '')}
				>
					<Icon icon='majesticons:restricted' className='w-6 h-6' />
					<span className='sr-only'>Edit</span>
				</button>
				<div className='flex gap-2'>
					<Button
						content='Cancel'
						style='secondary'
						shadows={false}
						onClick={() => setOpen(false)}
					/>
					<Button
						content={newCategory.id ? 'Save Category' : 'Add Category'}
						style='primary'
						shadows={false}
						onClick={handleCategory}
					/>
				</div>
			</div>
		</div>
	)
}

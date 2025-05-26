import { kdbxErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { useFileStore } from '@/store/FileStore'
import { cn } from '@/utils/cn'
import { sampleCategory } from '@/utils/constants'
import { assignKdbxData } from '@/utils/kdbxHelpers'
import * as kdbxweb from 'kdbxweb'
import { useEffect } from 'react'
import { Button } from '../common/Button'

export const Delete = () => {
	const kdbx = getKdbxInstance()
	const { category, setCategory, activeCategory, setActiveCategory } = useAppStore()
	const { selectedItems } = useFileStore()
	const { setOpen } = useAppStore()

	const isPermanent = activeCategory.id === kdbx.getRecycleBinId() || category

	const handleDelete = async () => {
		try {
			if (selectedItems.length > 0) {
				isPermanent
					? Promise.all(selectedItems.map((item) => kdbx.deleteEntryPermanently(item, false)))
					: Promise.all(selectedItems.map((item) => kdbx.deleteEntry(item, false)))
				await kdbx.persist()
				toasty.success(`${selectedItems.length} deleted successfully`)
				assignKdbxData(kdbx)
				setOpen(false)
			}
			if (category) {
				await kdbx.deleteCategory(category)
				assignKdbxData(kdbx)
				setOpen(false)
				if (activeCategory.id === category.id) {
					setActiveCategory(sampleCategory)
				}
			}
		} catch (err) {
			if (err instanceof DOMException) kdbxErrorsHandle(err.name)
			else if (err instanceof kdbxweb.KdbxError) kdbxErrorsHandle(err.code)
			else {
				console.error(err)
				toasty.error('An unknown error occurred')
			}
		}
	}

	useEffect(() => {
		if (category) {
			setCategory(category)
		}
		return () => {
			setCategory(null)
		}
	}, [category, setCategory])

	return (
		<div className='sm:max-w-[400px] w-full border-0 rounded-xl bg-[var(--theme-modal)] p-8 space-y-3'>
			<div className='space-y-3'>
				<h3 className='text-2xl font-bold'>
					Delete {selectedItems.length ? (selectedItems.length === 1 ? 'Entry' : 'Entries') : ''}
					{category && 'Category'}
				</h3>
				<div>
					<p className='text-[var(--theme-text-muted)] text-sm'>
						Are you sure you want to delete{' '}
						{selectedItems.length ? (selectedItems.length === 1 ? 'this ' : 'these ') : ''}
						{selectedItems.length ? (selectedItems.length === 1 ? 'Entry' : 'Entries') : ''}
						{category && `${category.name} `}
						{category && 'category'}?
					</p>
					<p className={cn('text-[var(--theme-text-muted)] text-sm', isPermanent && 'font-medium')}>
						{isPermanent
							? 'This action cannot be undone'
							: 'This will move them to the Recycle Bin'}
					</p>
				</div>
			</div>
			<div className='flex justify-end gap-x-3 mt-6'>
				<Button
					content='Cancel'
					styles='text-[var(--theme-text)] border bg-[var(--theme-modal)] hover:bg-[var(--theme-hover)]'
					onClick={() => setOpen(false)}
				/>
				<Button
					content='Delete'
					styles='bg-red-500 hover:bg-red-700 text-white'
					onClick={handleDelete}
				/>
			</div>
		</div>
	)
}

import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { cn } from '@/utils/cn'
import { sampleCategory } from '@/utils/constants'
import { useEffect } from 'react'
import { Button } from '../common/Button'

export const Delete: React.FC = () => {
	const kdbx = getKdbxInstance()
	const {
		entry,
		setEntry,
		setEntries,
		setFile,
		category,
		setCategory,
		activeCategory,
		setActiveCategory,
		setCategories,
	} = useAppStore()
	const { setOpen } = useAppStore()

	const isPermanent = entry?.groupName === 'Recycle Bin' || category

	const handleDelete = async () => {
		if (entry) {
			const updatedFile = isPermanent
				? await kdbx.deleteEntryPermanently(entry)
				: await kdbx.deleteEntry(entry)
			const entries = kdbx.listEntries()
			setEntries(entries)
			setOpen(false)
			setFile(updatedFile!)
		}
		if (category) {
			const updatedFile = await kdbx.deleteCategory(category)
			const categories = kdbx.listCategories()
			const entries = kdbx.listEntries()
			setCategories(categories)
			setEntries(entries)
			setOpen(false)
			setFile(updatedFile!)
			if (activeCategory.id === category.id) {
				setActiveCategory(sampleCategory)
			}
		}
	}

	useEffect(() => {
		if (entry) {
			setEntry(entry)
		}
		if (category) {
			setCategory(category)
		}
		return () => {
			setEntry(null)
			setCategory(null)
		}
	}, [entry, setEntry, category, setCategory])

	return (
		<div className='sm:max-w-[400px] w-full border-0 shadow-2xl bg-white rounded-xl p-8'>
			<div>
				<h3 className='text-2xl font-bold'>
					Delete {entry && 'Entry'}
					{category && 'Category'}
				</h3>
				<p className='text-slate-500 text-sm'>
					Are you sure you want to delete this "{entry && entry.title}
					{category && category.name}" {entry && 'entry'}
					{category && 'category'}?
				</p>
				<p className={cn('text-slate-500 text-sm', isPermanent && 'font-medium')}>
					{isPermanent
						? 'This action cannot be undone'
						: 'This action will send it to the Recycle Bin'}
				</p>
			</div>
			<div className='flex justify-end gap-2 mt-3'>
				<Button content='Cancel' style='secondary' shadows={false} onClick={() => setOpen(false)} />
				<Button content='Delete' style='deleteStyles' shadows={false} onClick={handleDelete} />
			</div>
		</div>
	)
}

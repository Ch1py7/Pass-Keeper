import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { cn } from '@/utils/cn'
import { formatDateFromMilliseconds } from '@/utils/common'
import { sampleEntry } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { Button } from '../common/Button'

export const NewEntry: React.FC = () => {
	const kdbx = getKdbxInstance()
	const [newEntry, setNewEntry] = useState<Entry>(sampleEntry)
	const { setOpen, categories, setFile, setEntries, entry } = useAppStore()
	const noDefaultCategories = categories.slice(2)

	const onHandleChange = (key: string, value: string) => {
		setNewEntry((p) => ({ ...p, [key]: value }))
	}

	const handleEntry = async () => {
		const updatedFile = entry ? await kdbx.updateEntry(newEntry) : await kdbx.addEntry(newEntry)
		const entries = kdbx.listEntries()
		setEntries(entries)
		setOpen(false)
		setFile(updatedFile!)
	}

	useEffect(() => {
		if (entry) {
			setNewEntry(entry)
		}
	}, [entry])

	return (
		<div className='sm:max-w-[450px] border-0 shadow-2xl bg-white rounded-xl p-8'>
			<div>
				<p className='text-2xl font-bold'>{newEntry.id ? newEntry.title : 'Add New Password'}</p>
				<p>{newEntry.id ? 'Entry details' : 'Enter the details for the new password entry'}</p>
			</div>
			<div className='grid grid-cols-2 gap-4 py-4'>
				<div>
					<label className='flex flex-col font-medium text-slate-700'>
						Title
						<input
							className='font-normal flex-1 bg-slate-50 border-1 border-solid border-slate-200 rounded-md py-1 px-3'
							onChange={(e) => onHandleChange('title', e.target.value)}
							value={newEntry.title}
						/>
					</label>
				</div>
				<div>
					<label className='flex flex-col font-medium text-slate-700'>
						URL
						<input
							className='font-normal flex-1 bg-slate-50 border-1 border-solid border-slate-200 rounded-md py-1 px-3'
							onChange={(e) => onHandleChange('url', e.target.value)}
							value={newEntry.url}
						/>
					</label>
				</div>
				<div>
					<label className='flex flex-col font-medium text-slate-700'>
						Username
						<input
							className='font-normal flex-1 bg-slate-50 border-1 border-solid border-slate-200 rounded-md py-1 px-3'
							onChange={(e) => onHandleChange('username', e.target.value)}
							value={newEntry.username}
						/>
					</label>
				</div>
				<div>
					<label className='flex flex-col font-medium text-slate-700'>
						Password
						<input
							type='password'
							className='font-normal flex-1 bg-slate-50 border-1 border-solid border-slate-200 rounded-md py-1 px-3'
							onChange={(e) => onHandleChange('password', e.target.value)}
							value={newEntry.password}
						/>
					</label>
				</div>
				<div className={cn(!newEntry.id && 'col-span-2')}>
					<label className='flex flex-col font-medium text-slate-700'>
						Category
						<select
							className={cn(
								'font-normal flex-1 border-1 border-solid border-slate-200 rounded-md py-1 px-3',
								entry?.id ? 'bg-gray-200' : 'bg-slate-50'
							)}
							value={newEntry.groupId}
							onChange={(e) => onHandleChange('groupId', e.target.value)}
							disabled={Boolean(entry)}
						>
							{noDefaultCategories.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</select>
					</label>
				</div>
				{newEntry.id && (
					<div>
						<label className='flex flex-col font-medium text-slate-700'>
							Added On
							<input
								className='font-normal flex-1 bg-gray-200 border-1 border-solid border-slate-200 rounded-md py-1 px-3'
								value={formatDateFromMilliseconds(newEntry.creationTime)}
								disabled
							/>
						</label>
					</div>
				)}
				<div className='col-span-2 gap-4'>
					<label className='flex flex-col font-medium text-slate-700'>
						Notes
						<textarea
							className='font-normal flex-1 bg-slate-50 border-1 border-solid border-slate-200 rounded-md py-1 px-3'
							onChange={(e) => onHandleChange('notes', e.target.value)}
							value={newEntry.notes}
						/>
					</label>
				</div>
			</div>
			<div className='flex space-x-4'>
				<Button
					fullWidth
					content='Cancel'
					style='secondary'
					shadows={false}
					onClick={() => setOpen(false)}
				/>
				<Button
					fullWidth
					content='Save Entry'
					style='primary'
					shadows={false}
					onClick={handleEntry}
				/>
			</div>
		</div>
	)
}

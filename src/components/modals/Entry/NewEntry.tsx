import { kdbxErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { sampleEntry } from '@/utils/constants'
import { assignKdbxData, resolveGroupId } from '@/utils/kdbxHelpers'
import * as kdbxweb from 'kdbxweb'
import { useEffect, useState } from 'react'
import { EntryForm } from './EntryForm'

export const NewEntry: React.FC = () => {
	const kdbx = getKdbxInstance()
	const { setOpen, entry, activeCategory, noDefaultCategories, file } = useAppStore()
	const noDefault = noDefaultCategories()
	const isDefault = ['All', file.recycleBinId].includes(activeCategory.id)
	const [newEntry, setNewEntry] = useState<Entry>({
		...sampleEntry,
		groupId: resolveGroupId(noDefault, isDefault, activeCategory.id),
	})

	const onHandleChange = (key: string, value: string) => {
		setNewEntry((p) => ({ ...p, [key]: value }))
	}

	const handleEntry = async () => {
		try {
			entry ? await kdbx.updateEntry(newEntry) : await kdbx.addEntry(newEntry)
			assignKdbxData(kdbx)
			setOpen(false)
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
		if (entry) {
			setNewEntry(entry)
		}
	}, [entry])

	return (
		<EntryForm
			entry={entry}
			noDefaultCategories={noDefault}
			newEntry={newEntry}
			onHandleChange={onHandleChange}
			onSubmit={handleEntry}
			onCancel={() => setOpen(false)}
		/>
	)
}

import { kdbxErrorsHandle } from '@/errors'
import { toasty } from '@/notifications'
import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { sampleEntry } from '@/utils/constants'
import { assignKdbxData, resolveGroupId } from '@/utils/kdbxHelpers'
import * as kdbxweb from 'kdbxweb'
import { useEffect, useState } from 'react'
import { EntryForm } from './EntryForm'

export const Entry = () => {
	const kdbx = getKdbxInstance()
	const { setModal, entryToEdit, activeCategory, noDefaultCategories, file } = useAppStore()
	const noDefault = noDefaultCategories()
	const isDefault = ['All', file.recycleBinId].includes(activeCategory.id)
	const [entry, setEntry] = useState<Entry>({
		...sampleEntry,
		groupId: resolveGroupId(noDefault, isDefault, activeCategory.id),
	})

	const onHandleChange = (key: string, value: string) => {
		setEntry((p) => ({ ...p, [key]: value }))
	}

	const handleEntry = async () => {
		try {
			entryToEdit ? await kdbx.updateEntry(entry) : await kdbx.addEntry(entry)
			assignKdbxData(kdbx)
			setModal(null)
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
		if (entryToEdit) {
			setEntry(entryToEdit)
		}
	}, [entryToEdit])

	return (
		<EntryForm
			noDefaultCategories={noDefault}
			entry={entry}
			onHandleChange={onHandleChange}
			onSubmit={handleEntry}
			onCancel={() => setModal(null)}
		/>
	)
}

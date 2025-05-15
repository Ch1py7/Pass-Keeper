import { errorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { sampleCategory } from '@/utils/constants'
import { assignKdbxData } from '@/utils/kdbxHelpers'
import * as kdbxweb from 'kdbxweb'
import { useEffect, useState } from 'react'
import { CategoryForm } from './CategoryForm'

export const NewCategory: React.FC = () => {
	const kdbx = getKdbxInstance()
	const [newCategory, setNewCategory] = useState<Group>(sampleCategory)
	const { setOpen, category, setActiveCategory } = useAppStore()

	const handleCategory = async () => {
		try {
			category ? await kdbx.updateCategory(newCategory) : await kdbx.addCategory(newCategory)
			assignKdbxData(kdbx)
			setOpen(false)

			if (category) {
				setActiveCategory(newCategory)
			}
		} catch (err) {
			if (err instanceof DOMException) {
				errorsHandle(err.name)
			} else if (err instanceof kdbxweb.KdbxError) {
				errorsHandle(err.code)
			} else {
				console.error(err)
				toasty.error('An unknown error occurred')
			}
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
		<CategoryForm
			newCategory={newCategory}
			onHandleChange={onHandleChange}
			onSubmit={handleCategory}
			onCancel={() => setOpen(false)}
		/>
	)
}

import { kdbxErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { getKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { getDefaultCategory } from '@/utils/common'
import { sampleCategory } from '@/utils/constants'
import { assignKdbxData } from '@/utils/kdbxHelpers'
import * as kdbxweb from 'kdbxweb'
import { useEffect, useState } from 'react'
import { CategoryForm } from './CategoryForm'

const getParams = (newCategory: Group) => {
	const {
		name,
		params: { color, icon },
	} = newCategory
	const { color: defColor, icon: defIcon } = getDefaultCategory(name)
	return {
		...newCategory,
		params: {
			color: color ? color : defColor ? defColor : '',
			icon: icon ? icon : defIcon ? defIcon : 'lucide:tag',
		},
	}
}

export const NewCategory = () => {
	const kdbx = getKdbxInstance()
	const [newCategory, setNewCategory] = useState<Group>(sampleCategory)
	const { setOpen, category, setActiveCategory } = useAppStore()

	const handleCategory = async () => {
		try {
			const parsedCategory = getParams(newCategory) as Group
			category ? await kdbx.updateCategory(parsedCategory) : await kdbx.addCategory(parsedCategory)
			assignKdbxData(kdbx)
			setOpen(false)

			if (category) {
				setActiveCategory(parsedCategory)
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

	const onHandleChange = (key: string, value: string) => {
		if (key === 'color') {
			setNewCategory((p) => ({ ...p, params: { ...p.params, color: value as ColorName } }))
		} else if (key === 'icon') {
			setNewCategory((p) => ({ ...p, params: { ...p.params, icon: value } }))
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

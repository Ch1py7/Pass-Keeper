import type { Kdbx } from '@/services/kdbx'
import { useAppStore } from '@/store/AppStore'

export const assignKdbxData = (kdbx: Kdbx) => {
	const { setCategories, setEntries } = useAppStore.getState()

	setCategories(kdbx.listCategories())
	setEntries(kdbx.listEntries())
}

export const resolveGroupId = (
	noDefault: Group[],
	isDefault: boolean,
	activeCategoryId: string
): string => {
	if (noDefault.length === 0) return ''
	return isDefault ? noDefault[0].id : activeCategoryId
}

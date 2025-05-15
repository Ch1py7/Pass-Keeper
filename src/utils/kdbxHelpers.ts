import type { Kdbx } from '@/services/kdbx'
import { useAppStore } from '@/store/AppStore'

export const assignKdbxData = (kdbx: Kdbx) => {
	const { setCategories, setEntries } = useAppStore.getState()

	setCategories(kdbx.listCategories())
	setEntries(kdbx.listEntries())
}

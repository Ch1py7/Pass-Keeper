import type { Kdbx } from './kdbx'

let kdbxInstance: Kdbx | null = null

export const setKdbxInstance = (instance: Kdbx) => {
	kdbxInstance = instance
}

export const getKdbxInstance = () => {
	if (!kdbxInstance) throw new Error('Non-existent instance')
	return kdbxInstance
}

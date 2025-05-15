import type { Kdbx } from './kdbx'

let kdbxInstance: Kdbx | null = null

export const setKdbxInstance = (instance: Kdbx) => {
	kdbxInstance = instance
}

export const getKdbxInstance = () => {
	return kdbxInstance!
}

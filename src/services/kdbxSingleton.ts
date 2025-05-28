import type { Kdbx } from './kdbx'

let kdbxInstance: Kdbx | null = null

export const setKdbxInstance = (instance: Kdbx | null) => {
	kdbxInstance = instance
}

export const getKdbxInstance = () => {
	return kdbxInstance!
}

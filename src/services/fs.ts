import { ErrorCode } from '@/errors/errors'
import { typedArrayToBuffer } from '@/utils/common'
import { open, save } from '@tauri-apps/plugin-dialog'
import { readFile, writeFile } from '@tauri-apps/plugin-fs'

let globalPath: string

export const createFile = async (binaryData: ArrayBuffer): Promise<void> => {
	const filePath = await save({
		title: 'Database',
		defaultPath: 'Database.kdbx',
		filters: [{ name: 'KeePass KDBX Files', extensions: ['kdbx'] }],
	})

	if (!filePath) throw new DOMException('', 'AbortError')

	await writeFile(filePath, new Uint8Array(binaryData))
}

export const getFile = async () => {
	const fileContent = await readFile(globalPath)
	return typedArrayToBuffer(fileContent)
}

export const selectFile = async (): Promise<string> => {
	const filePath = await open({
		filters: [{ name: 'KeePass KDBX Files', extensions: ['kdbx'] }],
	})

	if (!filePath) throw new Error(ErrorCode.AbortError)
	const [name, ext] = filePath.split('\\').pop()!.split('.')
	if (ext !== 'kdbx') throw new Error(ErrorCode.Unsupported)
	globalPath = filePath
	return name ?? 'My Database'
}

export const updateFile = async (binaryData: ArrayBuffer): Promise<void> => {
	try {
		await writeFile(globalPath, new Uint8Array(binaryData))
	} catch (error) {
		console.error('Error writing file:', error)
		throw error
	}
}

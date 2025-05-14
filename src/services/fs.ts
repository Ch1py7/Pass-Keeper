let savedHandle: FileSystemFileHandle | null = null

export const createFile = async (binaryData: ArrayBuffer) => {
	try {
		const handle = await (window as any).showSaveFilePicker({
			suggestedName: 'Database.kdbx',
			types: [
				{
					description: 'KeePass Database',
					accept: { 'application/x-keepass2': ['.kdbx'] },
				},
			],
		})

		const writable = await handle.createWritable()
		await writable.write(binaryData)
		await writable.close()
	} catch (err) {
		console.error('error', err)
		throw err
	}
}

export const selectFile = async () => {
	try {
		const [handle] = (await (window as any).showOpenFilePicker({
			types: [
				{
					description: 'KeePass Database',
					accept: { 'application/x-keepass2': ['.kdbx'] },
				},
			],
			multiple: false,
		})) as FileSystemFileHandle[]

		savedHandle = handle
		const file = await handle.getFile()

		return file
	} catch (err) {
		console.error('error', err)
		throw err
	}
}

export const updateFile = async (data: ArrayBuffer) => {
	try {
		if (!savedHandle) return
		const writable = await savedHandle.createWritable()

		await writable.write(data)
		await writable.close()

		const file = await savedHandle.getFile()

		return file
	} catch (err) {
		console.error('error', err)
		throw err
	}
}

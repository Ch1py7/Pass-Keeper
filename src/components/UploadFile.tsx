import { fsErrorsHandler } from '@/errors/fs'
import { kdbxErrorsHandler } from '@/errors/kdbx'
import { toasty } from '@/notifications/toast'
import { selectFile } from '@/services/fs'
import { Icon } from '@iconify/react'
import * as kdbxweb from 'kdbxweb'
import { useState } from 'react'
import { MasterKey } from './MasterKey'
import { Button } from './common/Button'

const handleFileUpload = async (setFile: (file: File | null) => void) => {
	try {
		const file = await selectFile()
		const ext = file.name.split('.').pop()
		if (ext !== 'kdbx') throw new kdbxweb.KdbxError(kdbxweb.Consts.ErrorCodes.Unsupported)
		setFile(file)
	} catch (err) {
		if (err instanceof DOMException) {
			fsErrorsHandler(err.name)
		} else if (err instanceof kdbxweb.KdbxError) {
			kdbxErrorsHandler(err.code)
		} else {
			console.error(err)
			toasty.error('An unknown error occurred')
		}
	}
}

export const UploadFile: React.FC = () => {
	const [inputFile, setInputFile] = useState<File | null>(null)
	const [newFile, setNewFile] = useState(false)

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4'>
			<div className='max-w-md w-full'>
				<div className='text-center mb-8'>
					<div className='bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg inline-block mb-4'>
						<Icon icon='mynaui:lock' className='text-white h-8 w-8' />
					</div>
					<h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2'>
						Vault Keeper
					</h1>
					<p className='text-slate-500 text-lg'>Your secure password manager</p>
				</div>
				{inputFile || newFile ? (
					<MasterKey
						currentFile={inputFile}
						setCurrentFile={setInputFile}
						setNewFile={setNewFile}
					/>
				) : (
					<div className='border-0 shadow-xl'>
						<div className='p-6 space-y-6'>
							<div className='text-center'>
								<h2 className='text-xl font-semibold mb-2'>Get Started</h2>
								<p className='text-slate-500 mb-4'>
									Load an existing password file or create a new one
								</p>
							</div>

							<div className='space-y-4'>
								<button
									type='button'
									className='border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer w-full hover:border-purple-400 transition-colors'
									onClick={() => handleFileUpload(setInputFile)}
								>
									<Icon icon='lucide:file-up' className='h-10 w-10 text-slate-400 mx-auto mb-2' />
									<p className='font-medium mb-1'>Upload Password File</p>
									<p className='text-sm text-slate-500'>Click to select a .kdbx file</p>
								</button>

								<div className='flex flex-col sm:flex-row gap-3'>
									<Button
										onClick={() => setNewFile(true)}
										content='Create New File'
										style='primary'
										iconLeft='lucide:file-plus'
										fullWidth
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

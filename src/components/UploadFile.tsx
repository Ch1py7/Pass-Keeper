import { errorsHandle } from '@/errors/errors'
import { usePasswordStrength } from '@/hooks/usePasswordStrength'
import { toasty } from '@/notifications/toast'
import { getFile, selectFile } from '@/services/fs'
import { Kdbx } from '@/services/kdbx'
import { setKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { getPasswordStrengthInfo } from '@/utils/common'
import { sampleFile } from '@/utils/constants'
import { assignKdbxData } from '@/utils/kdbxHelpers'
import { Icon } from '@iconify/react'
import * as kdbxweb from 'kdbxweb'
import { useState } from 'react'
import { Button } from './common/Button'
import { MasterKey } from './masterKey/MasterKey'

const handleFileUpload = async (setFile: (value: CFile | ((prev: CFile) => CFile)) => void) => {
	const name = await selectFile()
	setFile((p) => ({ ...p, name }))
}

export const UploadFile: React.FC = () => {
	const [newFile, setNewFile] = useState(false)
	const { file, setFile } = useAppStore()
	const passwordStrength = usePasswordStrength(file.masterKey)

	const { color, label } = getPasswordStrengthInfo(passwordStrength)

	const createNewFile = async (masterKey: string) => {
		const kdbx = new Kdbx('')
		await kdbx.createDatabase(masterKey)
		toasty.success('File created successfully')
		resetToWelcomeScreen()
	}

	const unlockExistingFile = async (file: CFile) => {
		const fileBuffer = await getFile()
		const kdbx = new Kdbx(file.masterKey)
		await kdbx.load(fileBuffer)
		setKdbxInstance(kdbx)
		assignKdbxData(kdbx)
		setFile((p) => ({ ...p, recycleBinId: kdbx.getRecycleBinId(), isUnlocked: true }))
		toasty.success('Correct master key')
	}

	const handleUnlockFile = async () => {
		try {
			if (file.name) {
				await unlockExistingFile(file)
			} else {
				await createNewFile(file.masterKey)
			}
		} catch (err) {
			if (err instanceof DOMException) errorsHandle(err.name)
			else if (err instanceof kdbxweb.KdbxError) errorsHandle(err.code)
			else {
				console.error(err)
				toasty.error('An unknown error occurred')
			}
		}
	}

	const resetToWelcomeScreen = () => {
		setFile(sampleFile)
		setNewFile(false)
	}

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
				{file.name || newFile ? (
					<MasterKey
						fileName={file.name}
						masterKey={file.masterKey}
						onMasterKeyChange={(val) => setFile((p) => ({ ...p, masterKey: val }))}
						onSubmit={handleUnlockFile}
						onBack={resetToWelcomeScreen}
						passwordStrength={passwordStrength}
						label={label}
						color={color}
						showChecklist={!file.name}
						disabled={file.name ? file.masterKey.length <= 0 : passwordStrength < 100}
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
									onClick={() => handleFileUpload(setFile)}
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

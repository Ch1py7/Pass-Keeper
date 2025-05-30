import { kdbxErrorsHandle } from '@/errors'
import { usePasswordStrength } from '@/hooks/usePasswordStrength'
import { toasty } from '@/notifications'
import { getFile, getName, selectFile } from '@/services/fs'
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
	try {
		await selectFile()
		const name = await getName()
		setFile((p) => ({ ...p, name }))
	} catch (err) {
		if (err instanceof DOMException) kdbxErrorsHandle(err.message)
		else if (err instanceof kdbxweb.KdbxError) kdbxErrorsHandle(err.code)
		else {
			console.error(err)
			toasty.error('An unknown error occurred')
		}
	}
}

export const UploadFile = () => {
	const [newFile, setNewFile] = useState(false)
	const [enter, setEnter] = useState(true)
	const { file, setFile, setModal } = useAppStore()
	const passwordStrength = usePasswordStrength(file.masterKey)

	const { color, label } = getPasswordStrengthInfo(passwordStrength)

	const createNewFile = async (masterKey: string) => {
		const kdbx = new Kdbx('')
		await kdbx.createDatabase(masterKey, enter)
		toasty.success('File created successfully')

		if (enter) {
			unlockExistingFile({ ...file, masterKey })
		}
		resetToWelcomeScreen()
	}

	const unlockExistingFile = async (file: CFile) => {
		const fileBuffer = await getFile()
		const kdbx = new Kdbx(file.masterKey)
		await kdbx.load(fileBuffer)
		setKdbxInstance(kdbx)
		assignKdbxData(kdbx)
		const name = await getName()
		setFile((p) => ({ ...p, recycleBinId: kdbx.getRecycleBinId(), isUnlocked: true, name }))
		file.name && toasty.success('Correct master key')
	}

	const handleUnlockFile = async () => {
		try {
			if (file.name) {
				await unlockExistingFile(file)
			} else {
				await createNewFile(file.masterKey)
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

	const resetToWelcomeScreen = () => {
		setFile(sampleFile)
		setNewFile(false)
	}

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<button
				className='absolute top-8 right-8'
				type='button'
				onClick={() => {
					setModal('theme')
				}}
			>
				<Icon icon='lucide:menu' className='w-8 h-8 text-[var(--theme-text)]' />
			</button>
			<div className='max-w-md w-full'>
				<div className='text-center mb-8'>
					<div className='bg-gradient-to-r from-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)] p-4 rounded-2xl shadow-[var(--theme-shadow)] inline-block mb-4'>
						<Icon icon='lucide:lock' className='h-8 w-8 text-[var(--theme-text-on-primary)]' />
					</div>
					<h1 className='text-4xl font-bold mb-2'>Vault Keeper</h1>
					<p className='text-lg'>Your secure password manager</p>
				</div>
				{file.name || newFile ? (
					<MasterKey
						fileName={file.name}
						masterKey={file.masterKey}
						enter={enter}
						setEnter={setEnter}
						onMasterKeyChange={(val) => setFile((p) => ({ ...p, masterKey: val }))}
						onSubmit={handleUnlockFile}
						onBack={resetToWelcomeScreen}
						passwordStrength={passwordStrength}
						label={label}
						color={color}
						showNewFileDetails={!file.name}
					/>
				) : (
					<div className='border-0 shadow-[var(--theme-shadow)] rounded-xl'>
						<div className='p-6 space-y-6'>
							<div className='text-center'>
								<h2 className='text-xl font-semibold mb-2'>Get Started</h2>
								<p className='mb-4'>Load an existing password file or create a new one</p>
							</div>

							<div className='space-y-4'>
								<button
									type='button'
									className='border-2 border-dashed rounded-lg p-6 text-center w-full hover:border-[var(--theme-bg-primary)] transition-colors'
									onClick={() => handleFileUpload(setFile)}
								>
									<Icon
										icon='lucide:file-up'
										className='h-10 w-10 mx-auto mb-2 text-[var(--theme-text)]'
									/>
									<p className='font-medium mb-1'>Upload Password File</p>
									<p className='text-sm'>Click to select a .kdbx file</p>
								</button>

								<div className='flex flex-col sm:flex-row gap-3'>
									<Button
										onClick={() => setNewFile(true)}
										content='Create New File'
										iconLeft='lucide:file-plus'
										fullWidth
										styles='justify-center btn-primary'
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

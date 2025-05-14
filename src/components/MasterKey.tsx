import { fsErrorsHandler } from '@/errors/fs'
import { kdbxErrorsHandler } from '@/errors/kdbx'
import { usePasswordStrength } from '@/hooks/usePasswordStrength'
import { toasty } from '@/notifications/toast'
import { Kdbx } from '@/services/kdbx'
import { setKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import {
	formatDateFromMilliseconds,
	getStrengthColor,
	getStrengthText,
	readFileAsArrayBuffer,
} from '@/utils/common'
import { Icon } from '@iconify/react'
import * as kdbxweb from 'kdbxweb'
import { useEffect, useRef } from 'react'
import { Button } from './common/Button'
import { PasswordChecklist } from './PasswordChecklist'

interface MasterKeyProps {
	currentFile: File | null
	setCurrentFile: React.Dispatch<React.SetStateAction<File | null>>
	setNewFile: React.Dispatch<React.SetStateAction<boolean>>
}

export const MasterKey: React.FC<MasterKeyProps> = ({
	currentFile,
	setCurrentFile,
	setNewFile,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { masterKey, setMasterKey, setEntries, setCategories, setFile } = useAppStore()

	const passwordStrength = usePasswordStrength(masterKey)
	const strengthTextColor = getStrengthColor(passwordStrength)
	const strengthLabel = getStrengthText(passwordStrength)

	const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			await handleUnlockFile()
		}
	}

	const loadExistingFile = async (file: File, key: string) => {
		const fileBuffer = await readFileAsArrayBuffer(file)
		const kdbx = new Kdbx(key)
		await kdbx.load(fileBuffer)
		setKdbxInstance(kdbx)
		const passwords = kdbx.listEntries()
		const categories = kdbx.listCategories()
		setCategories(categories)
		setEntries(passwords)
		return kdbx
	}

	const createNewPasswordFile = async (password: string) => {
		const kdbx = new Kdbx('')
		await kdbx.createDatabase(password)
	}

	const finalizeFileAccess = (file: File | null) => {
		toasty.success(file ? 'Correct master key' : 'File created successfully')
		setFile({
			name: file?.name ?? 'My Database',
			lastModified: file?.lastModified ?? 0,
			size: file?.size ?? 0,
		})
		resetToWelcomeScreen()
	}

	const resetToWelcomeScreen = () => {
		setCurrentFile(null)
		setMasterKey('')
		setNewFile(false)
	}

	const handleUnlockFile = async () => {
		try {
			if (currentFile) {
				await loadExistingFile(currentFile, masterKey)
			} else {
				await createNewPasswordFile(masterKey)
			}
			finalizeFileAccess(currentFile)
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

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	return (
		<div className='border-0 shadow-xl'>
			<div className='p-6 space-y-6'>
				<div className='text-center mb-2'>
					<h2 className='text-xl font-semibold mb-2'>{currentFile?.name || 'New Password File'}</h2>
					<div className='text-xs rounded-full border border-solid border-slate-300 inline px-3 py-1 font-bold'>
						{formatDateFromMilliseconds(currentFile ? currentFile.lastModified : Date.now())}
					</div>
				</div>

				<div className='space-y-4'>
					<div className='space-y-2'>
						<label htmlFor='master-key' className='text-sm font-medium'>
							Master Key
						</label>
						<div className='relative'>
							<Icon
								icon='lucide:key-round'
								className='absolute left-3 top-2 h-4 w-4 text-slate-400 mt-1'
							/>
							<input
								id='master-key'
								type='password'
								placeholder={currentFile ? 'Enter your master key' : 'Create a strong master key'}
								ref={inputRef}
								className='pl-10 h-10 rounded-lg w-full border-1 border-solid border-slate-300 shadow-md focus:ring-2 focus:border-transparent'
								value={masterKey}
								onChange={(e) => setMasterKey(e.target.value)}
								onKeyDown={handleEnterPress}
							/>
						</div>

						{!currentFile && (
							<div className='space-y-1 mt-2'>
								<div className='flex justify-between items-center'>
									<span className='text-xs text-slate-500'>Password Strength</span>
									<span
										className={`text-xs font-medium ${
											passwordStrength <= 25
												? 'text-red-500'
												: passwordStrength <= 50
													? 'text-orange-500'
													: passwordStrength <= 75
														? 'text-yellow-500'
														: 'text-green-500'
										}`}
									>
										{strengthLabel}
									</span>
								</div>
								<div className='h-1 bg-slate-300'>
									<div className={`h-1 ${strengthTextColor}`} />
								</div>

								<div className='text-xs text-slate-500 mt-3 space-y-1'>
									<PasswordChecklist masterKey={masterKey} />
								</div>
							</div>
						)}
					</div>

					<div className='pt-2'>
						<div className='flex gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-5 py-3 rounded-md'>
							<Icon icon='lucide:triangle-alert' className='h-8 w-8' />
							<p className='text-xs'>
								This key is required to access your passwords. If you forget it, your data cannot be
								recovered.
							</p>
						</div>
					</div>

					<div className='flex gap-3 pt-2'>
						<Button fullWidth content='Back' style='secondary' onClick={resetToWelcomeScreen} />
						<Button
							fullWidth
							content={currentFile ? 'Unlock' : 'Create'}
							style='primary'
							onClick={() => handleUnlockFile()}
							disabled={currentFile ? masterKey.length <= 0 : passwordStrength < 100}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

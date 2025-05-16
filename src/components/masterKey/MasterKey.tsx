import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../common/Button'
import { MasterKeyChecklist } from './MasterKeyChecklist'

interface MasterKeyProps {
	fileName: string
	masterKey: string
	enter: boolean
	setEnter: React.Dispatch<React.SetStateAction<boolean>>
	onMasterKeyChange: (value: string) => void
	onSubmit: () => void
	onBack: () => void
	passwordStrength: number
	label: string
	color: string
	showNewFileDetails: boolean
}

export const MasterKey: React.FC<MasterKeyProps> = ({
	fileName,
	masterKey,
	enter,
	setEnter,
	onMasterKeyChange,
	onSubmit,
	onBack,
	passwordStrength = 0,
	label = '',
	color = '',
	showNewFileDetails = false,
}) => {
	const [showKey, setShowKey] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSubmit()
	}

	return (
		<div className='border-0 shadow-xl'>
			<div className='p-6 space-y-6'>
				<div className='text-center mb-2'>
					<h2 className='text-xl font-semibold mb-2'>{fileName || 'New Password File'}</h2>
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
								type={showKey ? '' : 'password'}
								placeholder={fileName ? 'Enter your master key' : 'Create a strong master key'}
								ref={inputRef}
								className='pl-10 h-10 rounded-lg w-full border-1 border-solid border-slate-300 shadow-md focus:ring-2 focus:border-transparent'
								value={masterKey}
								onChange={(e) => onMasterKeyChange(e.target.value)}
								onKeyDown={handleEnterPress}
							/>
							<button
								type='button'
								className='absolute right-6 top-1 h-4 w-4 mt-1 cursor-pointer'
								onClick={() => setShowKey((p) => !p)}
							>
								<Icon icon={showKey ? 'mdi-light:eye' : 'mdi-light:eye-off'} className='h-6 w-6' />
							</button>
						</div>

						{showNewFileDetails && (
							<MasterKeyChecklist
								masterKey={masterKey}
								passwordStrength={passwordStrength}
								label={label}
								color={color}
							/>
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

					{showNewFileDetails && (
						<label className='text-md text-slate-500 flex gap-1'>
							<input checked={enter} onChange={() => setEnter((p) => !p)} type='checkbox' />
							Enter automatically
						</label>
					)}

					<div className='flex gap-3 pt-2'>
						<Button fullWidth content='Back' style='secondary' onClick={onBack} />
						<Button
							fullWidth
							content={fileName ? 'Unlock' : 'Create'}
							style='primary'
							onClick={onSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

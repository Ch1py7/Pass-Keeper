import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { ActionButton } from '../common/ActionButtons'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
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
		<div className='border-0 rounded-xl'>
			<div className='p-6 space-y-6'>
				<div className='text-center mb-2'>
					<h2 className='text-xl font-semibold mb-2'>
						{fileName ? `${fileName}.kdbx` : 'New Password File'}
					</h2>
				</div>

				<div className='space-y-4'>
					<div className='space-y-2'>
						<div className='relative'>
							<Icon
								icon='lucide:key-round'
								className='absolute left-3 bottom-3 h-4 w-4 mt-1 text-[var(--theme-text)]'
							/>
							<Input
								label='Master Key'
								type={showKey ? '' : 'password'}
								placeholder={fileName ? 'Enter your master key' : 'Create a strong master key'}
								value={masterKey}
								onChange={(e) => onMasterKeyChange(e.target.value)}
								styles='px-9'
							/>
							<ActionButton
								styles='absolute right-3 bottom-3 text-[var(--theme-text)]'
								onClick={() => setShowKey((p) => !p)}
								icon={showKey ? 'lucide:eye' : 'lucide:eye-off'}
							/>
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
						<div className='flex gap-2 bg-[var(--warning)] border border-[var(--warning-border)] px-5 py-3 rounded-md text-[var(--theme-text)]'>
							<Icon icon='lucide:triangle-alert' className='h-8 w-8' />
							<p className='text-xs'>
								This key is required to access your passwords. If you forget it, your data cannot be
								recovered.
							</p>
						</div>
					</div>

					{showNewFileDetails && (
						<label className='text-md flex gap-2 items-center'>
							<input checked={enter} onChange={() => setEnter((p) => !p)} type='checkbox' />
							Enter automatically
						</label>
					)}

					<div className='flex gap-3 pt-2'>
						<Button
							fullWidth
							content='Back'
							onClick={onBack}
							styles='justify-center text-[var(--theme-text)] border bg-[var(--theme-modal)] hover:bg-[var(--theme-hover)]'
						/>
						<Button
							fullWidth
							content={fileName ? 'Unlock' : 'Create'}
							onClick={onSubmit}
							iconLeftStyles='text-white'
							styles='justify-center text-white btn-primary'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

import { ActionButton } from '@/components/common/ActionButtons'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { cn } from '@/utils/cn'
import { formatDateFromMilliseconds } from '@/utils/common'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { PasswordGenerator } from './PasswordGenerator'
interface EntryFormProps {
	noDefaultCategories: Group[]
	entry: Entry
	onHandleChange: (key: string, value: string) => void
	onSubmit: () => void
	onCancel: () => void
}

export const EntryForm: React.FC<EntryFormProps> = ({
	noDefaultCategories,
	entry,
	onHandleChange,
	onSubmit,
	onCancel,
}) => {
	const [showKey, setShowKey] = useState(false)
	const [showGen, setShowGen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSubmit()
	}
	return (
		<>
			<div
				onKeyDown={handleEnterPress}
				className='sm:max-w-[450px] w-full border-0 rounded-xl bg-[var(--theme-modal)] p-8 space-y-3 relative'
			>
				<button
					type='button'
					title='Generate Password'
					onClick={() => setShowGen((p) => !p)}
					className='absolute right-8 top-9 hover:bg-[var(--theme-hover)] p-2 rounded-lg m-0'
				>
					<Icon icon='formkit:password' className='w-6 h-6' />
				</button>
				<div>
					<p className='text-2xl font-bold'>{entry.id ? 'Edit entry' : 'Add new entry'}</p>
					<p className='text-[var(--theme-text-muted)] text-sm'>
						{entry.id ? 'Entry details' : 'Enter the details for the new password entry'}
					</p>
				</div>
				<div className='grid grid-cols-2 space-y-3 gap-x-3'>
					<Input
						id='Title'
						label='Title'
						onChange={(e) => onHandleChange('title', e.target.value)}
						value={entry.title}
						placeholder='New Entry'
						ref={inputRef}
					/>
					<Input
						id='URL'
						label='URL'
						onChange={(e) => onHandleChange('url', e.target.value)}
						value={entry.url}
						placeholder='https://x.com'
					/>
					<Input
						id='Username'
						label='Username'
						onChange={(e) => onHandleChange('username', e.target.value)}
						value={entry.username}
						placeholder='Username'
					/>
					<div className='relative'>
						<Icon
							icon='lucide:key-round'
							className='absolute left-3 bottom-3 h-4 w-4 mt-1 text-[var(--theme-text)]'
						/>
						<Input
							label='Password'
							type={showKey ? '' : 'password'}
							placeholder='Password'
							value={entry.password}
							onChange={(e) => onHandleChange('password', e.target.value)}
							inputStyles='px-9'
						/>
						<ActionButton
							styles='absolute right-3 bottom-3 text-[var(--theme-text)]'
							onClick={() => setShowKey((p) => !p)}
							icon={showKey ? 'lucide:eye' : 'lucide:eye-off'}
						/>
					</div>
					<div className={cn(!entry.id && 'col-span-2')}>
						<label className='flex flex-col font-medium'>
							Category
							<select
								className='h-10 px-3 rounded-lg w-full border-1 border-[var(--theme-border)] disabled:bg-[var(--theme-muted)] disabled:text-[var(--text-muted)] bg-[var(--theme-action)]'
								value={entry.groupId}
								onChange={(e) => onHandleChange('groupId', e.target.value)}
								disabled={Boolean(entry.id)}
							>
								{noDefaultCategories.map((e) => (
									<option key={e.id} value={e.id} className='bg-[var(--theme-bg-secondary)]'>
										{e.name}
									</option>
								))}
							</select>
						</label>
					</div>
					{entry.id && (
						<Input
							label='Added On'
							placeholder=''
							onChange={() => {}}
							value={formatDateFromMilliseconds(entry.creationTime)}
							disabled
						/>
					)}
					<div className='col-span-2'>
						<label className='flex flex-col font-medium'>
							Notes
							<textarea
								className='font-normal p-3 rounded-lg w-full border-1 bg-[var(--theme-action)] border-[var(--theme-border)] disabled:bg-[var(--theme-muted)] disabled:text-[var(--text-muted)]'
								onChange={(e) => onHandleChange('notes', e.target.value)}
								value={entry.notes}
							/>
						</label>
					</div>
				</div>
				<div className='flex gap-x-3 mt-6'>
					<Button
						fullWidth
						content='Cancel'
						onClick={onCancel}
						styles='justify-center text-[var(--theme-text)] border bg-[var(--theme-modal)] hover:bg-[var(--theme-hover)]'
					/>
					<Button
						fullWidth
						content='Save Entry'
						onClick={onSubmit}
						styles='justify-center btn-primary'
					/>
				</div>
			</div>

			{showGen && <PasswordGenerator onHandleChange={onHandleChange} />}
		</>
	)
}

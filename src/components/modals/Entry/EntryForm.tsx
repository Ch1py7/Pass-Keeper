import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { cn } from '@/utils/cn'
import { formatDateFromMilliseconds } from '@/utils/common'
interface EntryFormProps {
	entry: Entry | null
	noDefaultCategories: Group[]
	newEntry: Entry
	onHandleChange: (key: string, value: string) => void
	onSubmit: () => void
	onCancel: () => void
}

export const EntryForm: React.FC<EntryFormProps> = ({
	entry,
	noDefaultCategories,
	newEntry,
	onHandleChange,
	onSubmit,
	onCancel,
}) => {
	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSubmit()
	}
	return (
		<div
			onKeyDown={handleEnterPress}
			className='sm:max-w-[450px] w-full border-0 rounded-xl bg-[var(--theme-modal)] p-8 space-y-3'
		>
			<div>
				<p className='text-2xl font-bold'>{newEntry.id ? newEntry.title : 'Add New Password'}</p>
				<p className='text-[var(--theme-text-muted)] text-sm'>
					{newEntry.id ? 'Entry details' : 'Enter the details for the new password entry'}
				</p>
			</div>
			<div className='grid grid-cols-2 space-y-3 gap-x-3'>
				<Input
					id='Title'
					label='Title'
					onChange={(e) => onHandleChange('title', e.target.value)}
					value={newEntry.title}
					placeholder='New Entry'
				/>
				<Input
					id='URL'
					label='URL'
					onChange={(e) => onHandleChange('url', e.target.value)}
					value={newEntry.url}
					placeholder='https://x.com'
				/>
				<Input
					id='Username'
					label='Username'
					onChange={(e) => onHandleChange('username', e.target.value)}
					value={newEntry.username}
					placeholder='Username'
				/>
				<Input
					id='Password'
					label='Password'
					type='password'
					onChange={(e) => onHandleChange('password', e.target.value)}
					value={newEntry.password}
					placeholder='Password'
				/>
				<div className={cn(!newEntry.id && 'col-span-2')}>
					<label className='flex flex-col font-medium'>
						Category
						<select
							className={cn(
								'h-10 px-3 rounded-lg w-full border-1 border-[var(--theme-border)] disabled:bg-[var(--theme-muted)] disabled:text-[var(--text-muted)]',
								entry?.id && 'bg-gray-200'
							)}
							value={newEntry.groupId}
							onChange={(e) => onHandleChange('groupId', e.target.value)}
							disabled={Boolean(entry)}
						>
							{noDefaultCategories.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</select>
					</label>
				</div>
				{newEntry.id && (
					<Input
						label='Added On'
						placeholder=''
						onChange={() => {}}
						value={formatDateFromMilliseconds(newEntry.creationTime)}
						disabled
					/>
				)}
				<div className='col-span-2'>
					<label className='flex flex-col font-medium'>
						Notes
						<textarea
							className='font-normal p-3 rounded-lg w-full border-1 bg-[var(--theme-action)] border-[var(--theme-border)] disabled:bg-[var(--theme-muted)] disabled:text-[var(--text-muted)]'
							onChange={(e) => onHandleChange('notes', e.target.value)}
							value={newEntry.notes}
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
	)
}

import { Button } from '@/components/common/Button'
import { kdbxErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { getKdbxInstance, setKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { assignKdbxData } from '@/utils/kdbxHelpers'
import * as kdbxweb from 'kdbxweb'
import { useState } from 'react'
import { Input } from '../common/Input'

export const ChangeKey = () => {
	const [newKey, setNewKey] = useState('')
	const kdbx = getKdbxInstance()

	const { setOpen } = useAppStore()

	const onSubmit = async () => {
		try {
			await kdbx.changeMasterKey(newKey)
			toasty.success('Master key updated successfully')
			setKdbxInstance(kdbx)
			assignKdbxData(kdbx)
			setOpen(false)
		} catch (err) {
			if (err instanceof DOMException) kdbxErrorsHandle(err.name)
			else if (err instanceof kdbxweb.KdbxError) kdbxErrorsHandle(err.code)
			else {
				console.error(err)
				toasty.error('An unknown error occurred')
			}
		}
	}

	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') onSubmit()
	}
	return (
		<div
			onKeyDown={handleEnterPress}
			className='sm:max-w-[400px] w-full border-0 rounded-xl bg-[var(--theme-modal)] space-y-3 p-8'
		>
			<div>
				<p className='text-2xl font-bold'>Change Your Password</p>
				<p className='text-sm text-[var(--theme-text-muted)]'>
					This will update the password used to unlock your database
				</p>
			</div>
			<Input
				label='New Master Password'
				placeholder=''
				onChange={(e) => setNewKey(e.target.value)}
				value={newKey}
			/>
			<div className='flex mt-6 gap-x-2'>
				<Button
					fullWidth
					content='Cancel'
					onClick={() => setOpen(false)}
					styles='justify-center text-[var(--theme-text)] border bg-[var(--theme-modal)] hover:bg-[var(--theme-hover)]'
				/>
				<Button
					fullWidth
					content='Change Password'
					onClick={onSubmit}
					styles='justify-center btn-primary'
				/>
			</div>
		</div>
	)
}

import { dbErrorsHandle, kdbxErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { getDbInstance } from '@/services/dbSingleton'
import { getKdbxInstance, setKdbxInstance } from '@/services/kdbxSingleton'
import { useAppStore } from '@/store/AppStore'
import { assignKdbxData } from '@/utils/kdbxHelpers'
import { Icon } from '@iconify/react'
import * as kdbxweb from 'kdbxweb'
import { useState } from 'react'
import { Button } from '../../common/Button'

export const SyncFunc = () => {
	const [loading, setLoading] = useState(false)
	const db = getDbInstance()
	const kdbx = getKdbxInstance()
	const { setFile } = useAppStore()

	const syncToDb = async () => {
		try {
			setLoading(true)
			const binary = await kdbx.getBinary()
			await db.syncToDb(binary)
			toasty.success('Successful synchronization')
		} catch (err) {
			if (err instanceof kdbxweb.KdbxError) kdbxErrorsHandle(err.code)
			else if (typeof err === 'string') dbErrorsHandle(err, '')
			else {
				console.error(err)
				toasty.error('An unknown error occurred')
			}
		} finally {
			setLoading(false)
		}
	}

	const syncToLocal = async () => {
		try {
			setLoading(true)
			const base64 = await db.syncToLocal()
			await kdbx.loadBase64(base64)
			setKdbxInstance(kdbx)
			assignKdbxData(kdbx)
			setFile((p) => ({ ...p, recycleBinId: kdbx.getRecycleBinId() }))
			toasty.success('Successful synchronization')
		} catch (err) {
			if (err instanceof kdbxweb.KdbxError) kdbxErrorsHandle(err.code)
			else if (typeof err === 'string') dbErrorsHandle(err, '')
			else {
				console.error(err)
				toasty.error('An unknown error occurred')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{!db && (
				<div>
					<div className='flex items-center gap-2 bg-[var(--warning)] border border-[var(--warning-border)] px-5 py-3 rounded-md text-[var(--theme-text)]'>
						<Icon icon='lucide:triangle-alert' className='h-8 w-8' />
						<p className='text-sm'>
							Not connected to database. Please configure connection settings first.
						</p>
					</div>
				</div>
			)}
			<div className='flex flex-col gap-2'>
				<Button
					fullWidth
					content='Sync Local to Database'
					styles='justify-center'
					iconLeft='lucide:cloud-upload'
					iconLeftStyles='w-7 h-7'
					disabled={!db || loading}
					onClick={syncToDb}
				/>
				<Button
					fullWidth
					content='Sync Database to Local'
					styles='justify-center'
					iconLeft='lucide:cloud-download'
					iconLeftStyles='w-7 h-7'
					disabled={!db || loading}
					onClick={syncToLocal}
				/>
			</div>
		</>
	)
}

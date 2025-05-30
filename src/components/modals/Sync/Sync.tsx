import { dbErrorsHandle } from '@/errors'
import { toasty } from '@/notifications'
import { Db } from '@/services/db'
import { getDbInstance, setDbInstance } from '@/services/dbSingleton'
import { useAppStore } from '@/store/AppStore'
import { cn } from '@/utils/cn'
import { sampleSqlData } from '@/utils/constants'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Button } from '../../common/Button'
import { Conf } from './Conf'
import { SyncFunc } from './SyncFunc'

export const Sync = () => {
	const [isConnection, setIsConnection] = useState<boolean>(false)
	const [sqlData, setSqlData] = useState<SqlData>(sampleSqlData)
	const [loading, setLoading] = useState(false)
	const [tab, setTab] = useState<'sync' | 'conf'>('sync')
	const { setModal } = useAppStore()
	const db = getDbInstance()

	const reset = () => {
		setDbInstance(null)
		setIsConnection(false)
	}

	const connection = async () => {
		try {
			setLoading(true)
			const db = new Db(sqlData)
			await db.connection()
			setDbInstance(db)
			setIsConnection(true)
			toasty.success('Connection successfully')
		} catch (err) {
			if (typeof err === 'string') {
				dbErrorsHandle(err, sqlData.user)
			} else {
				console.error(err)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (db) {
			setIsConnection(true)
		} else {
			setTab('conf')
		}
	}, [db])

	useEffect(() => {
		if (db) {
			setSqlData(db.credentials)
			setIsConnection(true)
		} else if (!isConnection) {
			setSqlData(sampleSqlData)
		}
	}, [db, isConnection])

	return (
		<div className='sm:max-w-[450px] w-full border-0 rounded-xl bg-[var(--theme-modal)] p-8 space-y-3'>
			<div>
				<div className='flex justify-between items-center'>
					<p className='text-2xl font-bold'>Sync Data</p>
					<div className='flex items-center gap-2'>
						<div
							className={`w-3 h-3 rounded-full ${
								db && !loading ? 'bg-green-500' : loading ? 'bg-amber-500' : 'bg-red-500'
							}`}
						/>
						<span className='text-sm font-medium'>
							{db && !loading ? 'Connected' : loading ? 'Testing connection...' : 'Disconnected'}
						</span>
					</div>
				</div>
				<p className='text-[var(--theme-text-muted)] text-sm'>
					Synchronize your password data between local file and database
				</p>
			</div>
			<div className='flex justify-between bg-[var(--theme-muted)] rounded-md p-2 gap-3'>
				<button
					className={cn(
						'p-1 w-full rounded-sm font-medium text-sm',
						tab === 'sync'
							? 'bg-[var(--theme-bg-primary)] text-[var(--theme-text-on-primary)]'
							: 'hover:bg-[var(--theme-hover)]'
					)}
					type='button'
					onClick={() => setTab('sync')}
				>
					Sync Your Data
				</button>
				<button
					className={cn(
						'p-1 w-full rounded-sm font-medium text-sm',
						tab === 'conf'
							? 'bg-[var(--theme-bg-primary)] text-[var(--theme-text-on-primary)]'
							: 'hover:bg-[var(--theme-hover)]'
					)}
					type='button'
					onClick={() => setTab('conf')}
				>
					Connection Settings
				</button>
			</div>
			{tab === 'sync' && <SyncFunc />}
			{tab === 'conf' && (
				<Conf setSqlData={setSqlData} sqlData={sqlData} db={db} loading={loading} />
			)}
			<div className='grid grid-cols-2 gap-2 mt-6'>
				{tab === 'conf' && (
					<button
						type='button'
						onClick={() => (!db ? connection() : reset())}
						className={cn(
							'px-4 py-2 rounded-md flex justify-center w-full items-center gap-2 disabled:bg-gray-100 disabled:text-slate-400 text-white',
							db && !loading && 'bg-green-600 hover:bg-green-700',
							!db && 'bg-black'
						)}
					>
						{loading ? (
							<>
								<Icon icon='lucide:loader-circle' className='h-6 w-6 mr-2 animate-spin' />
								Testing...
							</>
						) : !loading && Boolean(db) ? (
							<>
								<Icon icon='lucide:circle-check' className='h-4 w-4 mr-2' />
								Connected
							</>
						) : (
							'Test Connection'
						)}
					</button>
				)}
				<Button
					fullWidth={isConnection}
					content='Close'
					onClick={() => setModal(null)}
					styles='ms-auto justify-center w-full col-start-2 text-[var(--theme-text)] border bg-[var(--theme-modal)] hover:bg-[var(--theme-hover)]'
				/>
			</div>
		</div>
	)
}

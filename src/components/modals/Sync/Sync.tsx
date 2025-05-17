import { getDbInstance, setDbInstance } from '@/services/dbSingleton'
import { useAppStore } from '@/store/AppStore'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'
import { Button } from '../../common/Button'
import { Conf } from './Conf'
import { SyncFunc } from './SyncFunc'

export const Sync = () => {
	const [isConnection, setIsConnection] = useState<boolean>(false)
	const [tab, setTab] = useState<'sync' | 'conf'>('sync')
	const { setOpen } = useAppStore()
	const db = getDbInstance()

	const reset = () => {
		setDbInstance(null)
		setIsConnection(false)
	}

	useEffect(() => {
		if (db) {
			setIsConnection(true)
		} else {
			setTab('conf')
		}
	}, [db])

	return (
		<div className='sm:max-w-[450px] border-0 shadow-2xl bg-white rounded-xl p-8'>
			<div>
				<p className='text-2xl font-bold'>Sync Data</p>
				<p className='text-slate-500 text-sm mt-1'>
					Synchronize your password data between local file and database
				</p>
			</div>
			<div className='flex justify-between bg-slate-200/60 rounded-md p-1 gap-2'>
				<button
					className={cn(
						'p-1 flex-1 rounded-sm cursor-pointer font-medium text-sm',
						tab === 'sync' ? 'bg-white' : 'hover:bg-gray-100'
					)}
					type='button'
					onClick={() => setTab('sync')}
				>
					Sync Data
				</button>
				<button
					className={cn(
						'p-1 flex-1 rounded-sm cursor-pointer font-medium text-sm',
						tab === 'conf' ? 'bg-white' : 'hover:bg-gray-100'
					)}
					type='button'
					onClick={() => setTab('conf')}
				>
					Connection Settings
				</button>
			</div>
			{tab === 'sync' && <SyncFunc />}
			{tab === 'conf' && <Conf isConnection={isConnection} setIsConnection={setIsConnection} />}
			<div className='flex space-x-4'>
				{isConnection && (
					<Button
						fullWidth
						content='Disconnect'
						onClick={reset}
						shadows={false}
						style='primary'
						styles='border-1 border-slate-300 ms-auto mt-4 justify-center text-white'
					/>
				)}
				<Button
					fullWidth={isConnection}
					content='Close'
					onClick={() => setOpen(false)}
					shadows={false}
					styles='border-1 border-slate-300 ms-auto mt-4 justify-center'
				/>
			</div>
		</div>
	)
}

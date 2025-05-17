import { getDbInstance } from '@/services/dbSingleton'
import { Icon } from '@iconify/react'
import { Button } from '../../common/Button'

export const SyncFunc = () => {
	const db = getDbInstance()

	return (
		<>
			{!db && (
				<div className='pt-2'>
					<div className='flex gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-5 py-3 rounded-md'>
						<Icon icon='lucide:triangle-alert' className='h-8 w-8' />
						<p className='text-sm'>
							Not connected to database. Please configure connection settings first.
						</p>
					</div>
				</div>
			)}
			<div className='flex flex-col gap-2 mt-4'>
				<Button
					fullWidth
					content='Sync Local to Database'
					shadows={false}
					style='primary'
					styles='text-white justify-center'
					iconLeft='prime:cloud-upload'
					iconLeftStyles='w-7 h-7'
					disabled={!db}
				/>
				<Button
					fullWidth
					content='Sync Database to Local'
					shadows={false}
					iconLeft='prime:cloud-download'
					iconLeftStyles='w-7 h-7'
					styles='bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 disabled:from-blue-300 disabled:to-cyan-200 hover:to-cyan-700 justify-center text-white'
					disabled={!db}
				/>
			</div>
		</>
	)
}

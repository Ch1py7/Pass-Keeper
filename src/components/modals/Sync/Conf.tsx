import { dbErrorsHandle } from '@/errors/errors'
import { toasty } from '@/notifications/toast'
import { Db } from '@/services/db'
import { getDbInstance, setDbInstance } from '@/services/dbSingleton'
import { cn } from '@/utils/cn'
import { sampleSqlData } from '@/utils/constants'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { SqlForm } from './SqlForm'

interface ConfProps {
	isConnection: boolean
	setIsConnection: React.Dispatch<React.SetStateAction<boolean>>
}

export const Conf: React.FC<ConfProps> = ({ isConnection, setIsConnection }) => {
	const [loading, setLoading] = useState(false)
	const [sqlData, setSqlData] = useState<SqlData>(sampleSqlData)
	const db = getDbInstance()

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
			setSqlData(db.credentials)
			setIsConnection(true)
		} else if (!isConnection) {
			setSqlData(sampleSqlData)
		}
	}, [db, isConnection, setIsConnection])
	return (
		<div className='mt-4 space-y-4'>
			<div className='space-y-4'>
				<div>
					<p className='inline-flex items-center font-medium'>
						<Icon icon='solar:database-linear' />
						Database Type
					</p>
					<div className='flex gap-4'>
						<label className='flex gap-1 font-medium'>
							<input
								checked={sqlData.dbtype === 'postgres'}
								type='radio'
								onChange={() => setSqlData((p) => ({ ...p, dbtype: 'postgres' }))}
								disabled={Boolean(db)}
							/>
							PostgreSQL
						</label>
						<label className='flex gap-1 font-medium'>
							<input
								checked={sqlData.dbtype === 'mysql'}
								type='radio'
								onChange={() => setSqlData((p) => ({ ...p, dbtype: 'mysql' }))}
								disabled={Boolean(db)}
							/>
							MySQL
						</label>
					</div>
				</div>
				{(sqlData.dbtype === 'mysql' || sqlData.dbtype === 'postgres') && (
					<SqlForm sqlData={sqlData} setSqlData={setSqlData} db={Boolean(db)} loading={loading} />
				)}
				<div className='pt-2'>
					<div className='flex items-center justify-between'>
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

						<button
							type='button'
							onClick={() => !db && connection()}
							disabled={Boolean(db)}
							className={cn(
								'py-2 px-3 rounded-md cursor-pointer flex items-center gap-2 disabled:bg-gray-100 disabled:text-slate-400',
								db && !loading && 'bg-green-600 hover:bg-green-700',
								!db && 'bg-black text-white'
							)}
						>
							{loading ? (
								<>
									<Icon icon='codex:loader' className='h-6 w-6 mr-2 animate-spin' />
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
					</div>
				</div>
			</div>
		</div>
	)
}

import type { Db } from '@/services/db'
import { Icon } from '@iconify/react'
import { SqlForm } from './SqlForm'

interface ConfProps {
	sqlData: SqlData
	setSqlData: React.Dispatch<React.SetStateAction<SqlData>>
	loading: boolean
	db?: Db
}

export const Conf: React.FC<ConfProps> = ({ sqlData, setSqlData, loading, db }) => {
	return (
		<div className='space-y-3'>
			<div>
				<p className='inline-flex items-center font-medium gap-2'>
					<Icon icon='lucide:database' />
					Database
				</p>
				<div className='flex gap-4'>
					<label className='flex font-medium gap-2'>
						<input
							checked={sqlData.dbtype === 'postgres'}
							type='radio'
							onChange={() => setSqlData((p) => ({ ...p, dbtype: 'postgres' }))}
							disabled={Boolean(db)}
						/>
						PostgreSQL
					</label>
					<label className='flex font-medium gap-2'>
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
		</div>
	)
}

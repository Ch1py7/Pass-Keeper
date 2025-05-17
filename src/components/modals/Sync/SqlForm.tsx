import { Icon } from '@iconify/react'

interface SqlFormProps {
	sqlData: SqlData
	setSqlData: React.Dispatch<React.SetStateAction<SqlData>>
	db: boolean
	loading: boolean
}

export const SqlForm: React.FC<SqlFormProps> = ({ sqlData, setSqlData, db, loading }) => {
	return (
		<>
			<div className='flex space-x-4'>
				<div className='flex flex-col space-y-2'>
					<label htmlFor='db-host' className='flex items-center gap-2 font-medium'>
						<Icon icon='clarity:host-line' className='h-4 w-4' />
						Host
					</label>
					<input
						disabled={db || loading}
						className='h-10 px-3 rounded-lg w-full border-1 border-solid border-slate-300 focus:ring-2 focus:border-transparent disabled:bg-gray-100 disabled:text-slate-400'
						id='db-host'
						placeholder='localhost'
						value={sqlData.host}
						onChange={(e) => setSqlData((p) => ({ ...p, host: e.target.value }))}
					/>
				</div>
				<div className='flex flex-col space-y-2'>
					<label className='flex flex-col items-start gap-2 font-medium'>
						Port
						<input
							disabled={db || loading}
							className='h-10 px-3 rounded-lg w-full border-1 border-solid border-slate-300 focus:ring-2 focus:border-transparent font-normal disabled:bg-gray-100 disabled:text-slate-400'
							placeholder='5432'
							value={sqlData.port}
							onChange={(e) => setSqlData((p) => ({ ...p, port: e.target.value }))}
						/>
					</label>
				</div>
			</div>

			<div className='flex space-x-4'>
				<div className='flex flex-col space-y-2'>
					<label htmlFor='db-name' className='flex items-center gap-2 font-medium'>
						<Icon icon='solar:database-linear' className='h-4 w-4' />
						Database Name
					</label>
					<input
						disabled={db || loading}
						className='h-10 px-3 rounded-lg w-full border-1 border-solid border-slate-300 focus:ring-2 focus:border-transparent disabled:bg-gray-100 disabled:text-slate-400'
						id='db-name'
						placeholder='postgres'
						value={sqlData.dbname}
						onChange={(e) => setSqlData((p) => ({ ...p, dbname: e.target.value }))}
					/>
				</div>

				<div className='flex flex-col space-y-2'>
					<label htmlFor='db-username' className='flex items-center gap-2 font-medium'>
						<Icon icon='solar:database-linear' className='h-4 w-4' />
						Username
					</label>
					<input
						disabled={db || loading}
						className='h-10 px-3 rounded-lg w-full border-1 border-solid border-slate-300 focus:ring-2 focus:border-transparent disabled:bg-gray-100 disabled:text-slate-400'
						id='db-username'
						placeholder='user123'
						value={sqlData.user}
						onChange={(e) => setSqlData((p) => ({ ...p, user: e.target.value }))}
					/>
				</div>
			</div>

			<div className='flex flex-col space-y-2'>
				<label htmlFor='db-password' className='flex items-center gap-2 font-medium'>
					<Icon icon='ri:key-2-line' className='h-4 w-4' />
					Password
				</label>
				<input
					disabled={db || loading}
					className='h-10 px-3 rounded-lg w-full border-1 border-solid border-slate-300 focus:ring-2 focus:border-transparent disabled:bg-gray-100 disabled:text-slate-400'
					id='db-password'
					type='password'
					placeholder='Enter database password'
					value={sqlData.pass}
					onChange={(e) => setSqlData((p) => ({ ...p, pass: e.target.value }))}
				/>
			</div>
		</>
	)
}

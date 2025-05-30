import { Input } from '@/components/common/Input'
import { useEffect, useRef } from 'react'

interface SqlFormProps {
	sqlData: SqlData
	setSqlData: React.Dispatch<React.SetStateAction<SqlData>>
	db: boolean
	loading: boolean
}

export const SqlForm: React.FC<SqlFormProps> = ({ sqlData, setSqlData, db, loading }) => {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])
	return (
		<div className='grid grid-cols-2 space-y-3 gap-x-3'>
			<Input
				label='Host'
				disabled={db || loading}
				icon='lucide:container'
				id='db-host'
				placeholder='localhost'
				value={sqlData.host}
				onChange={(e) => setSqlData((p) => ({ ...p, host: e.target.value }))}
				ref={inputRef}
			/>
			<Input
				label='Port'
				disabled={db || loading}
				icon='fluent:usb-port-24-regular'
				id='db-port'
				placeholder='5432'
				value={sqlData.port}
				onChange={(e) => setSqlData((p) => ({ ...p, port: e.target.value }))}
			/>
			<Input
				label='Database Name'
				disabled={db || loading}
				icon='lucide:database'
				id='db-name'
				placeholder='postgres'
				value={sqlData.dbname}
				onChange={(e) => setSqlData((p) => ({ ...p, dbname: e.target.value }))}
			/>
			<Input
				label='Username'
				disabled={db || loading}
				icon='lucide:user'
				id='db-username'
				placeholder='user123'
				value={sqlData.user}
				onChange={(e) => setSqlData((p) => ({ ...p, user: e.target.value }))}
			/>
			<div className='col-span-2'>
				<Input
					label='Password'
					disabled={db || loading}
					icon='lucide:key-round'
					id='db-password'
					type='password'
					placeholder='Enter database password'
					value={sqlData.pass}
					onChange={(e) => setSqlData((p) => ({ ...p, pass: e.target.value }))}
				/>
			</div>
		</div>
	)
}

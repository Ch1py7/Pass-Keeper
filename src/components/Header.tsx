import { useAppStore } from '@/store/AppStore'
import { formatDateFromMilliseconds } from '@/utils/common'
import { Icon } from '@iconify/react'
import { Button } from './common/Button'

export const Header: React.FC = () => {
	const { setOpen, setModal, file } = useAppStore()

	return (
		<header className='flex justify-between items-center'>
			<div className='flex items-center gap-3'>
				<div className='bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-lg'>
					<Icon icon='mynaui:lock' className='text-white h-8 w-8' />
				</div>
				<div>
					<h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>
						Vault Keeper
					</h1>
					<div className='flex gap-5 mt-1'>
						<p className='text-slate-500'>{file.name}</p>
						<p className='flex items-center text-xs rounded-full border border-solid border-slate-300 px-3 font-bold'>
							Last modified:{' '}
							{formatDateFromMilliseconds(file.lastModified ? file.lastModified : Date.now())}
						</p>
					</div>
				</div>
			</div>
			<Button
				iconLeft='simple-line-icons:plus'
				content='Add Password'
				onClick={() => {
					setOpen(true)
					setModal('entry')
				}}
				style='primary'
			/>
		</header>
	)
}

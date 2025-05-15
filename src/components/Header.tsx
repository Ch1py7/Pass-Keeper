import { useAppStore } from '@/store/AppStore'
import { Icon } from '@iconify/react'
import { Button } from './common/Button'

export const Header: React.FC = () => {
	const { setOpen, setModal, file } = useAppStore()

	return (
		<header className='flex flex-col md:flex-row items-center justify-between mb-8 gap-4'>
			<div className='flex items-center gap-3'>
				<div className='bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-lg'>
					<Icon icon='mynaui:lock' className='text-white h-8 w-8' />
				</div>
				<div>
					<h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>
						Vault Keeper
					</h1>
					<div className='flex items-center gap-2'>
						<p className='text-slate-500 dark:text-slate-400'>{file.name}</p>
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

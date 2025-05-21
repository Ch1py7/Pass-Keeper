import { useAppStore } from '@/store/AppStore'
import { Icon } from '@iconify/react'
import { Button } from './common/Button'

export const Header = () => {
	const { setOpen, setModal, file } = useAppStore()

	return (
		<header className='flex flex-col md:flex-row w-full items-center justify-between gap-4 select-none pt-8 px-10'>
			<div className='flex items-center gap-3'>
				<div className='bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-lg'>
					<Icon icon='lucide:lock' className='text-white h-8 w-8' />
				</div>
				<div>
					<h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>
						Vault Keeper
					</h1>
					<div className='flex items-center gap-2'>
						<p className='text-slate-500'>{file.name}</p>
					</div>
				</div>
			</div>
			<div className='flex gap-2'>
				<Button
					iconLeft='lucide:cloud'
					iconLeftStyles='w-6 h-6'
					content='Sync'
					shadows={false}
					styles='border-1 border-slate-300 text-black'
					onClick={() => {
						setOpen(true)
						setModal('sync')
					}}
					style='tertiary'
				/>
				<Button
					iconLeft='lucide:circle-plus'
					content='Add Password'
					onClick={() => {
						setOpen(true)
						setModal('entry')
					}}
					style='primary'
					styles='text-white'
				/>
			</div>
		</header>
	)
}

import { useAppStore } from '@/store/AppStore'
import { Icon } from '@iconify/react'
import { ActionButton } from './common/ActionButtons'
import { Button } from './common/Button'

interface HeaderProps {
	isCompact: boolean
	setIsCompact: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<HeaderProps> = ({ isCompact, setIsCompact }) => {
	const { setOpen, setModal, file } = useAppStore()

	return (
		<header className='flex flex-col md:flex-row items-center justify-between mb-8 gap-4'>
			<div className='flex items-center gap-3'>
				<div className='bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl shadow-lg'>
					<Icon icon='lucide:lock' className='text-white h-8 w-8' />
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
			<div className='flex gap-2'>
				<div className='flex justify-between bg-slate-200/60 rounded-md p-1 gap-2'>
					<ActionButton
						styles={isCompact ? 'bg-white hover:bg-white hover:text-slate-500' : ''}
						onClick={() => setIsCompact(true)}
						icon={'lucide:list'}
					/>
					<ActionButton
						styles={!isCompact ? 'bg-white hover:bg-white hover:text-slate-500' : ''}
						onClick={() => setIsCompact(false)}
						icon={'lucide:grid-2x2'}
					/>
				</div>
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

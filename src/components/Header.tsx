import { useEvent } from '@/hooks/useEvent'
import { useAppStore } from '@/store/AppStore'
import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Button } from './common/Button'

interface HeaderProps {
	searchQuery: string
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
	const { setOpen, setModal, file } = useAppStore()
	const [showMenu, setShowMenu] = useState(false)

	useEvent(document, 'click', () => {
		setShowMenu(false)
	})

	return (
		<header className='flex flex-col md:flex-row w-full items-center justify-between gap-4 select-none pt-8 px-10'>
			<div className='flex items-center gap-3'>
				<div className='bg-gradient-to-r from-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)] p-3 rounded-xl'>
					<Icon icon='lucide:lock' className='h-8 w-8 text-[var(--theme-text-on-primary)]' />
				</div>
				<div>
					<h1 className='text-3xl font-bold'>Vault Keeper</h1>
					<p className='text-[var(--theme-text-muted)]'>{file.name}.kdbx</p>
				</div>
			</div>
			<div className='relative w-full max-w-md items-center hidden lg:flex'>
				<Icon
					icon='radix-icons:magnifying-glass'
					className='absolute left-3 h-5 w-5 text-[var(--theme-text)] mt-1'
				/>
				<input
					placeholder='Search passwords...'
					value={searchQuery}
					onChange={(e) => {
						e.stopPropagation()
						setSearchQuery(e.target.value)
					}}
					className='pl-10 h-12 rounded-full bg-[var(--theme-action)] w-full border focus:ring-2 focus:ring-[var(--theme-bg-secondary)] focus:border-transparent select-none'
				/>
			</div>
			<div className='flex gap-2'>
				<div className='relative'>
					<Button
						iconLeft='lucide:menu'
						iconLeftStyles='w-6 h-6'
						content=''
						styles='border bg-[var(--theme-action)] text-[var(--theme-text)] hover:bg-[var(--theme-hover)]'
						onClick={(e) => {
							e.stopPropagation()
							setShowMenu((p) => !p)
						}}
					/>
					{showMenu && (
						<div className='absolute right-0 top-full z-10 w-50 rounded-md mt-2 p-2 border bg-[var(--theme-modal)]'>
							<Button
								iconLeft='lucide:cloud'
								iconLeftStyles='w-5 h-5'
								content='Sync'
								styles={cn('w-full hover:bg-[var(--theme-hover)] text-[var(--theme-text)] py-1 px-2')}
								onClick={() => {
									setOpen(true)
									setModal('sync')
								}}
							/>
							<Button
								iconLeft='lucide:key'
								iconLeftStyles='w-5 h-5'
								content='New Master Key'
								styles='w-full mt-1 hover:bg-[var(--theme-hover)] text-[var(--theme-text)] py-1 px-2'
								onClick={() => {
									setOpen(true)
									setModal('key')
								}}
							/>
							<Button
								iconLeft='lucide:paintbrush'
								iconLeftStyles='w-5 h-5'
								content='Theme'
								styles='w-full mt-1 hover:bg-[var(--theme-hover)] text-[var(--theme-text)] py-1 px-2'
								onClick={() => {
									setOpen(true)
									setModal('theme')
								}}
							/>
						</div>
					)}
				</div>
				<Button
					content='Add Entry'
					iconLeft='lucide:plus'
					onClick={() => {
						setOpen(true)
						setModal('entry')
					}}
					styles='btn-primary'
				/>
			</div>
		</header>
	)
}

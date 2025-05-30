import { useAppStore } from '@/store/AppStore'
import { useEffect, useRef } from 'react'
import { NewCategory } from './Category/NewCategory'
import { ChangeKey } from './ChangeKey'
import { Delete } from './Delete'
import { NewEntry } from './Entry/NewEntry'
import { Sync } from './Sync/Sync'
import { ThemeSelector } from './ThemeSelector'

export const Modal = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const { modal, setModal, setCategory, setEntry } = useAppStore()

	useEffect(() => {
		if (!modal) {
			setCategory(null)
			setEntry(null)
		}
	}, [modal, setCategory, setEntry])

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (e.target === containerRef.current) {
				setModal(null)
			}
		}
		document.addEventListener('click', onClick)

		return () => {
			document.removeEventListener('click', onClick)
		}
	}, [setModal])

	if (!modal) return null

	return (
		<div
			ref={containerRef}
			className='fixed top-0 left-0 right-0 bottom-0 bg-black/70 w-full h-full flex justify-center items-center z-100'
		>
			{modal === 'entry' && <NewEntry />}
			{modal === 'category' && <NewCategory />}
			{modal === 'delete' && <Delete />}
			{modal === 'sync' && <Sync />}
			{modal === 'key' && <ChangeKey />}
			{modal === 'theme' && <ThemeSelector />}
		</div>
	)
}

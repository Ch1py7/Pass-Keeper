import { useAppStore } from '@/store/AppStore'
import { useEffect, useRef } from 'react'
import { Delete } from './Delete'
import { NewCategory } from './NewCategory'
import { NewEntry } from './NewEntry'

export const Modal: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const { open, setOpen, modal, setCategory, setEntry } = useAppStore()

	useEffect(() => {
		if (!open) {
			setCategory(null)
			setEntry(null)
		}
	}, [open, setCategory, setEntry])

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (e.target === containerRef.current) {
				setOpen(false)
			}
		}
		document.addEventListener('click', onClick)

		return () => {
			document.removeEventListener('click', onClick)
		}
	}, [setOpen])

	if (!open) return null

	return (
		<div
			ref={containerRef}
			className='fixed top-0 left-0 right-0 bottom-0 bg-black/70 w-full h-full flex justify-center items-center'
		>
			{modal === 'entry' && <NewEntry />}
			{modal === 'category' && <NewCategory />}
			{modal === 'delete' && <Delete />}
		</div>
	)
}

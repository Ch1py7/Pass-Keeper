import { useEvent } from '@/hooks/useEvent'
import { useAppStore } from '@/store/AppStore'
import { useFileStore } from '@/store/FileStore'
import { cn } from '@/utils/cn'
import { LEFT_MOUSE_BTN } from '@/utils/constants'
import { useCallback, useEffect, useRef, useState } from 'react'

export const SelectionBox = () => {
	const squareRef = useRef<HTMLDivElement>(null)
	const { itemContainerRef, canvasContainerRef } = useFileStore()
	const { open } = useAppStore()

	const [showSelectionArea, setShowSelectionArea] = useState(false)
	const [clickStartPosition, setClickStartPosition] = useState<Point | null>(null)
	const [clickEndPosition, setClickEndPosition] = useState<Point | null>(null)
	const [lastMousePosition, setLastMousePosition] = useState<Point | null>(null)

	const onMouseDown = useCallback(
		(e: MouseEvent) => {
			if (e.button !== LEFT_MOUSE_BTN) return
			if (open) return
			if (!canvasContainerRef.current) return
			if (!itemContainerRef.current) return
			if (e.target !== itemContainerRef.current && e.target !== canvasContainerRef.current) return

			const scrollTop = window.scrollY
			const containerBoundingRect = canvasContainerRef.current.getBoundingClientRect()

			setClickStartPosition({
				x: e.clientX,
				y: e.clientY - containerBoundingRect.top + containerBoundingRect.y + scrollTop,
			})
			setLastMousePosition({ x: e.clientX, y: e.clientY })
		},
		[open, itemContainerRef, canvasContainerRef]
	)
	useEvent(document, 'mousedown', onMouseDown)

	const onMouseUp = useCallback(
		(e: MouseEvent) => {
			setClickStartPosition(null)
			setClickEndPosition(null)
			setShowSelectionArea(false)
			setLastMousePosition(null)

			if (clickEndPosition === null && !e.ctrlKey) {
				return
			}
		},
		[clickEndPosition]
	)
	useEvent(document, 'mouseup', onMouseUp)

	const onMouseMove = useCallback(
		(e: MouseEvent) => {
			if (open) return
			if (!clickStartPosition) return

			setShowSelectionArea(true)

			const scrollTop = window.scrollY
			const containerBoundingRect = canvasContainerRef.current.getBoundingClientRect()
			setClickEndPosition({
				x: e.clientX,
				y: e.clientY - containerBoundingRect.top + containerBoundingRect.y + scrollTop,
			})
			setLastMousePosition({ x: e.clientX, y: e.clientY })
		},
		[open, clickStartPosition, canvasContainerRef]
	)
	useEvent(document, 'mousemove', onMouseMove)

	const onScroll = useCallback(() => {
		if (!clickStartPosition) return
		if (!canvasContainerRef.current) return
		if (!lastMousePosition) return

		const scrollTop = window.scrollY
		const containerBoundingRect = canvasContainerRef.current.getBoundingClientRect()
		setClickEndPosition({
			x: lastMousePosition.x,
			y: lastMousePosition.y - containerBoundingRect.top + containerBoundingRect.y + scrollTop,
		})
	}, [clickStartPosition, canvasContainerRef, lastMousePosition])
	useEvent(document, 'scroll', onScroll)

	useEffect(() => {
		if (!clickEndPosition || !clickStartPosition) return

		const width = Math.abs(clickEndPosition.x - clickStartPosition.x)
		const height = Math.abs(clickEndPosition.y - clickStartPosition.y)
		const x = Math.min(clickStartPosition.x, clickEndPosition.x)
		const y = Math.min(clickStartPosition.y, clickEndPosition.y)

		if (squareRef.current) {
			squareRef.current.style.display = ''
			squareRef.current.style.left = `${x}px`
			squareRef.current.style.top = `${y}px`
			squareRef.current.style.width = `${width}px`
			squareRef.current.style.height = `${height}px`
		}
	}, [clickEndPosition, clickStartPosition])
	return (
		<div
			ref={squareRef}
			className={cn(
				'z-50 absolute block border-2 solid bg-blue-300/50 border-blue-200',
				showSelectionArea ? '' : 'hidden'
			)}
		/>
	)
}

import { type RefObject, useEffect, useRef } from 'react'

export const useEvent = <T extends EventTarget, E extends Event>(
	elRef: RefObject<T | null> | T,
	event: keyof HTMLElementEventMap,
	handler: (e: E) => void
) => {
	const callbackRef = useRef(handler)

	useEffect(() => {
		callbackRef.current = handler
	}, [handler])

	useEffect(() => {
		const isEl =
			elRef instanceof HTMLElement || elRef instanceof Window || elRef instanceof Document

		const el = isEl ? (elRef as T) : (elRef as RefObject<T | null>).current

		const action = (e: Event) => {
			callbackRef.current(e as E)
		}

		el?.addEventListener(event, action)

		return () => {
			el?.removeEventListener(event, action)
		}
	}, [elRef, event])
}

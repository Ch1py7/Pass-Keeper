import type { RefObject } from 'react'

export const getEntriesUnderBox = (
	x: number,
	y: number,
	width: number,
	height: number,
	canvasContainerRef: RefObject<HTMLDivElement | null>
) => {
	const container = canvasContainerRef.current

	if (!container) return []

	const selectionStartPoint = { x, y }
	const selectionEndPoint = { x: x + width, y: y + height }

	let entryWithBox: {
		entry: {
			id: string
			groupId: string
		}
		box: Box
	}[] = []

	const containerBoundingBox = container.getBoundingClientRect()
	for (const child of container.children) {
		const id = (child as HTMLElement).dataset.id
		const groupId = (child as HTMLElement).dataset.groupid
		if (!id || !groupId) continue

		const rect = child.getBoundingClientRect()
		entryWithBox = [
			...entryWithBox,
			{
				entry: { id, groupId },
				box: {
					start: {
						x: rect.left,
						y:
							rect.top +
							container.scrollTop -
							containerBoundingBox.top +
							containerBoundingBox.y +
							window.scrollY,
					},
					end: {
						x: rect.right,
						y:
							rect.bottom +
							container.scrollTop -
							containerBoundingBox.top +
							containerBoundingBox.y +
							window.scrollY,
					},
				},
			},
		]
	}

	const collidedWith = entryWithBox.filter(
		({ box }) =>
			selectionStartPoint.x < box.end.x &&
			selectionEndPoint.x > box.start.x &&
			selectionStartPoint.y < box.end.y &&
			selectionEndPoint.y > box.start.y
	)

	const selectedEntries = collidedWith.map((item) => item.entry)

	return selectedEntries
}

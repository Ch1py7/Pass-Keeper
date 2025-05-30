import { useEvent } from '@/hooks/useEvent'
import { usePasswordTrie } from '@/hooks/usePasswordTrie'
import { useAppStore } from '@/store/AppStore'
import { useFileStore } from '@/store/FileStore'

export const FolderKeybinds = () => {
	const { modal, setModal, searchQuery } = useAppStore()
	const { selectedItems, setSelectedItems, clearSelection } = useFileStore()
	const results = usePasswordTrie(searchQuery)

	useEvent(document, 'keydown', (e: KeyboardEvent) => {
		if (modal) {
			if (e.key === 'Escape') {
				setModal(null)
			}
		} else {
			if (e.ctrlKey && e.key === 'a') {
				setSelectedItems(results)
			}
			if (e.key === 'Escape') {
				clearSelection()
			}
		}
	})

	useEvent(document, 'keyup', (e: KeyboardEvent) => {
		if (modal) return
		if (selectedItems.length === 0) return

		if (e.key === 'Backspace' || e.key === 'Delete') {
			setModal('delete')
		}

		if (e.key === 'F2') {
			setModal('entry')
		}
	})

	return null
}

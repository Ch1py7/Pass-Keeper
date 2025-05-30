import { Toast } from './components/common/Toast'
import { Modal } from './components/modals/Modal'
import { UnlockedFile } from './components/UnlockedFile'
import { UploadFile } from './components/UploadFile'
import { FolderKeybinds } from './folderKeybinds'
import { useTheme } from './hooks/useTheme'
import { useAppStore } from './store/AppStore'

export const App = () => {
	const { file } = useAppStore()

	useTheme()
	return (
		<>
			<FolderKeybinds />
			<Toast />
			<Modal />
			{file.isUnlocked ? <UnlockedFile /> : <UploadFile />}
		</>
	)
}

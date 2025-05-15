import { Modal } from './components/modals/Modal'
import { Toast } from './components/Toast'
import { UnlockedFile } from './components/UnlockedFile'
import { UploadFile } from './components/UploadFile'
import { useAppStore } from './store/AppStore'

export const App: React.FC = () => {
	const { file } = useAppStore()

	return (
		<>
			<Toast />
			{file.isUnlocked ? (
				<>
					<UnlockedFile />
					<Modal />
				</>
			) : (
				<UploadFile />
			)}
		</>
	)
}

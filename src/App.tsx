import { Modal } from './components/modals/Modal'
import { Toast } from './components/Toast'
import { UnlockedFile } from './components/UnlockedFile'
import { UploadFile } from './components/UploadFile'
import { useTheme } from './hooks/useTheme'
import { useAppStore } from './store/AppStore'

export const App = () => {
	const { file } = useAppStore()

	useTheme()
	return (
		<div className='min-h-screen bg-gradient-to-br from-[var(--theme-bg-from)] to-[var(--theme-bg-to)]'>
			<Toast />
			<Modal />
			{file.isUnlocked ? (
				<>
					<UnlockedFile />
				</>
			) : (
				<UploadFile />
			)}
		</div>
	)
}

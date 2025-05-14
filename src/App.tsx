import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Categories } from './components/Categories'
import { Header } from './components/Header'
import { Modal } from './components/modals/Modal'
import { PasswordsList } from './components/PasswordsList'
import { Toast } from './components/Toast'
import { UploadFile } from './components/UploadFile'
import { useAppStore } from './store/AppStore'

export const App: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const { file } = useAppStore()

	return (
		<>
			<Toast />
			{file.size !== 0 ? (
				<>
					<div className='px-10 py-8 space-y-6'>
						<Header />
						<div className='mb-8'>
							<div className='relative max-w-xl mx-auto flex items-center'>
								<Icon
									icon='radix-icons:magnifying-glass'
									className='absolute left-3 h-5 w-5 text-slate-400 mt-1'
								/>
								<input
									type='search'
									placeholder='Search passwords...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pl-10 h-12 rounded-full w-full border-1 border-solid border-slate-300 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
								/>
							</div>
						</div>
						<div className='flex flex-col lg:flex-row gap-8'>
							<Categories />
							<PasswordsList searchQuery={searchQuery} />
						</div>
					</div>
					<Modal />
				</>
			) : (
				<UploadFile />
			)}
		</>
	)
}

import { Icon } from '@iconify/react'
import { Slide, ToastContainer } from 'react-toastify'

export const Toast: React.FC = () => {
	return (
		<ToastContainer
			position='bottom-right'
			autoClose={5000}
			closeOnClick
			transition={Slide}
			icon={({ type }) => {
				switch (type) {
					case 'info':
						return <Icon icon='material-symbols:info-outline' className='text-indigo-500 h-5 w-5' />
					case 'error':
						return <Icon icon='lucide:circle-alert' className='text-red-500 h-5 w-5' />
					case 'success':
						return <Icon icon='lucide:circle-check' className='text-green-500 h-5 w-5' />
					case 'warning':
						return <Icon icon='lucide:triangle-alert' className='text-yellow-500 h-5 w-5' />
					default:
						return null
				}
			}}
			className='p-4 gap-2 toast:p-0 toast:gap-0'
			limit={3}
		/>
	)
}

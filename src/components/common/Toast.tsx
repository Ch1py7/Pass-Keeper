import { Slide, ToastContainer } from 'react-toastify'

export const Toast = () => {
	return (
		<ToastContainer
			position='bottom-right'
			autoClose={5000}
			closeOnClick
			transition={Slide}
			theme='colored'
			className='p-4 gap-2 toast:p-0 toast:gap-0'
			limit={3}
		/>
	)
}

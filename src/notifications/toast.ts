import { toast } from 'react-toastify'

export namespace toasty {
	export const success = (message: string) => {
		toast.success(message)
	}

	export const error = (message: string) => {
		toast.error(message)
	}

	export const info = (message: string) => {
		toast.info(message)
	}

	export const warn = (message: string) => {
		toast.warn(message)
	}
}

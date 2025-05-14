import { toasty } from '@/notifications/toast'

export const fsErrorsHandler = (name: string) => {
	switch (name) {
		case 'AbortError':
			toasty.info('Operation canceled')
			break
	}
}

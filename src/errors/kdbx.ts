import { toasty } from '@/notifications/toast'
import * as kdbxweb from 'kdbxweb'

export const kdbxErrorsHandler = (code: string) => {
	switch (code) {
		case kdbxweb.Consts.ErrorCodes.InvalidKey:
			toasty.warn('Invalid Key')
			break
		case kdbxweb.Consts.ErrorCodes.FileCorrupt:
			toasty.error('Corrupted File')
			break
		case kdbxweb.Consts.ErrorCodes.Unsupported:
			toasty.error('Unsupported File')
			break
		case kdbxweb.Consts.ErrorCodes.BadSignature:
			toasty.error('Bad Signature')
			break
		case kdbxweb.Consts.ErrorCodes.InvalidVersion:
			toasty.error('Invalid Version')
			break
	}
}

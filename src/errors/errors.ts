import { toasty } from '@/notifications/toast'

export const errorsHandle = (code: string) => {
	switch (code) {
		case ErrorCode.AbortError:
			toasty.info('Operation canceled')
			break
		case ErrorCode.BadSignature:
			toasty.error('Bad Signature')
			break
		case ErrorCode.EntryNotFound:
			toasty.warn('Entry Not Found')
			break
		case ErrorCode.FileCorrupt:
			toasty.error('Corrupted File')
			break
		case ErrorCode.GroupNotFound:
			toasty.warn('Group Not Found')
			break
		case ErrorCode.InvalidArg:
			toasty.warn('Invalid Argument')
			break
		case ErrorCode.InvalidKey:
			toasty.warn('Invalid Key')
			break
		case ErrorCode.InvalidState:
			toasty.error('Invalid State')
			break
		case ErrorCode.InvalidVersion:
			toasty.error('Invalid Version')
			break
		case ErrorCode.MergeError:
			toasty.error('Merge Error')
			break
		case ErrorCode.NotImplemented:
			toasty.error('Not Implemented')
			break
		case ErrorCode.Unsupported:
			toasty.error('Unsupported File')
			break
		default:
			toasty.error('An unknown error occurred')
	}
}

export enum ErrorCode {
	AbortError = 'AbortError',
	BadSignature = 'BadSignature',
	EntryNotFound = 'EntryNotFound',
	FileCorrupt = 'FileCorrupt',
	GroupNotFound = 'GroupNotFound',
	InvalidArg = 'InvalidArg',
	InvalidKey = 'InvalidKey',
	InvalidState = 'InvalidState',
	InvalidVersion = 'InvalidVersion',
	MergeError = 'MergeError',
	NotImplemented = 'NotImplemented',
	Unsupported = 'Unsupported',
}

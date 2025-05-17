import { availableColors } from './constants'

export const getPasswordStrengthInfo = (passwordStrength: number) => {
	if (passwordStrength <= 25) {
		return {
			color: `bg-red-500 ${passwordStrength > 0 ? 'w-25' : 'w-0'}`,
			label: 'Weak',
		}
	}
	if (passwordStrength <= 50) {
		return {
			color: 'bg-orange-500 w-50',
			label: 'Fair',
		}
	}
	if (passwordStrength <= 75) {
		return {
			color: 'bg-yellow-500 w-75',
			label: 'Good',
		}
	}
	return {
		color: 'bg-green-500 w-100',
		label: 'Strong',
	}
}

export const formatDateFromMilliseconds = (milliseconds: number) => {
	const date = new Date(milliseconds)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`
}

export const typedArrayToBuffer = (array: Uint8Array): ArrayBuffer => {
	return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset) as ArrayBuffer
}

export const totalEntries = (groups: Group[]) => {
	return groups.reduce((prev, curr) => {
		return prev + curr.entries.length
	}, 0)
}

export const getAvailableColor = (name: string) => {
	return availableColors[name] ?? { name: '', bg: 'from-slate-500 to-slate-600' }
}

export const containUpperCase = new RegExp(/[A-Z]/)
export const containNumbers = new RegExp(/[0-9]/)
export const containSpecialChars = new RegExp(/[^A-Za-z0-9]/)

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
	const bytes = new Uint8Array(buffer)
	let binary = ''
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i])
	}
	return btoa(binary)
}

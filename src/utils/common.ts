import { availableColors } from './constants'

export const getStrengthColor = (passwordStrength: number) => {
	if (passwordStrength <= 25) return `bg-red-500 ${passwordStrength > 0 ? 'w-25' : 'w-0'}`
	if (passwordStrength <= 50) return 'bg-orange-500 w-50'
	if (passwordStrength <= 75) return 'bg-yellow-500 w-75'
	return 'bg-green-500 w-100'
}

export const getStrengthText = (passwordStrength: number) => {
	if (passwordStrength <= 25) return 'Weak'
	if (passwordStrength <= 50) return 'Fair'
	if (passwordStrength <= 75) return 'Good'
	return 'Strong'
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

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(reader.result as ArrayBuffer)
		reader.onerror = reject
		reader.readAsArrayBuffer(file)
	})
}

export const totalEntries = (groups: Group[]) => {
	return groups.reduce((prev, curr) => {
		return prev + curr.entries.length
	}, 0)
}

export const getAvailableColor = (name: string) => {
	return availableColors[name] ?? { name: '', bg: 'from-slate-500 to-slate-600' }
}

import { containNumbers, containSpecialChars, containUpperCase } from '@/utils/categories'

export const usePasswordStrength = (password: string) => {
	let strength = 0

	if (password.length >= 8) strength += 25
	if (containUpperCase.test(password)) strength += 25
	if (containNumbers.test(password)) strength += 25
	if (containSpecialChars.test(password)) strength += 25

	return strength
}

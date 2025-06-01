const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
const digits = '0123456789'
const minusChar = '-'
const underlineChar = '_'
const spaceChar = ' '
const bracketsChars = '[]{}()<>'
const specialsChars = '!@#$%^&*`/\\?=+:;~|'

export class PassGen {
	public static getPassword(params: PasswordGenParams) {
		const pools: string[] = []

		if (params.upperCase) pools.push(upperCase)
		if (params.lowerCase) pools.push(lowerCase)
		if (params.digits) pools.push(digits)
		if (params.minusChar) pools.push(minusChar)
		if (params.underlineChar) pools.push(underlineChar)
		if (params.spaceChar) pools.push(spaceChar)
		if (params.bracketsChars) pools.push(bracketsChars)
		if (params.specialChars) pools.push(specialsChars)
		if (params.customChars) pools.push(params.customChars)

		if (pools.length === 0) throw new Error('At least one character type must be selected')

		if (params.length < pools.length)
			throw new Error(
				'Password length must be at least equal to the number of selected character types'
			)

		const result: string[] = pools.map((pool) => PassGen._getRandomChar(pool))

		const allChars = pools.join('')
		while (result.length < params.length) {
			result.push(PassGen._getRandomChar(allChars))
		}

		return PassGen._shuffle(result).join('')
	}

	private static _getRandomInt(max: number) {
		return crypto.getRandomValues(new Uint32Array(1))[0] % max
	}

	private static _shuffle(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = PassGen._getRandomInt(i + 1)
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	private static _getRandomChar(chars: string) {
		return chars[PassGen._getRandomInt(chars.length)]
	}
}

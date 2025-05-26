import { useCallback, useEffect, useState } from 'react'

export const useTheme = () => {
	const [currentTheme, setCurrentTheme] = useState<Theme>('warm')

	const applyTheme = useCallback((theme: Theme) => {
		document.documentElement.classList.remove(
			'theme-light',
			'theme-dark',
			'theme-warm',
			'theme-ocean',
			'theme-forest',
			'theme-sunset'
		)

		document.documentElement.classList.add(`theme-${theme}`)

		if (['dark', 'ocean', 'forest'].includes(theme)) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [])

	const changeTheme = useCallback(
		(theme: Theme) => {
			setCurrentTheme(theme)
			applyTheme(theme)
			localStorage.setItem('vault_keeper_theme', theme)
		},
		[applyTheme]
	)

	useEffect(() => {
		if (document.documentElement.classList.contains('theme-light')) setCurrentTheme('light')
		else if (document.documentElement.classList.contains('theme-dark')) setCurrentTheme('dark')
		else if (document.documentElement.classList.contains('theme-warm')) setCurrentTheme('warm')
		else if (document.documentElement.classList.contains('theme-ocean')) setCurrentTheme('ocean')
		else if (document.documentElement.classList.contains('theme-forest')) setCurrentTheme('forest')
		else if (document.documentElement.classList.contains('theme-sunset')) setCurrentTheme('sunset')
	}, [])

	const theme = localStorage.getItem('vault_keeper_theme') as Theme

	useEffect(() => {
		if (theme !== null) {
			changeTheme(theme)
		} else {
			localStorage.setItem('vault_keeper_theme', 'warm')
		}
	}, [theme, changeTheme])

	return {
		currentTheme,
		setCurrentTheme,
		changeTheme,
	}
}

import { useTheme } from '@/hooks/useTheme'
import { themes } from '@/utils/constants'
import { Icon } from '@iconify/react'

export const ThemeSelector: React.FC = () => {
	const { currentTheme, changeTheme } = useTheme()

	const handleThemeSelect = (theme: Theme) => {
		changeTheme(theme)
	}

	return (
		<div className='sm:max-w-[400px] w-full border-0 rounded-xl bg-[var(--theme-modal)] p-8'>
			<div>
				<h3 className='text-2xl font-bold'>Choose Theme</h3>
				<p className='text-[var(--theme-text-muted)] text-sm'>
					Select a theme that matches your style and mood
				</p>
			</div>
			<div className='grid grid-cols-2 md:grid-cols-3 gap-4 pt-6'>
				{themes.map((theme) => (
					<button
						key={theme.id}
						type='button'
						className={`h-auto p-4 flex flex-col items-center gap-3 relative rounded-lg ${
							currentTheme === theme.id ? 'ring-2 ring-[var(--theme-bg-primary)]' : ''
						}`}
						onClick={() => handleThemeSelect(theme.id)}
					>
						<div className={`w-full h-20 rounded-lg ${theme.preview} relative overflow-hidden`}>
							<div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${theme.accent}`} />
							<div
								className={`absolute top-2 right-2 w-8 h-2 rounded-full ${theme.accent} opacity-60`}
							/>
							<div
								className={`absolute bottom-2 left-2 w-12 h-1 rounded-full ${theme.accent} opacity-40`}
							/>
							<div
								className={`absolute bottom-2 right-2 w-6 h-1 rounded-full ${theme.accent} opacity-40`}
							/>
						</div>

						<div className='text-center'>
							<h3 className='font-semibold text-sm'>{theme.name}</h3>
							<p className='text-xs text-theme-text-muted'>{theme.description}</p>
						</div>

						{currentTheme === theme.id && (
							<div className='absolute top-2 right-2 bg-theme-primary rounded-full p-1'>
								<Icon icon='lucide:check' className='h-3 w-3' />
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	)
}

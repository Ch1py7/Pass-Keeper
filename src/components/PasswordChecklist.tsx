import { containNumbers, containSpecialChars, containUpperCase } from '@/utils/categories'
import { cn } from '@/utils/cn'
import { Icon } from '@iconify/react'

interface PasswordChecklistProps {
	masterKey: string
}

const ChecklistItem = ({ passed, label }: { passed: boolean; label: string }) => (
	<p className='flex items-center gap-1'>
		<Icon
			icon={passed ? 'lucide:circle-check' : 'system-uicons:cross'}
			className={cn('h-3 w-3', passed ? 'text-green-500' : 'text-red-500')}
		/>
		{label}
	</p>
)

export const PasswordChecklist: React.FC<PasswordChecklistProps> = ({ masterKey }) => {
	return (
		<div className='text-xs text-slate-500 mt-3 space-y-1'>
			<ChecklistItem passed={masterKey.length >= 8} label='At least 8 characters' />
			<ChecklistItem passed={containUpperCase.test(masterKey)} label='Contains uppercase letters' />
			<ChecklistItem passed={containNumbers.test(masterKey)} label='Contains numbers' />
			<ChecklistItem
				passed={containSpecialChars.test(masterKey)}
				label='Contains special characters'
			/>
		</div>
	)
}

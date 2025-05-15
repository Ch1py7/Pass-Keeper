import { Checklist } from './Checklist'

interface MasterKeyChecklistProps {
	masterKey: string
	passwordStrength: number
	label: string
	color: string
}

export const MasterKeyChecklist: React.FC<MasterKeyChecklistProps> = ({
	masterKey,
	passwordStrength,
	label,
	color,
}) => {
	return (
		<div className='space-y-1 mt-2'>
			<div className='flex justify-between items-center'>
				<span className='text-xs text-slate-500'>Password Strength</span>
				<span
					className={`text-xs font-medium ${
						passwordStrength <= 25
							? 'text-red-500'
							: passwordStrength <= 50
								? 'text-orange-500'
								: passwordStrength <= 75
									? 'text-yellow-500'
									: 'text-green-500'
					}`}
				>
					{label}
				</span>
			</div>
			<div className='h-1 bg-slate-300'>
				<div className={`h-1 ${color}`} />
			</div>

			<div className='text-xs text-slate-500 mt-3 space-y-1'>
				<Checklist masterKey={masterKey} />
			</div>
		</div>
	)
}

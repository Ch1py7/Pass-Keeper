import { Button } from '@/components/common/Button'
import { toasty } from '@/notifications'
import { samplePasswordParams } from '@/utils/constants'
import { PassGen } from '@/utils/passGen'
import { useState } from 'react'

interface PasswordGeneratorProps {
	onHandleChange: (key: string, value: string) => void
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onHandleChange }) => {
	const [passParams, setPassParams] = useState<PasswordGenParams>(samplePasswordParams)

	const getPassword = () => {
    try {
      const password = PassGen.getPassword({ ...passParams })
      onHandleChange('password', password)
      toasty.success('Password generated')
    } catch (err) {
      if (err instanceof Error) {
        toasty.warn(err.message)
      }
    }
	}

	return (
		<div className='sm:max-w-[400px] w-full ml-10 border-0 rounded-xl bg-[var(--theme-modal)] p-8 space-y-3 relative'>
			<div>
				<p className='text-2xl font-bold'>Generate Password</p>
				<p className='text-[var(--theme-text-muted)] text-sm'>
					Create a secure password with your preferred character types
				</p>
			</div>
			<div className='grid grid-cols-2 place-items-start gap-x-6 gap-y-1'>
				<label className='w-full col-span-2 flex flex-col'>
					Password Length
					<input
						placeholder='Custom Characters'
						onChange={(e) => {
							const numericValue = e.target.value.replace(/\D/g, '')
							setPassParams((p) => ({ ...p, length: Number(numericValue) }))
						}}
						value={passParams.length}
						className='h-10 px-3 bg-[var(--theme-action)] rounded-lg w-full border'
					/>
				</label>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, upperCase: !p.upperCase }))}
							checked={passParams.upperCase}
							type='checkbox'
						/>
						Uppercase
					</label>
					<span>(A-Z)</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, lowerCase: !p.lowerCase }))}
							checked={passParams.lowerCase}
							type='checkbox'
						/>
						Lowercase
					</label>
					<span>(a-z)</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, digits: !p.digits }))}
							checked={passParams.digits}
							type='checkbox'
						/>
						Digits
					</label>
					<span>(0-9)</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, minusChar: !p.minusChar }))}
							checked={passParams.minusChar}
							type='checkbox'
						/>
						Minus
					</label>
					<span>(-)</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, underlineChar: !p.underlineChar }))}
							checked={passParams.underlineChar}
							type='checkbox'
						/>
						Underline
					</label>
					<span>(_)</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, spaceChar: !p.spaceChar }))}
							checked={passParams.spaceChar}
							type='checkbox'
						/>
						Space
					</label>
					<span>( )</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, bracketsChars: !p.bracketsChars }))}
							checked={passParams.bracketsChars}
							type='checkbox'
						/>
						Brackets
					</label>
					<span>(()[])</span>
				</div>
				<div className='flex items-center justify-between w-full'>
					<label className='flex gap-2'>
						<input
							onChange={() => setPassParams((p) => ({ ...p, specialChars: !p.specialChars }))}
							checked={passParams.specialChars}
							type='checkbox'
						/>
						Special
					</label>
					<span>(!@#$)</span>
				</div>
				<label className='w-full col-span-2 flex flex-col'>
					Custom Characters
					<input
						placeholder='Custom Characters'
						onChange={(e) => setPassParams((p) => ({ ...p, customChars: e.target.value }))}
						value={passParams.customChars}
						className='h-10 px-3 bg-[var(--theme-action)] rounded-lg w-full border'
					/>
				</label>
			</div>
			<Button
				fullWidth
				content='Generate'
				onClick={getPassword}
				iconLeftStyles='text-white'
				styles='justify-center text-white btn-primary mt-6'
			/>
		</div>
	)
}

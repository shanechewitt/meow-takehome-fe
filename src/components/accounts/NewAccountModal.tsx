import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (accountData: { name: string; initialAmount: number }) => void;
}

const NewAccountModal: React.FC<NewAccountModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [accountName, setAccountName] = useState('');
	const [initialAmount, setInitialAmount] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			name: accountName,
			initialAmount: parseFloat(initialAmount) || 0,
		});
		setAccountName('');
		setInitialAmount('');
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 ml-64 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white rounded-lg w-full max-w-md p-6'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold text-gray-900'>
						Open New Account
					</h2>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-gray-500'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className='space-y-4'>
						<div>
							<label
								htmlFor='accountName'
								className='block text-sm font-medium text-gray-700 mb-2'
							>
								Account Name
							</label>
							<input
								id='accountName'
								type='text'
								value={accountName}
								onChange={(e) => setAccountName(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
								placeholder='Enter account name'
								required
							/>
						</div>

						<div>
							<label
								htmlFor='initialAmount'
								className='block text-sm font-medium text-gray-700 mb-2'
							>
								Initial Amount
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<span className='text-gray-500'>$</span>
								</div>
								<input
									id='initialAmount'
									type='number'
									min='0'
									step='0.01'
									value={initialAmount}
									onChange={(e) => setInitialAmount(e.target.value)}
									className='w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
									placeholder='0.00'
									required
								/>
							</div>
						</div>
					</div>

					<div className='flex justify-end gap-3 mt-6'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
						>
							Open Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewAccountModal;

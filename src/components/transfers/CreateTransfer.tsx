'use client';

import React, { useState } from 'react';

const mockCustomers = [
	{
		id: '1',
		name: 'Shane Hewitt',
		accounts: [
			{
				id: '1',
				name: 'Business 1',
				accountNumber: '****1234',
				routingNumber: '****5678',
			},
			{
				id: '2',
				name: 'Business 2',
				accountNumber: '****5678',
				routingNumber: '****1234',
			},
		],
	},
	{
		id: '2',
		name: 'Jane Smith',
		accounts: [
			{
				id: '3',
				name: 'Business 1',
				accountNumber: '****9012',
				routingNumber: '****3456',
			},
		],
	},
];

const CreateTransfer: React.FC = () => {
	const [fromAccountNumber, setFromAccountNumber] = useState('');
	const [fromRoutingNumber, setFromRoutingNumber] = useState('');
	const [toAccountNumber, setToAccountNumber] = useState('');
	const [toRoutingNumber, setToRoutingNumber] = useState('');
	const [amount, setAmount] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({
			fromAccountNumber,
			fromRoutingNumber,
			toAccountNumber,
			toRoutingNumber,
			amount,
		});
	};

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='p-8'>
				<div className='mb-8'>
					<h2 className='text-2xl font-semibold text-gray-900'>
						Create Transfer
					</h2>
				</div>

				<div className='bg-white rounded-lg shadow'>
					<form
						onSubmit={handleSubmit}
						className='p-6 space-y-8'
					>
						<div className='grid grid-cols-2 gap-8'>
							<div className='space-y-6'>
								<h3 className='text-lg font-medium text-gray-900'>Sender</h3>
								<div className='space-y-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Account Number
										</label>
										<input
											type='text'
											value={fromAccountNumber}
											onChange={(e) => setFromAccountNumber(e.target.value)}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
											placeholder='Enter account number'
											required
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Routing Number
										</label>
										<input
											type='text'
											value={fromRoutingNumber}
											onChange={(e) => setFromRoutingNumber(e.target.value)}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
											placeholder='Enter routing number'
											required
										/>
									</div>
								</div>
							</div>

							<div className='space-y-6'>
								<h3 className='text-lg font-medium text-gray-900'>Receiver</h3>
								<div className='space-y-4'>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Account Number
										</label>
										<input
											type='text'
											value={toAccountNumber}
											onChange={(e) => setToAccountNumber(e.target.value)}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
											placeholder='Enter account number'
											required
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Routing Number
										</label>
										<input
											type='text'
											value={toRoutingNumber}
											onChange={(e) => setToRoutingNumber(e.target.value)}
											className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
											placeholder='Enter routing number'
											required
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-6 border-t border-gray-200'>
							<div className='max-w-md'>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Amount
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<span className='text-gray-500'>$</span>
									</div>
									<input
										type='number'
										min='0'
										step='0.01'
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										className='w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
										placeholder='0.00'
										required
									/>
								</div>
							</div>
						</div>

						<div className='flex justify-end pt-6 border-t border-gray-200'>
							<button
								type='submit'
								className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
							>
								Create Transfer
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateTransfer;

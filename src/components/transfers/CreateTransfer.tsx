'use client';

import { TransferService } from '@/services/transfer-service';
import { TransferCreate } from '@/types/transfers';
import React, { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const CreateTransfer: React.FC = () => {
	const [fromAccountNumber, setFromAccountNumber] = useState('');
	const [fromRoutingNumber, setFromRoutingNumber] = useState('');
	const [toAccountNumber, setToAccountNumber] = useState('');
	const [toRoutingNumber, setToRoutingNumber] = useState('');
	const [amount, setAmount] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		setIsSuccess(false);

		try {
			const transferData: TransferCreate = {
				sending_account_number: fromAccountNumber,
				sending_routing_number: fromRoutingNumber,
				receiving_account_number: toAccountNumber,
				receiving_routing_number: toRoutingNumber,
				transfer_amount: parseFloat(amount),
			};

			await TransferService.createTransfer(transferData);

			setIsSuccess(true);

			setFromAccountNumber('');
			setFromRoutingNumber('');
			setToAccountNumber('');
			setToRoutingNumber('');
			setAmount('');
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to create transfer'
			);
		} finally {
			setIsLoading(false);
		}
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
								disabled={isLoading}
								className={`px-4 py-2 rounded-md text-white ${
									isLoading
										? 'bg-blue-400 cursor-not-allowed'
										: 'bg-blue-600 hover:bg-blue-700'
								}`}
							>
								{isLoading ? <LoadingSpinner /> : 'Create Transfer'}
							</button>
						</div>
					</form>
				</div>

				{error && (
					<div className='mb-8 p-4 bg-red-50 border border-red-200 rounded-md'>
						<p className='text-red-600'>{error}</p>
					</div>
				)}
				{isSuccess && (
					<div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-md'>
						<p className='text-green-600'>Transfer created successfully!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateTransfer;

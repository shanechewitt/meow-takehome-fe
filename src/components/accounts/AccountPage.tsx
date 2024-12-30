import React from 'react';
import TransferHistoryList from '../transfers/TransferHistoryList';

const mockAccountData = {
	id: '1',
	name: 'Business 1',
	balance: 1000000,
	accountNumber: '****1234',
	routingNumber: '****5678',
	transferHistory: [
		{
			id: '1',
			amount: 10000,
			fromAccount: '****1234',
			toAccount: '****5678',
			description: 'Business Transfer',
			status: 'Failed',
			date: '2024-03-30',
		},
		{
			id: '2',
			amount: 5000,
			fromAccount: '****5678',
			toAccount: '****1234',
			description: 'Monthly Transfer',
			status: 'Success',
			date: '2024-03-29',
		},
	],
};

const BankAccount: React.FC = () => {
	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='p-8'>
				<div className='mb-8'>
					<h2 className='text-2xl font-semibold text-gray-900'>
						{mockAccountData.name}
					</h2>
					<div className='mt-2 text-sm text-gray-500'>
						<span className='mr-4'>
							Account Number: {mockAccountData.accountNumber}
						</span>
						<span>Routing Number: {mockAccountData.routingNumber}</span>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='bg-white rounded-lg shadow p-6'>
						<div className='text-3xl font-semibold text-gray-900'>
							${mockAccountData.balance.toLocaleString()}
						</div>
						<div className='mt-4 flex gap-3'>
							<button className='px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700'>
								Transfer into this account
							</button>
							<button className='px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700'>
								Transfer from this account
							</button>
						</div>
					</div>

					<TransferHistoryList
						transfers={mockAccountData.transferHistory as []}
					/>
				</div>
			</div>
		</div>
	);
};

export default BankAccount;

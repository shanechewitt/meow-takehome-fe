'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import NewAccountModal from '../accounts/NewAccountModal';

const mockCustomerData = {
	id: '1',
	name: 'Shane Hewitt',
	accounts: [
		{
			id: '1',
			name: 'Business 1',
			balance: 1000000,
			accountNumber: '****1234',
			routingNumber: '****5678',
		},
		{
			id: '2',
			name: 'Business 1',
			balance: 1000000,
			accountNumber: '****5678',
			routingNumber: '****1234',
		},
		{
			id: '3',
			name: 'Business 1',
			balance: 1000000,
			accountNumber: '****9012',
			routingNumber: '****3456',
		},
		{
			id: '4',
			name: 'Business 1',
			balance: 1000000,
			accountNumber: '****3456',
			routingNumber: '****9012',
		},
	],
};

const CustomerProfile: React.FC = () => {
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='p-8'>
				<div className='mb-8'>
					<h2 className='text-2xl font-semibold text-gray-900'>
						{mockCustomerData.name}
					</h2>
				</div>

				<div className='space-y-6'>
					<div className='bg-white rounded-lg shadow'>
						<div className='px-6 py-4 border-b border-gray-200'>
							<div className='flex justify-between items-center'>
								<h3 className='text-lg font-medium text-gray-900'>
									Bank Accounts
								</h3>
								<button
									onClick={() => setIsNewAccountModalOpen(true)}
									className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700'
								>
									<Plus className='h-5 w-5' />
									Open New Account
								</button>
							</div>
						</div>

						<div className='divide-y divide-gray-200'>
							{mockCustomerData.accounts.map((account) => (
								<div
									key={account.id}
									className='p-6'
								>
									<div className='flex justify-between items-center'>
										<div>
											<h4 className='text-lg font-medium text-gray-900'>
												{account.name}
											</h4>
											<dl className='mt-2 text-sm text-gray-500'>
												<div className='flex gap-4'>
													<div>
														<dt className='inline'>Account Number: </dt>
														<dd className='inline'>{account.accountNumber}</dd>
													</div>
													<div>
														<dt className='inline'>Routing Number: </dt>
														<dd className='inline'>{account.routingNumber}</dd>
													</div>
												</div>
											</dl>
										</div>

										<div className='text-right'>
											<div className='text-2xl font-semibold text-gray-900'>
												${account.balance.toLocaleString()}
											</div>
											<div className='mt-2 flex gap-2 justify-end'>
												<button className='px-3 py-1 text-sm text-blue-600 hover:text-blue-700'>
													Transfer into this account
												</button>
												<button className='px-3 py-1 text-sm text-blue-600 hover:text-blue-700'>
													Transfer from this account
												</button>
												<Link
													href={`/accounts/${account.id}`}
													className='px-3 py-1 text-sm text-blue-600 hover:text-blue-700'
												>
													View Account
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<NewAccountModal
				isOpen={isNewAccountModalOpen}
				onClose={() => setIsNewAccountModalOpen(false)}
				onSubmit={(accountData) => {
					console.log('Creating account:', accountData);
					setIsNewAccountModalOpen(false);
				}}
			/>
		</div>
	);
};

export default CustomerProfile;

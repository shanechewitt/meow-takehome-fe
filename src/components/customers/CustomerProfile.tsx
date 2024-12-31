'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import NewAccountModal from '../accounts/NewAccountModal';
import { AccountCreate, AccountInfo } from '@/types/accounts';
import { AccountService } from '@/services/account-service';
import { CustomerService } from '@/services/customer-service';
import BankAccountListItem from '../accounts/AccountListItem';

const CustomerProfile: React.FC<{ customerId: number }> = ({ customerId }) => {
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [customerInfo, setCustomerInfo] = useState({ name: '' });
	const [accounts, setAccounts] = useState<AccountInfo[]>([]);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleCreateAccount = async (accountData: {
		name: string;
		initialAmount: number;
	}) => {
		try {
			setIsLoading(true);
			const accountCreate: AccountCreate = {
				customer_id: customerId,
				name: accountData.name,
				initial_amount: accountData.initialAmount,
			};
			await AccountService.create(accountCreate);
			await fetchAccounts();
		} catch (error) {
			setError(
				error instanceof Error ? error.message : 'Failed to create customer'
			);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchAccounts = async () => {
		try {
			setIsLoading(true);
			const accountsData = await AccountService.getAccounts(customerId);
			setAccounts(accountsData);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load accounts');
		} finally {
			setIsLoading(false);
		}
	};

	const fetchCustomerData = async () => {
		try {
			setIsLoading(true);

			// First API call
			const customerData = await CustomerService.get(customerId);
			setCustomerInfo(customerData);

			await fetchAccounts();
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to load customer data'
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCustomerData();
	}, [customerId]);

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='p-8'>
				<div className='mb-8'>
					<h2 className='text-2xl font-semibold text-gray-900'>
						{customerInfo.name}
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
							{accounts.map((account) => (
								<BankAccountListItem
									key={account.id}
									account={account}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<NewAccountModal
				isOpen={isNewAccountModalOpen}
				onClose={() => setIsNewAccountModalOpen(false)}
				onSubmit={handleCreateAccount}
			/>
		</div>
	);
};

export default CustomerProfile;

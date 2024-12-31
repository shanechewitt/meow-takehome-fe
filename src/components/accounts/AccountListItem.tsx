import { AccountService } from '@/services/account-service';
import { AccountInfo } from '@/types/accounts';
import Link from 'next/link';
import { useState } from 'react';

const BankAccountListItem: React.FC<{ account: AccountInfo }> = ({
	account,
}) => {
	const [balance, setBalance] = useState<string>('');

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchBalance = async () => {
		try {
			setIsLoading(true);
			const balanceData = await AccountService.getBalance(
				account.account_number,
				account.routing_number
			);
			setBalance(balanceData);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load balance');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='p-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h4 className='text-lg font-medium text-gray-900'>{account.name}</h4>
					<dl className='mt-2 text-sm text-gray-500'>
						<div className='flex gap-4'>
							<div>
								<dt className='inline'>Account Number: </dt>
								<dd className='inline'>{account.account_number}</dd>
							</div>
							<div>
								<dt className='inline'>Routing Number: </dt>
								<dd className='inline'>{account.routing_number}</dd>
							</div>
						</div>
					</dl>
				</div>

				<div className='text-right'>
					<div className='text-2xl font-semibold text-gray-900'>
						{isLoading ? (
							<span>Loading...</span>
						) : balance ? (
							<div className='flex items-center gap-2'>
								<span>${balance}</span>
								<button
									onClick={fetchBalance}
									className='text-sm text-blue-600 hover:text-blue-700'
								>
									↻ Refresh
								</button>
							</div>
						) : (
							<button
								onClick={fetchBalance}
								className='text-blue-600 hover:text-blue-700'
							>
								View Balance
							</button>
						)}
					</div>
					{error && <div className='text-sm text-red-600'>{error}</div>}
					<div className='mt-2 flex gap-2 justify-end'>
						<Link
							href={`/accounts/${account.id}`}
							className='px-3 py-1 text-sm text-blue-600 hover:text-blue-700'
						>
							View Transfer History
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BankAccountListItem;

'use client';

import React, { useEffect, useState } from 'react';
import TransferHistoryList from '../transfers/TransferHistoryList';
import { TransferListItem } from '@/types/transfers';
import { TransferService } from '@/services/transfer-service';

const BankAccount: React.FC<{ params: { accountNumber: string } }> = ({
	params,
}) => {
	const [transfers, setTransfers] = useState<TransferListItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchTransferHistory = async () => {
		try {
			setIsLoading(true);
			const history = await TransferService.getTransferHistory(
				params.accountNumber
			);
			setTransfers(history);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to load transfer history'
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTransferHistory();
	}, [params.accountNumber]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='p-8'>
				<div className='space-y-6'>
					<TransferHistoryList transfers={transfers} />
				</div>
			</div>
		</div>
	);
};

export default BankAccount;

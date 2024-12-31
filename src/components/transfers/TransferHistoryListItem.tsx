import { TransferListItem } from '@/types/transfers';
import React from 'react';

const TransferHistoryListItem: React.FC<{ transfer: TransferListItem }> = ({
	transfer,
}) => {
	const formatAmount = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	};

	return (
		<tr>
			<td className='py-3'>Date</td>
			<td className='py-3'>{formatAmount(transfer.transfer_amount)}</td>
			<td className='py-3'>{transfer.sending_account_number}</td>
			<td className='py-3'>{transfer.receiving_account_number}</td>
			<td className='py-3'>Description</td>
			<td
				className={`py-3 ${
					transfer.status.includes('Failed') ? 'text-red-600' : 'text-green-600'
				}`}
			>
				{transfer.status}
			</td>
		</tr>
	);
};

export default TransferHistoryListItem;

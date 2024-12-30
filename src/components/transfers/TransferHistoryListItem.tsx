import React from 'react';

interface Transfer {
	id: string;
	date: string;
	amount: number;
	fromAccount: string;
	toAccount: string;
	description: string;
	status: 'Failed' | 'Success';
}

interface TransferHistoryListItemProps {
	transfer: Transfer;
}

const TransferHistoryListItem: React.FC<TransferHistoryListItemProps> = ({
	transfer,
}) => {
	return (
		<tr>
			<td className='py-3'>{transfer.date}</td>
			<td className='py-3'>${transfer.amount.toLocaleString()}</td>
			<td className='py-3'>{transfer.fromAccount}</td>
			<td className='py-3'>{transfer.toAccount}</td>
			<td className='py-3'>{transfer.description}</td>
			<td
				className={`py-3 ${
					transfer.status === 'Failed' ? 'text-red-600' : 'text-green-600'
				}`}
			>
				{transfer.status}
			</td>
		</tr>
	);
};

export default TransferHistoryListItem;

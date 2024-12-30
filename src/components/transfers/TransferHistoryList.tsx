import React from 'react';
import TransferHistoryListItem from './TransferHistoryListItem';

interface Transfer {
	id: string;
	date: string;
	amount: number;
	fromAccount: string;
	toAccount: string;
	description: string;
	status: 'Failed' | 'Success';
}

interface TransferHistoryListProps {
	transfers: Transfer[];
}

const TransferHistoryList: React.FC<TransferHistoryListProps> = ({
	transfers,
}) => {
	return (
		<div className='bg-white rounded-lg shadow'>
			<div className='px-6 py-4 border-b border-gray-200'>
				<h3 className='text-lg font-medium text-gray-900'>Transfer History</h3>
			</div>
			<div className='p-6'>
				<table className='w-full'>
					<thead>
						<tr className='text-left text-sm font-medium text-gray-500'>
							<th className='pb-3'>Date</th>
							<th className='pb-3'>Amount</th>
							<th className='pb-3'>From Account</th>
							<th className='pb-3'>To Account</th>
							<th className='pb-3'>Description</th>
							<th className='pb-3'>Status</th>
						</tr>
					</thead>
					<tbody className='text-sm text-gray-900 divide-y divide-gray-200'>
						{transfers.map((transfer) => (
							<TransferHistoryListItem
								key={transfer.id}
								transfer={transfer}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TransferHistoryList;

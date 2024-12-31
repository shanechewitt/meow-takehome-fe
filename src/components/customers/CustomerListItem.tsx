import React from 'react';
import Link from 'next/link';

interface CustomerListItemProps {
	customer: {
		id: string;
		name: string;
	};
}

const CustomerListItem: React.FC<CustomerListItemProps> = ({ customer }) => {
	return (
		<div className='flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50'>
			<div className='flex-1'>
				<h3 className='text-lg font-medium text-gray-900'>{customer.name}</h3>
			</div>
			<div className='flex items-center gap-8'>
				<Link
					href={`/customers/${customer.id}`}
					className='w-32 text-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md'
				>
					View Profile
				</Link>
			</div>
		</div>
	);
};

export default CustomerListItem;

'use client';

import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CustomerCreateModal from './CreateCustomerModal';
import { CustomerService } from '@/services/customer-service';
import { Customer } from '@/types/customers';
import CustomerListItem from './CustomerListItem';

const CustomerList: React.FC = () => {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [customers, setCustomers] = useState<Customer[]>([]);

	const handleCreateCustomer = (customerData: { name: string }) => {
		// const newCustomer = {
		// 	id: (customers.length + 1).toString(),
		// 	name: customerData.name,
		// };
		// setCustomers([...customers, newCustomer]);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await CustomerService.getCustomerList();
			setCustomers(response);
		};

		fetchData();
	}, []);

	return (
		<div className='px-8 py-16'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-semibold text-gray-900 py-2'>
					Customer List
				</h2>
				<button
					className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
					onClick={() => setIsCreateModalOpen(true)}
				>
					<PlusCircle className='h-5 w-5' />
					Create New Customer
				</button>
			</div>

			<div className='bg-white rounded-lg shadow'>
				<div className='px-4 py-3 border-b border-gray-200 bg-gray-50'>
					<div className='flex justify-between text-sm font-medium text-gray-500'>
						<div>Customer Name</div>
						<div className='flex gap-8'>
							<div className='w-32'></div>
						</div>
					</div>
				</div>

				<div className='divide-y divide-gray-200'>
					{customers.map((customer) => (
						<CustomerListItem
							key={customer.id}
							customer={customer}
						/>
					))}
				</div>
			</div>

			<CustomerCreateModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSubmit={handleCreateCustomer}
			/>
		</div>
	);
};

export default CustomerList;

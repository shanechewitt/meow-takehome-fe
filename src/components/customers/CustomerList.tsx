'use client';

import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CustomerCreateModal from './CreateCustomerModal';
import { CustomerService } from '@/services/customer-service';
import { Customer } from '@/types/customers';
import CustomerListItem from './CustomerListItem';
import LoadingSpinner from '../common/LoadingSpinner';

const CustomerList: React.FC = () => {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [customers, setCustomers] = useState<Customer[]>([]);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleCreateCustomer = async (customerData: { name: string }) => {
		try {
			setIsLoading(true);
			await CustomerService.create(customerData);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to create customer'
			);
		} finally {
			setIsLoading(false);
			fetchData();
		}
	};

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await CustomerService.getCustomerList();
			setCustomers(response);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to get customer list'
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='px-8 py-16'>
			{isLoading && <LoadingSpinner />}
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

			{error && (
				<div className='mb-8 p-4 bg-red-50 border border-red-200 rounded-md'>
					<p className='text-red-600'>{error}</p>
				</div>
			)}

			<CustomerCreateModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSubmit={handleCreateCustomer}
			/>
		</div>
	);
};

export default CustomerList;

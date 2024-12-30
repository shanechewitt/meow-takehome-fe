import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CustomerCreateModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (customerData: { name: string }) => void;
}

const CustomerCreateModal: React.FC<CustomerCreateModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [customerName, setCustomerName] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ name: customerName });
		setCustomerName('');
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 mt-0 ml-64 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white rounded-lg w-full max-w-md p-6'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold text-gray-900'>
						Create New Customer
					</h2>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-gray-500'
					>
						<X className='h-5 w-5' />
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className='mb-6'>
						<label
							htmlFor='customerName'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Customer Name
						</label>
						<input
							id='customerName'
							type='text'
							value={customerName}
							onChange={(e) => setCustomerName(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900'
							placeholder='Enter customer name'
							required
						/>
					</div>

					<div className='flex justify-end gap-3'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
						>
							Create Customer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CustomerCreateModal;

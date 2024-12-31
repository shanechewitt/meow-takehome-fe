import { Customer } from '@/types/customers';

const API_URL = 'http://localhost:8000/api';

export class CustomerService {
	static async getCustomerList(): Promise<Customer[]> {
		try {
			const response = await fetch(`${API_URL}/customers/customer-list`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to get customer list');
			}

			return await response.json();
		} catch (error) {
			console.error('Error fetching customer list: ', error);
			throw error;
		}
	}
}

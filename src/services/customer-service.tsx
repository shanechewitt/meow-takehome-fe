import { Customer, CustomerInfo } from '@/types/customers';

const API_URL =
	process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'production'
		? process.env.NEXT_PUBLIC_PRODUCTION_API
		: process.env.NEXT_PUBLIC_DEVELOPMENT_API;

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
				const errorResponse = await response.json();
				throw new Error(errorResponse.detail || 'Failed to get customer list');
			}

			return await response.json();
		} catch (error) {
			console.error('Error fetching customer list: ', error);
			throw error;
		}
	}

	static async create(customerData: { name: string }): Promise<Customer> {
		try {
			const response = await fetch(`${API_URL}/customers/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(customerData),
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				throw new Error(errorResponse.detail || 'Failed to create customer');
			}

			return await response.json();
		} catch (error) {
			console.error('Error creating customer: ', error);
			throw error;
		}
	}

	static async get(customerId: number): Promise<CustomerInfo> {
		try {
			const response = await fetch(`${API_URL}/customers/info/${customerId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				throw new Error(errorResponse.detail || 'Failed to get customer info');
			}

			return await response.json();
		} catch (error) {
			console.error('Error getting customer info: ', error);
			throw error;
		}
	}
}

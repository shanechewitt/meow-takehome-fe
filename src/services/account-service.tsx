import { AccountInfo, AccountCreate } from '@/types/accounts';

const API_URL = 'http://localhost:8000/api';

export class AccountService {
	static async create(accountData: AccountCreate): Promise<AccountInfo> {
		try {
			const response = await fetch(`${API_URL}/accounts/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(accountData),
			});

			if (!response.ok) {
				throw new Error('Failed to create account');
			}

			return await response.json();
		} catch (error) {
			console.error('Error creating account: ', error);
			throw error;
		}
	}

	static async getAccounts(customer_id: number): Promise<AccountInfo[]> {
		try {
			const response = await fetch(
				`${API_URL}/accounts/accounts-list/${customer_id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to get accounts');
			}

			return await response.json();
		} catch (error) {
			console.error('Error getting account list: ', error);
			throw error;
		}
	}

	static async getBalance(
		account_number: string,
		routing_number: string
	): Promise<number> {
		try {
			const response = await fetch(
				`${API_URL}/accounts/get-balance/${account_number}?routing_number=${routing_number}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to get account balance');
			}

			return await response.json();
		} catch (error) {
			console.error('Error getting account balance: ', error);
			throw error;
		}
	}
}

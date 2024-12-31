import { TransferCreate, TransferListItem } from '@/types/transfers';

const API_URL = 'http://localhost:8000/api';

export class TransferService {
	static async createTransfer(transferData: TransferCreate): Promise<string> {
		try {
			const response = await fetch(`${API_URL}/transfers/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(transferData),
			});

			if (!response.ok) {
				throw new Error('Failed to create transfer');
			}

			return await response.text();
		} catch (error) {
			console.error('Error creating transfer:', error);
			throw error;
		}
	}

	static async getTransferHistory(
		account_number: string
	): Promise<TransferListItem[]> {
		try {
			const response = await fetch(
				`${API_URL}/transfers/transfer-history/${account_number}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch transfer history');
			}

			return await response.json();
		} catch (error) {
			console.error('Error fetching transfer history:', error);
			throw error;
		}
	}
}

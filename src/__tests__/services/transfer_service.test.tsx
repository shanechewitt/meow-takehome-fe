import { TransferService } from '@/services/transfer-service';
import { TransferCreate } from '@/types/transfers';

global.fetch = jest.fn();

const API_URL =
	process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'production'
		? process.env.NEXT_PUBLIC_PRODUCTION_API
		: process.env.NEXT_PUBLIC_DEVELOPMENT_API;

describe('TransferService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('createTransfer', () => {
		const mockTransferData: TransferCreate = {
			sending_account_number: '111111111111',
			sending_routing_number: '999999999',
			receiving_account_number: '222222222222',
			receiving_routing_number: '999999999',
			transfer_amount: 100.05,
		};

		it('should create transfer successfully', async () => {
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				text: () => Promise.resolve('Transfer created successfully'),
			});

			const result = await TransferService.createTransfer(mockTransferData);

			expect(fetch).toHaveBeenCalledWith(`${API_URL}/transfers/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mockTransferData),
			});

			expect(result).toBe('Transfer created successfully');
		});

		it('should handle API error', async () => {
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(
				TransferService.createTransfer(mockTransferData)
			).rejects.toThrow('Failed to create transfer');
		});
	});
	describe('getTransferHistory', () => {
		const mockAccountNumber = '111111111111';
		const mockTransferHistory = [
			{
				id: 1,
				sending_account_number: '111111111111',
				receiving_account_number: '222222222222',
				amount: 100.0,
				status: 'Success',
			},
		];

		it('should fetch transfer history successfully', async () => {
			// Mock successful response
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockTransferHistory),
			});

			const result = await TransferService.getTransferHistory(
				mockAccountNumber
			);

			// Verify fetch was called correctly
			expect(fetch).toHaveBeenCalledWith(
				`${API_URL}/transfers/transfer-history/${mockAccountNumber}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			expect(result).toEqual(mockTransferHistory);
		});

		it('should handle API error', async () => {
			// Mock failed response
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(
				TransferService.getTransferHistory(mockAccountNumber)
			).rejects.toThrow('Failed to fetch transfer history');
		});
	});
});

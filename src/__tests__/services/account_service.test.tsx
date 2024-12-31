import { AccountService } from '@/services/account-service';

global.fetch = jest.fn();

const API_URL =
	process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'production'
		? process.env.NEXT_PUBLIC_PRODUCTION_API
		: process.env.NEXT_PUBLIC_DEVELOPMENT_API;

describe('AccountService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should create account', async () => {
			// Arrange
			const mockRequest = {
				name: 'Test Account',
				customer_id: 1,
				initial_amount: 100.07,
			};
			const mockAccount = {
				id: 1,
				name: 'Test Account',
				customer_id: 1,
				balance: 100.07,
				account_number: '111111111111',
				routing_number: '999999999',
			};
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockAccount),
			});
			// Act
			const result = await AccountService.create(mockRequest);
			// Assert
			expect(fetch).toHaveBeenCalledWith(`${API_URL}/accounts/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mockRequest),
			});
			expect(result).toEqual(mockAccount);
		});
		it('should handle API error', async () => {
			// Arrange
			const mockRequest = {
				name: 'Test Account',
				customer_id: 1,
				initial_amount: 100.07,
			};
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});
			// Act, Assert
			await expect(AccountService.create(mockRequest)).rejects.toThrow(
				'Failed to create account'
			);
		});
	});
	describe('getAccounts', () => {
		it('should get accounts list', async () => {
			// Arrange
			const mockCustomerId = 1;
			const mockAccountsList = [
				{
					id: 1,
					name: 'Test Account 1',
					account_number: '111111111111',
					routing_number: '999999999',
				},
				{
					id: 2,
					name: 'Test Account 2',
					account_number: '222222222222',
					routing_number: '999999999',
				},
				{
					customer_id: 3,
					name: 'Test Account 3',
					account_number: '333333333333',
					routing_number: '999999999',
				},
			];
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockAccountsList),
			});
			// Act
			const result = await AccountService.getAccounts(mockCustomerId);
			// Assert
			expect(fetch).toHaveBeenCalledWith(
				`${API_URL}/accounts/accounts-list/${mockCustomerId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			expect(result).toEqual(mockAccountsList);
		});
		it('should handle API error', async () => {
			// Arrange
			const mockCustomerId = 1;
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});
			// Act, Assert
			await expect(AccountService.getAccounts(mockCustomerId)).rejects.toThrow(
				'Failed to get accounts'
			);
		});
	});
	describe('getBalance', () => {
		it('should get account balance', async () => {
			// Arrange
			const mockAccountNumber = '111111111111';
			const mockRoutingNumber = '999999999';
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(100.05),
			});
			// Act
			const result = await AccountService.getBalance(
				mockAccountNumber,
				mockRoutingNumber
			);
			// Assert
			expect(fetch).toHaveBeenCalledWith(
				`${API_URL}/accounts/get-balance/${mockAccountNumber}?routing_number=${mockRoutingNumber}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			expect(result).toEqual(100.05);
		});
		it('should handle API error', async () => {
			// Arrange
			const mockAccountNumber = '111111111111';
			const mockRoutingNumber = '999999999';
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});
			// Act, Assert
			await expect(
				AccountService.getBalance(mockAccountNumber, mockRoutingNumber)
			).rejects.toThrow('Failed to get account balance');
		});
	});
});

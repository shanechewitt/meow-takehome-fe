import { CustomerService } from '@/services/customer-service';

global.fetch = jest.fn();

describe('CustomerService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('getCustomerList', () => {
		const mockCustomerList = [
			{
				name: 'Test User 1',
				id: '1',
			},
			{
				name: 'Test User 2',
				id: '2',
			},
		];
		it('should get customer list', async () => {
			// Arrange
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockCustomerList),
			});

			// Act
			const result = await CustomerService.getCustomerList();

			// Assert
			expect(fetch).toHaveBeenCalledWith(
				`http://localhost:8000/api/customers/customer-list`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			expect(result).toEqual(mockCustomerList);
		});

		it('should handle API error', async () => {
			// Arrange
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});
			// Act, Assert
			await expect(CustomerService.getCustomerList()).rejects.toThrow(
				'Failed to get customer list'
			);
		});
	});
});
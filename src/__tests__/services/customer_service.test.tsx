import { CustomerService } from '@/services/customer-service';

global.fetch = jest.fn();

const API_URL =
	process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'production'
		? process.env.NEXT_PUBLIC_PRODUCTION_API
		: process.env.NEXT_PUBLIC_DEVELOPMENT_API;

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
			expect(fetch).toHaveBeenCalledWith(`${API_URL}/customers/customer-list`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

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

	describe('create', () => {
		it('should create customer', async () => {
			// Arrange
			const mockCustomer = {
				id: 1,
				name: 'Test Customer',
			};
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockCustomer),
			});
			// Act
			const result = await CustomerService.create({ name: 'Test Customer' });
			// Assert
			expect(fetch).toHaveBeenCalledWith(`${API_URL}/customers/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: 'Test Customer' }),
			});
			expect(result).toEqual(mockCustomer);
		});
		it('should handle API error', async () => {
			// Arrange
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});
			// Act, Assert
			await expect(
				CustomerService.create({ name: 'Test Customer' })
			).rejects.toThrow('Failed to create customer');
		});
	});

	describe('info', () => {
		it('should get customer info', async () => {
			// Arrange
			const mockCustomerId = 1;
			const mockCustomerInfo = {
				name: 'Test Customer',
			};
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockCustomerInfo),
			});
			// Act
			const result = await CustomerService.get(mockCustomerId);
			// Assert
			expect(result).toEqual(mockCustomerInfo);
			expect(fetch).toHaveBeenCalledWith(
				`${API_URL}/customers/info/${mockCustomerId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		});
		it('should handle API error', async () => {
			// Arrange
			const mockCustomerId = 1;
			(fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});
			// Act, Asssert
			await expect(CustomerService.get(mockCustomerId)).rejects.toThrow(
				'Failed to get customer info'
			);
		});
	});
});

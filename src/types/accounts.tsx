export interface AccountCreate {
	customer_id: number;
	name: string;
	initial_amount: number;
}

export interface AccountInfo {
	id: number;
	name: string;
	account_number: string;
	routing_number: string;
}

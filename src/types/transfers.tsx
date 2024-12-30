export interface TransferCreate {
	sending_account_number: string;
	sending_routing_number: string;
	receiving_account_number: string;
	receiving_routing_number: string;
	transfer_amount: number;
}

export interface TransferListItem {
	sending_account_number: string;
	receiving_account_number: string;
	transfer_amount: number;
	status: string;
}

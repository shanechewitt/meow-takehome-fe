import BankAccount from '@/components/accounts/AccountPage';
import React from 'react';

interface AccountPageProps {
	params: {
		accountNumber: string;
	};
}

export default function AccountPage({ params }: AccountPageProps) {
	if (!params.accountNumber) {
		return <div>Invalid customer ID</div>;
	}

	return <BankAccount params={params} />;
}

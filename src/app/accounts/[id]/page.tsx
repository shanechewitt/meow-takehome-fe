import BankAccount from '@/components/accounts/AccountPage';
import React from 'react';

interface AccountPageProps {
	params: {
		id: string;
	};
}

export default function AccountPage({ params }: AccountPageProps) {
	return <BankAccount />;
}

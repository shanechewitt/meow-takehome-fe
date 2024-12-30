import CustomerProfile from '@/components/customers/CustomerProfile';
import React from 'react';

interface CustomerPageProps {
	params: {
		id: string;
	};
}

export default function CustomerPage({ params }: CustomerPageProps) {
	return <CustomerProfile />;
}

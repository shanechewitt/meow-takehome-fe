import CustomerProfile from '@/components/customers/CustomerProfile';
import React from 'react';

interface CustomerPageProps {
	params: {
		id: string;
	};
}

export default function CustomerPage({ params }: CustomerPageProps) {
	const customerId = parseInt(params.id);

	if (isNaN(customerId)) {
		return <div>Invalid customer ID</div>;
	}

	return <CustomerProfile customerId={customerId} />;
}

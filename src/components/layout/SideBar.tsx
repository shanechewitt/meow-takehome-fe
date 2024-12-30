import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, ArrowLeftRight } from 'lucide-react';

const navigationItems = [
	{
		name: 'Customer List',
		href: '/customers',
		icon: Users,
	},
	{
		name: 'Initiate Transfer',
		href: '/transfers',
		icon: ArrowLeftRight,
	},
];

const Sidebar: React.FC = () => {
	const pathname = usePathname();

	return (
		<div className='w-64 bg-blue-500 flex flex-col fixed h-full'>
			<div className='h-16 flex items-center justify-center px-6 bg-blue-600'>
				<h1 className='text-xl font-semibold text-white'>Shane Hewitt Meow</h1>
			</div>

			<nav className='flex-1 px-4 pt-4'>
				<ul className='space-y-2'>
					{navigationItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.name}>
								<Link
									href={item.href}
									className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
										isActive
											? 'bg-blue-700 text-white'
											: 'text-white hover:bg-blue-600'
									}`}
								>
									<item.icon
										className={`mr-3 h-5 w-5 ${
											isActive ? 'text-white' : 'text-blue-100'
										}`}
									/>
									{item.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;

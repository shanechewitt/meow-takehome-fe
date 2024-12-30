'use client';

import React, { ReactNode } from 'react';
import Sidebar from './SideBar';

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className='flex h-screen bg-white'>
			<Sidebar />
			<div className='flex-1 ml-64'>
				<main>{children}</main>
			</div>
		</div>
	);
};

export default AppLayout;

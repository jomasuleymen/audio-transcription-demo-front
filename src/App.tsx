import React from 'react';

import { ConfigProvider } from 'antd';

import MainLayout from './layout/MainLayout';
import Home from './pages/home/Home';

const App: React.FC = () => {
	return (
		<ConfigProvider>
			<MainLayout>
				<Home />
			</MainLayout>
		</ConfigProvider>
	);
};

export default App;

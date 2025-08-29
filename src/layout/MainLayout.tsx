import { Layout } from 'antd';
import React from 'react';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <Layout style={{ height: '100%' }}>{children}</Layout>;
};

export default MainLayout;

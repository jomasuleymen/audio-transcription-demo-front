import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import JobContent from './components/JobContent';
import JobList from './components/JobList';
import UploadJobFileButton from './components/UploadJobFileButton';

const Home: React.FC = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout style={{ height: '100%' }}>
			<Layout
				style={{
					maxWidth: '1200px',
					maxHeight: '600px',
					margin: 'auto',
					padding: '24px 12px',
					width: '100%',
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
				}}
			>
				<UploadJobFileButton />
				<Sider style={{ background: colorBgContainer }} width={300}>
					<JobList />
				</Sider>
				<Content style={{ padding: '0 24px', minHeight: 280 }}>
					<JobContent />
				</Content>
			</Layout>
		</Layout>
	);
};

export default Home;

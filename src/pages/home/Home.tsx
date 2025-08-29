import { Card, Flex, Layout, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { JobContent } from './components/JobContent';
import { JobList } from './components/JobList';
import { UploadJobFileButton } from './components/UploadJobFileButton';

const { Title } = Typography;

const Home: React.FC = () => {
	return (
		<div
			style={{
				padding: '32px 24px',
				maxWidth: 1400,
				margin: '0 auto',
				width: '100%',
				height: '100%',
			}}
		>
			<Flex vertical gap={24} style={{ height: '100%' }}>
				<div style={{ textAlign: 'center' }}>
					<Title level={2} style={{ margin: 0, marginBottom: 8 }}>
						Audio Transcription
					</Title>
				</div>

				<UploadJobFileButton />

				<Layout
					style={{
						background: 'transparent',
						flex: 1,
						minHeight: 0,
						display: 'flex',
						flexDirection: 'row',
						gap: 16,
					}}
				>
					<Content
						style={{
							maxWidth: 350,
						}}
					>
						<Card
							title="Audio Files"
							size="small"
							style={{
								height: '100%',
								border: '0.5px solid #e0e0e0',
							}}
							styles={{
								body: {
									padding: 0,
									height: 'calc(100% - 57px)', // не смог пофиксить title height по другому
									overflow: 'hidden',
								},
							}}
						>
							<JobList />
						</Card>
					</Content>

					<Content>
						<Card
							title="Transcription"
							size="small"
							style={{
								height: '100%',
								border: '0.5px solid #e0e0e0',
							}}
							styles={{
								body: {
									height: 'calc(100% - 57px)',
									overflow: 'auto',
								},
							}}
						>
							<JobContent />
						</Card>
					</Content>
				</Layout>
			</Flex>
		</div>
	);
};

export default Home;

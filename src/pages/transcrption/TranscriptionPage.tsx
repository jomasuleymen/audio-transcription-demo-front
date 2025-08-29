import { Card, Flex, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { UploadJobFileButton } from '../../shared/components/UploadJobFileButton';
import { JobContent } from './components/JobContent';
import { JobList } from './components/JobList';

const { Title } = Typography;

const Header: React.FC = () => {
	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<Title level={2} style={{ margin: 0, marginBottom: 8 }}>
					Audio Transcription
				</Title>
			</div>

			<UploadJobFileButton
				accept="audio/*"
				buttonText="Upload Audio File"
				description="Supports MP3, WAV, M4A and more"
			/>
		</>
	);
};

const Body: React.FC = () => {
	return (
		<Flex gap={16} vertical={false} style={{ minHeight: 0, height: '100%' }}>
			{/* Jobs List */}
			<Card
				title="Audio Files"
				size="small"
				style={{
					height: '100%',
					width: 350,
				}}
				styles={{
					body: {
						padding: 0,
						height: 'calc(100% - 57px)', // не смог пофиксить height tilting по другому
					},
				}}
			>
				<JobList />
			</Card>

			{/* Job Content */}
			<Content>
				<Card
					title="Transcription"
					size="small"
					style={{
						height: '100%',
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
		</Flex>
	);
};

const TranscriptionPage: React.FC = () => {
	return (
		<Flex
			vertical
			gap={24}
			style={{
				padding: '32px 24px',
				maxWidth: 1400,
				margin: '0 auto',
				width: '100%',
				height: '100%',
			}}
		>
			<Header />
			<Body />
		</Flex>
	);
};

export default TranscriptionPage;

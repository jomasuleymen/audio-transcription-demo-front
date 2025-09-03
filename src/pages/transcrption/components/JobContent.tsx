import { TranscriptionJobStatus, useGetTranscriptionJobQuery } from '@/generated/graphql';
import { StatusTag } from '@/shared/components/StatusTag';
import { MESSAGES } from '@/shared/constants';
import { copyToClipboard } from '@/shared/utils/clipboard';
import { useTranscriptionJobs } from '@/stores/jobs.store';
import { CopyOutlined, FileTextOutlined, SoundOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Empty, Flex, Result, Skeleton, Space, theme, Typography } from 'antd';
import React, { useEffect } from 'react';

const { Title, Text, Paragraph } = Typography;

const POLLING_INTERVAL = 3000;

const IdleContent: React.FC = () => {
	const { token } = theme.useToken();

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '48px 24px',
			}}
		>
			<Empty
				image={
					<FileTextOutlined style={{ fontSize: 64, color: token.colorTextDisabled }} />
				}
				description={
					<div>
						<Text type="secondary" style={{ fontSize: 16 }}>
							Select an audio file to view transcription
						</Text>
						<br />
						<Text type="secondary" style={{ fontSize: 14 }}>
							Choose from the list on the left or upload a new file
						</Text>
					</div>
				}
			/>
		</div>
	);
};

const LoadingContent: React.FC = () => {
	return (
		<div style={{ padding: '24px' }}>
			<Flex vertical gap={16}>
				<Skeleton.Input active style={{ width: 200, height: 32 }} />
				<Skeleton active paragraph={{ rows: 6 }} />
			</Flex>
		</div>
	);
};

const ProcessingContent: React.FC = () => {
	const { token } = theme.useToken();
	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '48px 24px',
			}}
		>
			<Result
				icon={<SyncOutlined spin style={{ color: token.colorPrimary }} />}
				title="Processing Your Audio"
				subTitle={
					<div>
						<StatusTag status={TranscriptionJobStatus.Processing} />
						<Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
							Please wait while we transcribe your audio file. This usually takes a
							few moments.
						</Text>
					</div>
				}
			/>
		</div>
	);
};

const NoTranscriptionContent: React.FC = () => {
	return (
		<div style={{ padding: '24px' }}>
			<Alert
				message="No transcription available"
				description={MESSAGES.NO_TRANSCRIPTION}
				type="warning"
				showIcon
			/>
		</div>
	);
};

const TranscriptionParagraph: React.FC<{ text: string }> = ({ text }) => {
	const { token } = theme.useToken();

	return (
		<div
			style={{
				background: token.colorBgContainer,
				border: `1px solid ${token.colorBorder}`,
				borderRadius: token.borderRadius,
				padding: '20px',
				minHeight: '200px',
			}}
		>
			<Paragraph>{text}</Paragraph>
		</div>
	);
};

const AudioContent: React.FC<{ url: string; fileName: string }> = ({ url, fileName }) => {
	const { token } = theme.useToken();
	return (
		<div
			style={{
				background: token.colorBgContainer,
				border: `1px solid ${token.colorBorder}`,
				borderRadius: token.borderRadius,
				padding: '16px',
			}}
		>
			<Space direction="vertical" style={{ width: '100%' }} size={12}>
				<Space align="center">
					<SoundOutlined style={{ color: token.colorTextSecondary }} />
					<Text strong style={{ fontSize: 14 }}>
						{fileName}
					</Text>
				</Space>
				<audio controls style={{ width: '100%' }}>
					<source src={url} />
				</audio>
			</Space>
		</div>
	);
};

export const JobContent: React.FC = () => {
	const selectedJobId = useTranscriptionJobs((state) => state.selectedJobId);
	const { data, loading, startPolling, stopPolling } = useGetTranscriptionJobQuery({
		variables: { id: selectedJobId! },
		skip: !selectedJobId,
	});

	const transcriptionJob = data?.transcriptionJob;

	const isProcessing =
		transcriptionJob?.status === TranscriptionJobStatus.Processing ||
		transcriptionJob?.status === TranscriptionJobStatus.Waiting;

	useEffect(() => {
		if (isProcessing) {
			startPolling(POLLING_INTERVAL);
		} else {
			stopPolling();
		}
	}, [isProcessing, startPolling, stopPolling]);

	const handleCopyText = () => {
		if (transcriptionJob?.transcriptionText) {
			copyToClipboard(transcriptionJob.transcriptionText);
		}
	};

	if (!selectedJobId) return <IdleContent />;
	if (loading) return <LoadingContent />;
	if (isProcessing) return <ProcessingContent />;

	if (!transcriptionJob?.transcriptionText) return <NoTranscriptionContent />;

	return (
		<div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
			<Flex vertical gap={16}>
				<Flex justify="space-between" align="center">
					<Title level={4}>Transcription</Title>
					<Flex gap={8} align="center">
						<StatusTag status={transcriptionJob.status} />
						<Button
							type="text"
							icon={<CopyOutlined />}
							onClick={handleCopyText}
							size="small"
						>
							Copy
						</Button>
					</Flex>
				</Flex>

				{transcriptionJob.s3Url && (
					<AudioContent
						url={transcriptionJob.s3Url}
						fileName={transcriptionJob.fileName}
					/>
				)}

				<TranscriptionParagraph text={transcriptionJob.transcriptionText} />

				<Text type="secondary" style={{ fontSize: 12, textAlign: 'center' }}>
					File: {transcriptionJob.fileName}
				</Text>
			</Flex>
		</div>
	);
};

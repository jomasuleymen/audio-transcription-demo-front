import { JobStatus, useGetJobQuery } from '@/generated/graphql';
import { StatusTag } from '@/shared/components/StatusTag';
import { MESSAGES } from '@/shared/constants';
import { copyToClipboard } from '@/shared/utils/clipboard';
import { useTranscriptionJobs } from '@/stores/jobs.store';
import { CopyOutlined, FileTextOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Empty, Flex, Result, Skeleton, theme, Typography } from 'antd';
import React, { useEffect } from 'react';

const { Title, Text, Paragraph } = Typography;

const POLLING_INTERVAL = 3000;

export const JobContent: React.FC = () => {
	const selectedJobId = useTranscriptionJobs((state) => state.selectedJobId);
	const { token } = theme.useToken();
	const { data, loading, startPolling, stopPolling } = useGetJobQuery({
		variables: { id: selectedJobId! },
		skip: !selectedJobId,
	});

	const isLoading =
		loading ||
		data?.job?.status === JobStatus.Processing ||
		data?.job?.status === JobStatus.Waiting;

	useEffect(() => {
		if (!data?.job) return;

		if (data.job?.status === JobStatus.Processing || data.job?.status === JobStatus.Waiting) {
			startPolling(POLLING_INTERVAL);
		} else {
			stopPolling();
		}
	}, [data?.job?.status, startPolling, stopPolling]);

	const handleCopyText = () => {
		if (data?.job?.transcriptionText) {
			copyToClipboard(data.job.transcriptionText);
		}
	};

	if (!selectedJobId) {
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
						<FileTextOutlined
							style={{ fontSize: 64, color: token.colorTextDisabled }}
						/>
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
	}

	if (isLoading) {
		return (
			<div style={{ padding: '24px' }}>
				<Flex vertical gap={16}>
					<Skeleton.Input active style={{ width: 200, height: 32 }} />
					<Skeleton active paragraph={{ rows: 6 }} />
				</Flex>
			</div>
		);
	}

	if (data?.job?.status === JobStatus.Processing || data?.job?.status === JobStatus.Waiting) {
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
							<StatusTag status={data.job.status} variant="detailed" />
							<Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
								Please wait while we transcribe your audio file. This usually takes
								a few moments.
							</Text>
						</div>
					}
				/>
			</div>
		);
	}

	if (!data?.job?.transcriptionText) {
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
	}

	return (
		<div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
			<Flex vertical gap={16}>
				<Flex justify="space-between" align="center">
					<Title level={4} style={{ margin: 0 }}>
						Transcription
					</Title>
					<Flex gap={8} align="center">
						<StatusTag status={data.job.status} variant="detailed" />
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

				<div
					style={{
						background: token.colorBgContainer,
						border: `1px solid ${token.colorBorder}`,
						borderRadius: token.borderRadius,
						padding: '20px',
						minHeight: '200px',
					}}
				>
					<Paragraph>{data.job.transcriptionText}</Paragraph>
				</div>

				<Text type="secondary" style={{ fontSize: 12, textAlign: 'center' }}>
					File: {data.job.fileName}
				</Text>
			</Flex>
		</div>
	);
};

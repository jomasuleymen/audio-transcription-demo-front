import {
	GetTranscriptionJobsQuery,
	TranscriptionJobStatus,
	useGetTranscriptionJobsQuery,
} from '@/generated/graphql';
import { StatusTag } from '@/shared/components/StatusTag';
import { useTranscriptionJobs } from '@/stores/jobs.store';
import { AudioOutlined } from '@ant-design/icons';
import { Avatar, Empty, Flex, List, Skeleton, theme, Typography } from 'antd';
import React, { useEffect } from 'react';

const { Text } = Typography;

const JOBS_LIST_POLLING_INTERVAL = 2500;

interface JobItemProps {
	job: GetTranscriptionJobsQuery['transcriptionJobs'][number];
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
	const selectedJobId = useTranscriptionJobs((state) => state.selectedJobId);
	const setSelectedJobId = useTranscriptionJobs((state) => state.setSelectedJobId);
	const { token } = theme.useToken();
	const isSelected = selectedJobId === job.id;

	return (
		<List.Item
			style={{
				cursor: 'pointer',
				padding: '16px',
				backgroundColor: isSelected ? token.colorPrimaryBg : 'transparent',
				border: isSelected ? `1px solid ${token.colorPrimary}` : '1px solid transparent',
				borderRadius: token.borderRadius,
				margin: 2,
			}}
			onClick={() => setSelectedJobId(job.id)}
			onMouseEnter={(e) => {
				if (!isSelected) {
					e.currentTarget.style.backgroundColor = token.colorBgTextHover;
				}
			}}
			onMouseLeave={(e) => {
				if (!isSelected) {
					e.currentTarget.style.backgroundColor = 'transparent';
				}
			}}
		>
			<Flex align="center" gap={12} style={{ width: '100%' }}>
				<Avatar
					icon={<AudioOutlined />}
					style={{
						backgroundColor: isSelected ? token.colorPrimary : token.colorBgContainer,
						color: isSelected ? 'white' : token.colorTextSecondary,
					}}
				/>
				<Flex vertical style={{ flex: 1, minWidth: 0 }}>
					<Text
						strong={isSelected}
						style={{
							color: isSelected ? token.colorPrimary : token.colorText,
						}}
						ellipsis={{ tooltip: job.fileName }}
					>
						{job.fileName}
					</Text>
					<div style={{ marginTop: 4 }}>
						<StatusTag status={job.status} />
					</div>
				</Flex>
			</Flex>
		</List.Item>
	);
};

export const JobList: React.FC = () => {
	const { data, loading, startPolling, stopPolling } = useGetTranscriptionJobsQuery({
		fetchPolicy: 'no-cache',
	});

	const transcriptionJobs = data?.transcriptionJobs || [];

	useEffect(() => {
		const hasActiveJobs = transcriptionJobs.some(
			(job) =>
				job.status === TranscriptionJobStatus.Processing ||
				job.status === TranscriptionJobStatus.Waiting
		);

		if (hasActiveJobs) {
			startPolling(JOBS_LIST_POLLING_INTERVAL);
		} else {
			stopPolling();
		}

		return () => stopPolling();
	}, [transcriptionJobs, startPolling, stopPolling]);

	if (loading) {
		return (
			<div style={{ padding: '16px' }}>
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton
						key={index}
						active
						avatar
						paragraph={{ rows: 1 }}
						style={{ marginBottom: 16 }}
					/>
				))}
			</div>
		);
	}

	if (!transcriptionJobs.length) {
		return (
			<div style={{ padding: '32px 16px', textAlign: 'center' }}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description="No audio files uploaded yet"
				/>
			</div>
		);
	}

	return (
		<List
			dataSource={transcriptionJobs}
			renderItem={(item) => <JobItem key={item.id} job={item} />}
			style={{ height: '100%', overflow: 'auto' }}
		/>
	);
};

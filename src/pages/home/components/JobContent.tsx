import { JobStatus, useGetJobQuery } from '@/generated/graphql';
import { useTranscriptionJobs } from '@/stores/jobs.store';
import { Skeleton, Typography } from 'antd';
import React, { useEffect } from 'react';

type Props = {};

const JobContent: React.FC<Props> = ({}) => {
	const selectedJobId = useTranscriptionJobs((state) => state.selectedJobId);
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
			startPolling(2500);
		} else {
			stopPolling();
		}
	}, [data?.job?.status, startPolling, stopPolling]);

	if (isLoading) {
		return <Skeleton active />;
	}

	return <Typography.Text>{data?.job?.transcriptionText}</Typography.Text>;
};

export default JobContent;

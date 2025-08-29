import { GetAllJobsQuery, useGetAllJobsQuery } from '@/generated/graphql';
import { useTranscriptionJobs } from '@/stores/jobs.store';
import { List, Typography } from 'antd';
import React from 'react';

interface JobItemProps {
	job: GetAllJobsQuery['jobs'][number];
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
	const selectedJobId = useTranscriptionJobs((state) => state.selectedJobId);
	const setSelectedJobId = useTranscriptionJobs((state) => state.setSelectedJobId);

	return (
		<List.Item
			style={{
				cursor: 'pointer',
				backgroundColor: selectedJobId === job.id ? 'lightgray' : 'white',
			}}
			onClick={() => setSelectedJobId(job.id)}
		>
			<Typography.Text>{job.fileName}</Typography.Text>
		</List.Item>
	);
};

type JobListProps = {};
const JobList: React.FC<JobListProps> = ({}) => {
	const { data, loading } = useGetAllJobsQuery();

	return (
		<List
			bordered
			dataSource={data?.jobs || []}
			renderItem={(item) => <JobItem key={item.id} job={item} />}
		/>
	);
};

export default JobList;

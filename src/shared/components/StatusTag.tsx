import { JobStatus } from '@/generated/graphql';
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag, TagProps } from 'antd';
import React, { useMemo } from 'react';

interface StatusTagProps {
	status: JobStatus;
}

const configs: Record<JobStatus, Pick<TagProps, 'icon' | 'color'> & { text: string }> = {
	[JobStatus.Waiting]: {
		icon: <ClockCircleOutlined />,
		color: 'orange' as const,
		text: 'Waiting',
	},
	[JobStatus.Processing]: {
		icon: <SyncOutlined spin />,
		color: 'blue' as const,
		text: 'Processing',
	},
	[JobStatus.Completed]: {
		icon: <CheckCircleOutlined />,
		color: 'green' as const,
		text: 'Completed',
	},
};

export const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
	const config = useMemo(() => {
		const config = configs[status];

		if (!config) {
			return {
				icon: <ClockCircleOutlined />,
				color: 'default',
				text: 'Unknown',
			};
		}

		return config;
	}, [status]);

	return (
		<Tag icon={config.icon} color={config.color}>
			{config.text}
		</Tag>
	);
};

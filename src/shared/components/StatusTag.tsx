import { TranscriptionJobStatus } from '@/generated/graphql';
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag, TagProps } from 'antd';
import React, { useMemo } from 'react';

interface StatusTagProps {
	status: TranscriptionJobStatus;
}

const configs: Record<TranscriptionJobStatus, Pick<TagProps, 'icon' | 'color'> & { text: string }> = {
	[TranscriptionJobStatus.Waiting]: {
		icon: <ClockCircleOutlined />,
		color: 'orange' as const,
		text: 'Waiting',
	},
	[TranscriptionJobStatus.Processing]: {
		icon: <SyncOutlined spin />,
		color: 'blue' as const,
		text: 'Processing',
	},
	[TranscriptionJobStatus.Completed]: {
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

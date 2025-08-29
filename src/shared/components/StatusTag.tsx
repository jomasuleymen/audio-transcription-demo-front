import { JobStatus } from '@/generated/graphql';
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';

interface StatusTagProps {
  status: JobStatus;
  variant?: 'default' | 'detailed';
}

const getStatusConfig = (status: JobStatus, variant: 'default' | 'detailed') => {
  const baseConfig = {
    [JobStatus.Waiting]: {
      icon: <ClockCircleOutlined />,
      color: 'orange' as const,
      text: variant === 'detailed' ? 'Waiting in queue' : 'Waiting'
    },
    [JobStatus.Processing]: {
      icon: <SyncOutlined spin />,
      color: 'blue' as const,
      text: variant === 'detailed' ? 'Processing audio' : 'Processing'
    },
    [JobStatus.Completed]: {
      icon: <CheckCircleOutlined />,
      color: 'green' as const,
      text: variant === 'detailed' ? 'Transcription complete' : 'Completed'
    }
  };

  return baseConfig[status] || {
    icon: <ClockCircleOutlined />,
    color: 'default' as const,
    text: 'Unknown'
  };
};

export const StatusTag: React.FC<StatusTagProps> = ({ status, variant = 'default' }) => {
  const config = getStatusConfig(status, variant);
  
  return (
    <Tag icon={config.icon} color={config.color}>
      {config.text}
    </Tag>
  );
};

import { useFileUpload } from '@/shared/hooks/useFileUpload';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Flex, Typography, Upload } from 'antd';
import React from 'react';

const { Text } = Typography;

export const UploadJobFileButton: React.FC = () => {
	const { uploadFile, uploading } = useFileUpload();

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Upload
				name="file"
				multiple={false}
				accept="audio/*"
				showUploadList={false}
				customRequest={({ file }: any) => uploadFile(file)}
				style={{ width: '100%', maxWidth: 400 }}
			>
				<Button
					type="primary"
					size="large"
					loading={uploading}
					icon={<CloudUploadOutlined />}
					style={{
						height: 64,
						width: '100%',
						maxWidth: 400,
						fontSize: 16,
						fontWeight: 500,
					}}
				>
					<Flex vertical align="center" gap={4}>
						<span style={{ fontSize: 16 }}>
							{uploading ? 'Uploading...' : 'Upload Audio File'}
						</span>
						<Text
							type="secondary"
							style={{
								fontSize: 12,
								color: 'white',
								margin: 0,
							}}
						>
							Supports MP3, WAV, M4A and more
						</Text>
					</Flex>
				</Button>
			</Upload>
		</div>
	);
};

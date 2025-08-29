import { useJobFileUpload } from '@/shared/hooks/useJobFileUpload';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Flex, Typography, Upload } from 'antd';
import React from 'react';

const { Text } = Typography;

type Props = {
	accept: string;
	buttonText: string;
	description?: string;
};

export const UploadJobFileButton: React.FC<Props> = ({ accept, buttonText, description }) => {
	const { uploadFile, uploading } = useJobFileUpload();

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Upload
				name="file"
				multiple={false}
				accept={accept}
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
					}}
				>
					<Flex vertical align="center" gap={4}>
						<span>
							{uploading ? 'Uploading...' : buttonText}
						</span>
						<Text
							type="secondary"
							style={{
								fontSize: 12,
								color: 'white',
							}}
						>
							{description}
						</Text>
					</Flex>
				</Button>
			</Upload>
		</div>
	);
};

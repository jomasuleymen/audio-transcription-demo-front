import {
	GetAllJobsDocument,
	useConfirmFileUploadMutation,
	useCreateTranscriptionJobMutation,
} from '@/generated/graphql';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import { useApolloClient } from '@apollo/client';
import { Button, message, Upload } from 'antd';
import axios from 'axios';
import React, { useCallback, useState } from 'react';

type Props = {};

const UploadJobFileButton: React.FC<Props> = ({}) => {
	const [createJob] = useCreateTranscriptionJobMutation();
	const [confirmUpload] = useConfirmFileUploadMutation();
	const client = useApolloClient();

	const [uploading, setUploading] = useState(false);

	const handleUpload = useCallback(
		async (file: File) => {
			if (!file.type.startsWith('audio/')) {
				message.error('Please select an audio file');
				return;
			}

			setUploading(true);

			try {
				// Step 1: Create transcription job
				const { data: createData } = await createJob({
					variables: {
						fileName: file.name,
						contentType: file.type,
					},
				});

				if (!createData?.createTranscriptionJob) {
					throw new Error('Failed to create job');
				}

				const { job, uploadUrl } = createData.createTranscriptionJob;

				// Step 2: Upload file to S3 using presigned URL
				await axios.put(uploadUrl, file, {
					headers: {
						'Content-Type': file.type,
					},
				});

				// Step 3: Confirm upload
				await confirmUpload({ variables: { id: job.id } });

				client.refetchQueries({
					include: [GetAllJobsDocument],
				});

				message.success('File uploaded successfully! Processing started.');
			} catch (error) {
				console.error('Upload failed:', error);
				message.error('Upload failed. Please try again.');
			} finally {
				setUploading(false);
			}
		},
		[createJob, confirmUpload]
	);

	return (
		<Upload
			name="file"
			multiple={false}
			accept="audio/*"
			showUploadList={false}
			customRequest={({ file }: any) => handleUpload(file)}
		>
			<Button icon={<UploadOutlined />}>Click to Upload</Button>
		</Upload>
	);
};

export default UploadJobFileButton;

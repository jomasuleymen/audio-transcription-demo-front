import {
	GetTranscriptionJobsDocument,
	useConfirmJobFileUploadMutation,
	useCreateTranscriptionJobMutation,
} from '@/generated/graphql';
import { MESSAGES } from '@/shared/constants';
import { useApolloClient } from '@apollo/client';
import { message } from 'antd';
import axios from 'axios';
import { useCallback, useState } from 'react';

export const useJobFileUpload = () => {
	const [createJob] = useCreateTranscriptionJobMutation();
	const [confirmUpload] = useConfirmJobFileUploadMutation();
	const client = useApolloClient();
	const [uploading, setUploading] = useState(false);

	const uploadFile = useCallback(
		async (file: File) => {
			setUploading(true);

			try {
				const { data: createData } = await createJob({
					variables: {
						input: {
							fileName: file.name,
							contentType: file.type,
						},
					},
				});

				if (!createData?.createTranscriptionJob) {
					message.error(MESSAGES.UPLOAD_ERROR);
					return;
				}

				const { job, uploadUrl } = createData.createTranscriptionJob;

				await axios.put(uploadUrl, file);

				await confirmUpload({ variables: { jobId: job.id } });

				client.refetchQueries({
					include: [GetTranscriptionJobsDocument],
				});

				message.success(MESSAGES.UPLOAD_SUCCESS);
			} catch (error) {
				console.error('Upload failed:', error);
				message.error(MESSAGES.UPLOAD_ERROR);
			} finally {
				setUploading(false);
			}
		},
		[createJob, confirmUpload, client]
	);

	return { uploadFile, uploading };
};

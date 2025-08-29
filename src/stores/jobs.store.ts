import { create } from 'zustand';

type TranscriptionJobsState = {
	selectedJobId: string | null;
	setSelectedJobId: (jobId: string) => void;
};

export const useTranscriptionJobs = create<TranscriptionJobsState>((set) => ({
	selectedJobId: null,
	setSelectedJobId: (jobId: string) => set({ selectedJobId: jobId }),
}));

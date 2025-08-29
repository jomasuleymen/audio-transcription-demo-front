export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTranscriptionJobResponse = {
  __typename?: 'CreateTranscriptionJobResponse';
  job: TranscriptionJob;
  uploadUrl: Scalars['String']['output'];
};

export enum JobStatus {
  Completed = 'COMPLETED',
  Processing = 'PROCESSING',
  Waiting = 'WAITING'
}

export type Mutation = {
  __typename?: 'Mutation';
  confirmFileUpload: TranscriptionJob;
  createTranscriptionJob: CreateTranscriptionJobResponse;
};


export type MutationConfirmFileUploadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateTranscriptionJobArgs = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<TranscriptionJob>;
  jobs: Array<TranscriptionJob>;
};


export type QueryJobArgs = {
  id: Scalars['ID']['input'];
};

export type TranscriptionJob = {
  __typename?: 'TranscriptionJob';
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  s3Url: Scalars['String']['output'];
  status: JobStatus;
  transcriptionText?: Maybe<Scalars['String']['output']>;
};

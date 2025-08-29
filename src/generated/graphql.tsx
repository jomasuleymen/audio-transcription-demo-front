import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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

export type GetAllJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllJobsQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'TranscriptionJob', id: string, status: JobStatus, fileName: string }> };

export type GetJobQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetJobQuery = { __typename?: 'Query', job?: { __typename?: 'TranscriptionJob', id: string, status: JobStatus, fileName: string, s3Url: string, transcriptionText?: string | null } | null };

export type CreateTranscriptionJobMutationVariables = Exact<{
  fileName: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
}>;


export type CreateTranscriptionJobMutation = { __typename?: 'Mutation', createTranscriptionJob: { __typename?: 'CreateTranscriptionJobResponse', uploadUrl: string, job: { __typename?: 'TranscriptionJob', id: string } } };

export type ConfirmFileUploadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ConfirmFileUploadMutation = { __typename?: 'Mutation', confirmFileUpload: { __typename?: 'TranscriptionJob', id: string } };


export const GetAllJobsDocument = gql`
    query GetAllJobs {
  jobs {
    id
    status
    fileName
  }
}
    `;

/**
 * __useGetAllJobsQuery__
 *
 * To run a query within a React component, call `useGetAllJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllJobsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllJobsQuery, GetAllJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllJobsQuery, GetAllJobsQueryVariables>(GetAllJobsDocument, options);
      }
export function useGetAllJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllJobsQuery, GetAllJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllJobsQuery, GetAllJobsQueryVariables>(GetAllJobsDocument, options);
        }
export function useGetAllJobsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllJobsQuery, GetAllJobsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllJobsQuery, GetAllJobsQueryVariables>(GetAllJobsDocument, options);
        }
export type GetAllJobsQueryHookResult = ReturnType<typeof useGetAllJobsQuery>;
export type GetAllJobsLazyQueryHookResult = ReturnType<typeof useGetAllJobsLazyQuery>;
export type GetAllJobsSuspenseQueryHookResult = ReturnType<typeof useGetAllJobsSuspenseQuery>;
export type GetAllJobsQueryResult = Apollo.QueryResult<GetAllJobsQuery, GetAllJobsQueryVariables>;
export const GetJobDocument = gql`
    query GetJob($id: ID!) {
  job(id: $id) {
    id
    status
    fileName
    s3Url
    transcriptionText
  }
}
    `;

/**
 * __useGetJobQuery__
 *
 * To run a query within a React component, call `useGetJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJobQuery(baseOptions: Apollo.QueryHookOptions<GetJobQuery, GetJobQueryVariables> & ({ variables: GetJobQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
      }
export function useGetJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
        }
export function useGetJobSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJobQuery, GetJobQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJobQuery, GetJobQueryVariables>(GetJobDocument, options);
        }
export type GetJobQueryHookResult = ReturnType<typeof useGetJobQuery>;
export type GetJobLazyQueryHookResult = ReturnType<typeof useGetJobLazyQuery>;
export type GetJobSuspenseQueryHookResult = ReturnType<typeof useGetJobSuspenseQuery>;
export type GetJobQueryResult = Apollo.QueryResult<GetJobQuery, GetJobQueryVariables>;
export const CreateTranscriptionJobDocument = gql`
    mutation CreateTranscriptionJob($fileName: String!, $contentType: String!) {
  createTranscriptionJob(fileName: $fileName, contentType: $contentType) {
    job {
      id
    }
    uploadUrl
  }
}
    `;
export type CreateTranscriptionJobMutationFn = Apollo.MutationFunction<CreateTranscriptionJobMutation, CreateTranscriptionJobMutationVariables>;

/**
 * __useCreateTranscriptionJobMutation__
 *
 * To run a mutation, you first call `useCreateTranscriptionJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTranscriptionJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTranscriptionJobMutation, { data, loading, error }] = useCreateTranscriptionJobMutation({
 *   variables: {
 *      fileName: // value for 'fileName'
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useCreateTranscriptionJobMutation(baseOptions?: Apollo.MutationHookOptions<CreateTranscriptionJobMutation, CreateTranscriptionJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTranscriptionJobMutation, CreateTranscriptionJobMutationVariables>(CreateTranscriptionJobDocument, options);
      }
export type CreateTranscriptionJobMutationHookResult = ReturnType<typeof useCreateTranscriptionJobMutation>;
export type CreateTranscriptionJobMutationResult = Apollo.MutationResult<CreateTranscriptionJobMutation>;
export type CreateTranscriptionJobMutationOptions = Apollo.BaseMutationOptions<CreateTranscriptionJobMutation, CreateTranscriptionJobMutationVariables>;
export const ConfirmFileUploadDocument = gql`
    mutation ConfirmFileUpload($id: ID!) {
  confirmFileUpload(id: $id) {
    id
  }
}
    `;
export type ConfirmFileUploadMutationFn = Apollo.MutationFunction<ConfirmFileUploadMutation, ConfirmFileUploadMutationVariables>;

/**
 * __useConfirmFileUploadMutation__
 *
 * To run a mutation, you first call `useConfirmFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmFileUploadMutation, { data, loading, error }] = useConfirmFileUploadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConfirmFileUploadMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmFileUploadMutation, ConfirmFileUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmFileUploadMutation, ConfirmFileUploadMutationVariables>(ConfirmFileUploadDocument, options);
      }
export type ConfirmFileUploadMutationHookResult = ReturnType<typeof useConfirmFileUploadMutation>;
export type ConfirmFileUploadMutationResult = Apollo.MutationResult<ConfirmFileUploadMutation>;
export type ConfirmFileUploadMutationOptions = Apollo.BaseMutationOptions<ConfirmFileUploadMutation, ConfirmFileUploadMutationVariables>;
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
  DateTime: { input: any; output: any; }
};

export type CreateTranscriptionJobInput = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};

export type CreateTranscriptionJobResponse = {
  __typename?: 'CreateTranscriptionJobResponse';
  job: TranscriptionJob;
  uploadUrl: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmJobFileUpload: TranscriptionJob;
  createTranscriptionJob: CreateTranscriptionJobResponse;
};


export type MutationConfirmJobFileUploadArgs = {
  jobId: Scalars['ID']['input'];
};


export type MutationCreateTranscriptionJobArgs = {
  input: CreateTranscriptionJobInput;
};

export type Query = {
  __typename?: 'Query';
  transcriptionJob: TranscriptionJob;
  transcriptionJobs: Array<TranscriptionJob>;
};


export type QueryTranscriptionJobArgs = {
  id: Scalars['ID']['input'];
};

export type TranscriptionJob = {
  __typename?: 'TranscriptionJob';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  s3Url?: Maybe<Scalars['String']['output']>;
  status: TranscriptionJobStatus;
  transcriptionText?: Maybe<Scalars['String']['output']>;
};

export enum TranscriptionJobStatus {
  Completed = 'COMPLETED',
  Processing = 'PROCESSING',
  Waiting = 'WAITING'
}

export type GetTranscriptionJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTranscriptionJobsQuery = { __typename?: 'Query', transcriptionJobs: Array<{ __typename?: 'TranscriptionJob', id: string, status: TranscriptionJobStatus, fileName: string, createdAt: any }> };

export type GetTranscriptionJobQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTranscriptionJobQuery = { __typename?: 'Query', transcriptionJob: { __typename?: 'TranscriptionJob', id: string, status: TranscriptionJobStatus, fileName: string, s3Url?: string | null, transcriptionText?: string | null } };

export type CreateTranscriptionJobMutationVariables = Exact<{
  input: CreateTranscriptionJobInput;
}>;


export type CreateTranscriptionJobMutation = { __typename?: 'Mutation', createTranscriptionJob: { __typename?: 'CreateTranscriptionJobResponse', uploadUrl: string, job: { __typename?: 'TranscriptionJob', id: string } } };

export type ConfirmJobFileUploadMutationVariables = Exact<{
  jobId: Scalars['ID']['input'];
}>;


export type ConfirmJobFileUploadMutation = { __typename?: 'Mutation', confirmJobFileUpload: { __typename?: 'TranscriptionJob', id: string } };


export const GetTranscriptionJobsDocument = gql`
    query GetTranscriptionJobs {
  transcriptionJobs {
    id
    status
    fileName
    createdAt
  }
}
    `;

/**
 * __useGetTranscriptionJobsQuery__
 *
 * To run a query within a React component, call `useGetTranscriptionJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTranscriptionJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTranscriptionJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTranscriptionJobsQuery(baseOptions?: Apollo.QueryHookOptions<GetTranscriptionJobsQuery, GetTranscriptionJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTranscriptionJobsQuery, GetTranscriptionJobsQueryVariables>(GetTranscriptionJobsDocument, options);
      }
export function useGetTranscriptionJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTranscriptionJobsQuery, GetTranscriptionJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTranscriptionJobsQuery, GetTranscriptionJobsQueryVariables>(GetTranscriptionJobsDocument, options);
        }
export function useGetTranscriptionJobsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTranscriptionJobsQuery, GetTranscriptionJobsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTranscriptionJobsQuery, GetTranscriptionJobsQueryVariables>(GetTranscriptionJobsDocument, options);
        }
export type GetTranscriptionJobsQueryHookResult = ReturnType<typeof useGetTranscriptionJobsQuery>;
export type GetTranscriptionJobsLazyQueryHookResult = ReturnType<typeof useGetTranscriptionJobsLazyQuery>;
export type GetTranscriptionJobsSuspenseQueryHookResult = ReturnType<typeof useGetTranscriptionJobsSuspenseQuery>;
export type GetTranscriptionJobsQueryResult = Apollo.QueryResult<GetTranscriptionJobsQuery, GetTranscriptionJobsQueryVariables>;
export const GetTranscriptionJobDocument = gql`
    query GetTranscriptionJob($id: ID!) {
  transcriptionJob(id: $id) {
    id
    status
    fileName
    s3Url
    transcriptionText
  }
}
    `;

/**
 * __useGetTranscriptionJobQuery__
 *
 * To run a query within a React component, call `useGetTranscriptionJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTranscriptionJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTranscriptionJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTranscriptionJobQuery(baseOptions: Apollo.QueryHookOptions<GetTranscriptionJobQuery, GetTranscriptionJobQueryVariables> & ({ variables: GetTranscriptionJobQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTranscriptionJobQuery, GetTranscriptionJobQueryVariables>(GetTranscriptionJobDocument, options);
      }
export function useGetTranscriptionJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTranscriptionJobQuery, GetTranscriptionJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTranscriptionJobQuery, GetTranscriptionJobQueryVariables>(GetTranscriptionJobDocument, options);
        }
export function useGetTranscriptionJobSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTranscriptionJobQuery, GetTranscriptionJobQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTranscriptionJobQuery, GetTranscriptionJobQueryVariables>(GetTranscriptionJobDocument, options);
        }
export type GetTranscriptionJobQueryHookResult = ReturnType<typeof useGetTranscriptionJobQuery>;
export type GetTranscriptionJobLazyQueryHookResult = ReturnType<typeof useGetTranscriptionJobLazyQuery>;
export type GetTranscriptionJobSuspenseQueryHookResult = ReturnType<typeof useGetTranscriptionJobSuspenseQuery>;
export type GetTranscriptionJobQueryResult = Apollo.QueryResult<GetTranscriptionJobQuery, GetTranscriptionJobQueryVariables>;
export const CreateTranscriptionJobDocument = gql`
    mutation CreateTranscriptionJob($input: CreateTranscriptionJobInput!) {
  createTranscriptionJob(input: $input) {
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
 *      input: // value for 'input'
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
export const ConfirmJobFileUploadDocument = gql`
    mutation ConfirmJobFileUpload($jobId: ID!) {
  confirmJobFileUpload(jobId: $jobId) {
    id
  }
}
    `;
export type ConfirmJobFileUploadMutationFn = Apollo.MutationFunction<ConfirmJobFileUploadMutation, ConfirmJobFileUploadMutationVariables>;

/**
 * __useConfirmJobFileUploadMutation__
 *
 * To run a mutation, you first call `useConfirmJobFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmJobFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmJobFileUploadMutation, { data, loading, error }] = useConfirmJobFileUploadMutation({
 *   variables: {
 *      jobId: // value for 'jobId'
 *   },
 * });
 */
export function useConfirmJobFileUploadMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmJobFileUploadMutation, ConfirmJobFileUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmJobFileUploadMutation, ConfirmJobFileUploadMutationVariables>(ConfirmJobFileUploadDocument, options);
      }
export type ConfirmJobFileUploadMutationHookResult = ReturnType<typeof useConfirmJobFileUploadMutation>;
export type ConfirmJobFileUploadMutationResult = Apollo.MutationResult<ConfirmJobFileUploadMutation>;
export type ConfirmJobFileUploadMutationOptions = Apollo.BaseMutationOptions<ConfirmJobFileUploadMutation, ConfirmJobFileUploadMutationVariables>;
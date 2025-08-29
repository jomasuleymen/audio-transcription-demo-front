import React from 'react';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ConfigProvider, Layout } from 'antd';

import TranscriptionPage from './pages/transcrption/TranscriptionPage';

export const client = new ApolloClient({
	link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL }),
	cache: new InMemoryCache(),
});

const App: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			<ConfigProvider>
				<Layout style={{ height: '100%' }}>
					<TranscriptionPage />
				</Layout>
			</ConfigProvider>
		</ApolloProvider>
	);
};

export default App;

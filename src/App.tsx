import React from 'react';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ConfigProvider } from 'antd';

import MainLayout from './layout/MainLayout';
import Home from './pages/home/Home';

export const client = new ApolloClient({
	link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL }),
	cache: new InMemoryCache(),
});

const App: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			<ConfigProvider>
				<MainLayout>
					<Home />
				</MainLayout>
			</ConfigProvider>
		</ApolloProvider>
	);
};

export default App;

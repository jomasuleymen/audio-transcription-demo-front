import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';

import App from './App';
import './styles/global.css';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>
);

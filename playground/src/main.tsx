import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ArcWalletProvider } from 'arc-gasless-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ArcWalletProvider appId="PLACEHOLDER_APP_ID">
      <App />
    </ArcWalletProvider>
  </React.StrictMode>
);

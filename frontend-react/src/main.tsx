import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ResumeProvider } from './contexts/ResumeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </React.StrictMode>,
);

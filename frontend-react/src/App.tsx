import React from 'react';
import { FormPanel } from './components/FormPanel';
import { PreviewPanel } from './components/PreviewPanel';
import './index.css';

function App() {
  return (
    <div className="layout">
      <FormPanel />
      <PreviewPanel />
    </div>
  );
}

export default App;

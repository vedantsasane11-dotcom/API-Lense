import React, { useState } from 'react';
import Header from './components/Header';
import RequestForm from './components/RequestForm';
import ResponseViewer from './components/ResponseViewer';
import { executeGetRequest } from './utils/api';

export default function App() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSendRequest = async (overrideUrl) => {
    const targetUrl = overrideUrl || url;
    setIsLoading(true);
    setResult(null);

    const apiResult = await executeGetRequest(targetUrl);
    setResult(apiResult);
    setIsLoading(false);
  };

  const handleSelectPreset = (presetUrl) => {
    setUrl(presetUrl);
    handleSendRequest(presetUrl);
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="workspace-main">
        <RequestForm
          url={url}
          setUrl={setUrl}
          onSubmit={() => handleSendRequest(url)}
          isLoading={isLoading}
          onSelectPreset={handleSelectPreset}
        />
        <ResponseViewer result={result} isLoading={isLoading} />
      </main>
    </div>
  );
}

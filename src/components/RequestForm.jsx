import React, { useState, useEffect } from 'react';

const EXAMPLES = [
  { name: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/todos/1' },
  { name: 'DummyJSON', url: 'https://dummyjson.com/products/1' },
  { name: 'Open-Meteo', url: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m' }
];

export default function RequestForm({ url, setUrl, onSubmit, isLoading, onSelectPreset }) {
  const [activeReqTab, setActiveReqTab] = useState('params');
  const [queryParams, setQueryParams] = useState([]);

  // Extract query parameters from URL whenever URL changes
  useEffect(() => {
    try {
      const parsedUrl = new URL(url);
      const params = [];
      parsedUrl.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });
      setQueryParams(params);
    } catch {
      setQueryParams([]);
    }
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="request-section">
      <form onSubmit={handleSubmit} className="request-bar">
        <div className="request-input-group">
          <select 
            className="method-badge-select" 
            value="GET" 
            disabled 
            title="HTTP GET method"
            aria-label="HTTP Method"
          >
            <option value="GET">GET</option>
            <option value="POST" disabled>POST</option>
            <option value="PUT" disabled>PUT</option>
            <option value="DELETE" disabled>DELETE</option>
          </select>

          <input
            type="url"
            className="url-input-field"
            placeholder="https://api.example.com/v1/resource"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            aria-label="API Endpoint URL"
          />

          <button 
            type="submit" 
            className="send-action-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {/* Compact Request Configuration Bar: Params | Headers | Body */}
      <div className="req-config-panel">
        <div className="req-config-header">
          <div className="req-tabs">
            <button
              type="button"
              className={`req-tab-btn ${activeReqTab === 'params' ? 'active' : ''}`}
              onClick={() => setActiveReqTab('params')}
            >
              Params {queryParams.length > 0 ? `(${queryParams.length})` : ''}
            </button>
            <button
              type="button"
              className={`req-tab-btn ${activeReqTab === 'headers' ? 'active' : ''}`}
              onClick={() => setActiveReqTab('headers')}
            >
              Headers (1)
            </button>
            <button
              type="button"
              className={`req-tab-btn ${activeReqTab === 'body' ? 'active' : ''}`}
              onClick={() => setActiveReqTab('body')}
            >
              Body
            </button>
          </div>

          {/* Low prominence quiet Examples links */}
          <div className="quiet-examples">
            <span className="quiet-label">Examples:</span>
            {EXAMPLES.map((ex, idx) => (
              <React.Fragment key={ex.name}>
                <button
                  type="button"
                  className="quiet-ex-btn"
                  onClick={() => onSelectPreset(ex.url)}
                >
                  {ex.name}
                </button>
                {idx < EXAMPLES.length - 1 && <span className="quiet-sep">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Request Configuration Tab Details */}
        <div className="req-config-body">
          {activeReqTab === 'params' && (
            queryParams.length > 0 ? (
              <div className="req-params-table">
                {queryParams.map((param, i) => (
                  <div key={i} className="req-param-row">
                    <span className="req-param-key">{param.key}</span>
                    <span className="req-param-val">{param.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="req-config-empty">No query parameters in URL. Add parameters like <code>?key=value</code> to the URL.</div>
            )
          )}

          {activeReqTab === 'headers' && (
            <div className="req-params-table">
              <div className="req-param-row">
                <span className="req-param-key">Accept</span>
                <span className="req-param-val">application/json, text/plain, */*</span>
              </div>
            </div>
          )}

          {activeReqTab === 'body' && (
            <div className="req-config-empty">HTTP GET requests do not send a request body.</div>
          )}
        </div>
      </div>
    </div>
  );
}

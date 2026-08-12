import React, { useState } from 'react';

export default function ResponseViewer({ result, isLoading }) {
  const [activeTab, setActiveTab] = useState('body');
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="response-panel empty-panel">
        <p className="loading-text">Sending HTTP GET request...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="response-panel empty-panel">
        <p className="placeholder-text">Enter an API endpoint above and click <strong>Send</strong> to execute request.</p>
      </div>
    );
  }

  const handleCopy = () => {
    if (!result.formattedData) return;
    navigator.clipboard.writeText(result.formattedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSuccess = result.ok && !result.isError;
  const statusClass = isSuccess ? 'status-2xx' : 'status-4xx';

  return (
    <div className="response-panel">
      {/* Response Meta Header Bar */}
      <div className="response-meta-bar">
        <div className="meta-stats">
          {result.status > 0 ? (
            <span className={`status-pill ${statusClass}`}>
              {result.status} {result.statusText}
            </span>
          ) : (
            <span className="status-pill status-4xx">
              Failed
            </span>
          )}

          <div className="meta-divider"></div>

          <span className="stat-item">
            <span className="stat-label">Time:</span>
            <span className="stat-value">{result.timeMs} ms</span>
          </span>

          <div className="meta-divider"></div>

          <span className="stat-item">
            <span className="stat-label">Size:</span>
            <span className="stat-value">{result.size || '0 B'}</span>
          </span>

          <div className="meta-divider"></div>

          <span className="stat-item">
            <span className="stat-label">Type:</span>
            <span className="stat-value">{result.contentType || 'none'}</span>
          </span>
        </div>

        {activeTab === 'body' && result.formattedData && (
          <button 
            type="button" 
            className="action-copy-btn" 
            onClick={handleCopy}
            aria-label="Copy Response Body"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      {/* Error Callout when request fails */}
      {result.isError && result.errorMessage && (
        <div className="error-banner">
          <span className="error-badge">Error</span>
          <span className="error-message">{result.errorMessage}</span>
        </div>
      )}

      {/* Response Navigation Tabs */}
      <div className="response-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'body' ? 'active' : ''}`}
          onClick={() => setActiveTab('body')}
        >
          Body
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'headers' ? 'active' : ''}`}
          onClick={() => setActiveTab('headers')}
        >
          Headers {result.headers && result.headers.length > 0 ? `(${result.headers.length})` : ''}
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content-area">
        {activeTab === 'body' && (
          result.formattedData ? (
            <pre className="code-viewer">
              <code>{result.formattedData}</code>
            </pre>
          ) : !result.isError ? (
            <div className="empty-tab-state">Empty response body</div>
          ) : null
        )}

        {activeTab === 'headers' && (
          result.headers && result.headers.length > 0 ? (
            <div className="headers-grid">
              {result.headers.map((h, idx) => (
                <div className="header-item-row" key={idx}>
                  <span className="header-key">{h.key}</span>
                  <span className="header-val">{h.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-tab-state">No headers captured or cross-origin restrictions applied.</div>
          )
        )}
      </div>
    </div>
  );
}

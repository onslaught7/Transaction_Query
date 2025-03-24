import { useState } from 'react';
import './Query.css';

const Query = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [pandasCode, setPandasCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/query?user_query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Server response was not OK');
      
      const data = await res.json();
      setResponse(data.response);
      setPandasCode(data.pandas_code || '');
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title-gradient">Data Insight Explorer</h1>
        <p className="subtitle">Transform natural language queries into data insights</p>
      </header>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="query-form">
          <div className="input-group">
            <label htmlFor="query" className="input-label">Enter Your Data Question</label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What was the total revenue from Electronics in 2023?"
              className="query-input"
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Get Insights'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="result-container">
          {pandasCode && (
            <div className="code-section">
              <h3 className="section-title">Generated Analysis</h3>
              <pre className="pandas-code">
                {pandasCode}
              </pre>
            </div>
          )}

          {response && (
            <div className="response-section">
              <h3 className="section-title">Insight Result</h3>
              <div className="response-bubble">
                {response}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Query
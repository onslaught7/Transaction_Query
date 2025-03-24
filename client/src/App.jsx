import { useState } from 'react';
import './App.css';
import Insights from './pages/Insights';
import Query from './pages/Query';

const App = () => {
  const [activeView, setActiveView] = useState('insight');

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title-gradient">Retail Analytics Dashboard</h1>
        <div className="navigation">
          <button
            className={`nav-btn ${activeView === 'insight' ? 'active' : ''}`}
            onClick={() => setActiveView('insight')}
          >
            Insights
          </button>
          <button
            className={`nav-btn ${activeView === 'query' ? 'active' : ''}`}
            onClick={() => setActiveView('query')}
          >
            Custom Query
          </button>
        </div>
      </header>

      <main className="main-content">
        {activeView === 'insight' ? <Insights /> : <Query />}
      </main>

      {activeView === 'insight' && (
        <div className="custom-query-prompt">
          <p>Want to ask specific questions? Switch to <span onClick={() => setActiveView('query')}>Custom Query</span></p>
        </div>
      )}

      <footer className="footer">
        <p>Powered by OpenAI & Pandas | Built with FastAPI & React | Krutibash Mohapatra</p>
      </footer>
    </div>
  );
};

export default App;
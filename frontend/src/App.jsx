import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BorrowPage from './pages/BorrowPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* TASK 1 & 2: Navigation Header with React Router Links */}
        <Navigation />

        {/* Main Content Area */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* TASK 2: Routes configuration */}
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{
          background: '#0a0403',
          borderTop: '1px solid #8c7657',
          padding: '25px 20px',
          textAlign: 'center',
          color: '#8c7657',
          fontSize: '0.9rem',
          marginTop: '40px'
        }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>
            LIBRANOVA • Practical Examination Project Set B
          </p>
          <p style={{ margin: '5px 0 0', fontSize: '0.85rem' }}>
            Roll No: <strong>24DCS074</strong> | Batch: <strong>5CSE1-C</strong> | Repository: <code>itue301-exam-24dcs074-5CSE1-C</code>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

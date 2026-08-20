import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { RefreshCw, AlertTriangle, Filter, X, BookOpen, CheckCircle, XCircle } from 'lucide-react';

const BooksPage = () => {
  // TASK 4: State management for API consumption
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // INTERACTIVE UX FEATURES: State for filter and quick preview modal
  const [availableOnly, setAvailableOnly] = useState(false);
  const [previewBook, setPreviewBook] = useState(null);

  const fetchBooks = () => {
    setLoading(true);
    setError(null);
    
    // TASK 4: Fetch books from Express API endpoint
    fetch('http://localhost:5000/api/v1/books')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          setData(json.data);
        } else {
          throw new Error(json.error || 'Failed to load books');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setError(err.message || 'Could not connect to LIBRANOVA server');
        setLoading(false);
      });
  };

  // TASK 4: useEffect hook to invoke fetch on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on availableOnly toggle state
  const displayedBooks = availableOnly
    ? data.filter((book) => book.available)
    : data;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <span className="volume-badge">VOLUME III • THE COLLECTION</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>THE SCHOLARLY COLLECTION</h2>
        <p style={{ color: '#d9cbb0', fontFamily: 'var(--font-subheading)', fontStyle: 'italic', fontSize: '1.2rem' }}>
          Explore the archived volumes available in the LIBRANOVA catalog.
        </p>
        <div className="ornate-divider">✦ • 🏛️ • ✦</div>
      </div>

      {/* Controls & Filter Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        background: 'var(--bg-mahogany-card)',
        padding: '16px 24px',
        borderRadius: '8px',
        border: '1px solid #8c7657',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={18} color="#d4af37" />
          <span style={{ fontFamily: 'var(--font-heading)', color: '#d4af37', fontSize: '0.9rem' }}>
            FILTER VOLUMES:
          </span>
          
          {/* Interactive Feature: Available Only Toggle */}
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={availableOnly ? 'btn-classical' : 'btn-classical-outline'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            {availableOnly ? '✓ Showing Available Only' : 'Show Available Only'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '0.9rem', color: '#d9cbb0' }}>
            Showing <strong>{displayedBooks.length}</strong> of <strong>{data.length}</strong> volumes
          </span>
          <button
            onClick={fetchBooks}
            className="btn-classical-outline"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            title="Reload from API"
          >
            <RefreshCw size={14} /> RELOAD
          </button>
        </div>
      </div>

      {/* TASK 4: Loading State */}
      {loading && (
        <div className="arch-card" style={{ padding: '50px', textAlign: 'center' }}>
          <RefreshCw size={36} color="#d4af37" className="spin" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '15px' }} />
          <h3 style={{ color: '#d4af37' }}>Retrieving Volumes from Archives...</h3>
          <p style={{ color: '#d9cbb0' }}>Connecting to GET /api/v1/books</p>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* TASK 4: Error State */}
      {error && !loading && (
        <div className="arch-card" style={{ padding: '40px', textAlign: 'center', borderColor: '#ef4444' }}>
          <AlertTriangle size={42} color="#ef4444" style={{ marginBottom: '15px' }} />
          <h3 style={{ color: '#fca5a5' }}>Failed to Retrieve Catalog</h3>
          <p style={{ color: '#ece2c8', margin: '10px 0 20px' }}>{error}</p>
          <button onClick={fetchBooks} className="btn-classical">
            <RefreshCw size={16} /> RETRY CONNECTION
          </button>
        </div>
      )}

      {/* TASK 4: Success State — Render BookCards */}
      {!loading && !error && displayedBooks.length > 0 && (
        <div className="books-grid">
          {displayedBooks.map((book) => (
            <BookCard
              key={book.id || book._id}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
              description={book.description}
              onPreview={setPreviewBook}
            />
          ))}
        </div>
      )}

      {!loading && !error && displayedBooks.length === 0 && (
        <div className="arch-card" style={{ padding: '40px', textAlign: 'center' }}>
          <BookOpen size={36} color="#d4af37" style={{ marginBottom: '10px' }} />
          <h3 style={{ color: '#d4af37' }}>No Volumes Found</h3>
          <p style={{ color: '#d9cbb0' }}>No books match the current filter criteria.</p>
        </div>
      )}

      {/* INTERACTIVE UX FEATURE: Quick Book Preview Modal */}
      {previewBook && (
        <div className="modal-overlay" onClick={() => setPreviewBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewBook(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                color: '#d4af37',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <span className="volume-badge">SCHOLARLY VOLUME PREVIEW</span>
            
            <h2 style={{ fontSize: '1.8rem', color: '#f7f1e3', margin: '10px 0 6px' }}>
              {previewBook.title}
            </h2>
            
            <p style={{ color: '#d4af37', fontFamily: 'var(--font-subheading)', fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '15px' }}>
              Authored by {previewBook.author}
            </p>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#8c7657', fontFamily: 'var(--font-heading)' }}>
                CATEGORY: <strong style={{ color: '#ece2c8' }}>{previewBook.category}</strong>
              </span>

              {previewBook.available ? (
                <span className="badge-available" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={14} /> Available
                </span>
              ) : (
                <span className="badge-unavailable" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <XCircle size={14} /> Not Available
                </span>
              )}
            </div>

            <div className="ornate-divider">📜 • PREVIEW • 📜</div>

            <p style={{ color: '#d9cbb0', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '25px' }}>
              {previewBook.description || 'This classical masterwork is cataloged in the LIBRANOVA main collection. Full text reference available upon request.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setPreviewBook(null)} className="btn-classical">
                CLOSE PREVIEW
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BooksPage;

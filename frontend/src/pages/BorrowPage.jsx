import React, { useState, useEffect } from 'react';
import { Bookmark, Send, CheckCircle, Clock, User, BookOpen, Calendar, RefreshCw, AlertTriangle, ListFilter } from 'lucide-react';

const BorrowPage = () => {
  // TASK 2: Controlled inputs state using useState
  const [formData, setFormData] = useState({
    memberName: 'Heer Patel',
    bookTitle: 'The Iliad & The Odyssey',
    borrowDate: '2026-08-20',
    returnDate: '2026-09-05'
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // State for BORROWING RECORDS section
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [recordsError, setRecordsError] = useState(null);

  // Fetch all combined borrowing records from Express API
  const fetchBorrowings = () => {
    setRecordsLoading(true);
    setRecordsError(null);

    fetch('http://localhost:5000/api/v1/borrowings')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          setRecords(json.data);
        } else {
          throw new Error(json.error || 'Failed to fetch borrowing records');
        }
        setRecordsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching borrowing records:', err);
        setRecordsError(err.message || 'Could not connect to LIBRANOVA server');
        setRecordsLoading(false);
      });
  };

  // Load records on mount
  useEffect(() => {
    fetchBorrowings();
  }, []);

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Call POST /api/v1/borrowings
    fetch('http://localhost:5000/api/v1/borrowings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitting(false);
        setSubmitted(true);
        setApiResponse(data);
        // Automatically refresh borrowing records list after submission
        fetchBorrowings();
      })
      .catch((err) => {
        console.error('Submission error:', err);
        setSubmitting(false);
        setSubmitted(true);
        setApiResponse({ success: false, error: 'Could not connect to backend server' });
      });
  };

  // Helper for status badge rendering
  const renderStatusBadge = (status) => {
    const s = (status || 'borrowed').toLowerCase();
    if (s === 'returned') {
      return (
        <span className="badge-available" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
          ✓ RETURNED
        </span>
      );
    }
    if (s === 'overdue') {
      return (
        <span className="badge-unavailable" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
          ⚠ OVERDUE
        </span>
      );
    }
    return (
      <span style={{
        background: 'rgba(212, 175, 55, 0.2)',
        color: '#f3e2a9',
        border: '1px solid #d4af37',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-subheading)',
        fontWeight: '600'
      }}>
        📖 BORROWED
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <span className="volume-badge">VOLUME IV • BORROW A VOLUME</span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>REQUISITION FORM</h2>
        <p style={{ color: '#d9cbb0', fontFamily: 'var(--font-subheading)', fontStyle: 'italic', fontSize: '1.2rem' }}>
          Submit a scholar requisition to reserve a masterwork from the LIBRANOVA archives.
        </p>
        <div className="ornate-divider">📜 • ✒️ • 📜</div>
      </div>

      {/* Top Grid: Controlled Form & Live Borrowing Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start', marginBottom: '45px' }}>
        
        {/* Controlled Form */}
        <div className="arch-card" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#d4af37', marginBottom: '20px', borderBottom: '1px solid #8c7657', paddingBottom: '10px' }}>
            ENTER REQUISITION DETAILS
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Member Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="memberName">
                MEMBER NAME <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="memberName"
                name="memberName"
                className="form-input"
                placeholder="e.g. Heer Patel"
                value={formData.memberName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Book Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="bookTitle">
                BOOK TITLE <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                className="form-input"
                placeholder="e.g. Principles of Natural Philosophy"
                value={formData.bookTitle}
                onChange={handleChange}
                required
              />
            </div>

            {/* Borrow Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="borrowDate">
                BORROW DATE <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                id="borrowDate"
                name="borrowDate"
                className="form-input"
                value={formData.borrowDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Return Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="returnDate">
                RETURN DATE <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                className="form-input"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-classical"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px' }}
            >
              {submitting ? (
                <>PROCESSING REQUISITION...</>
              ) : (
                <>
                  <Send size={18} /> SUBMIT BORROW REQUISITION
                </>
              )}
            </button>
          </form>

          {submitted && apiResponse && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              borderRadius: '6px',
              background: apiResponse.success ? 'rgba(27, 77, 62, 0.4)' : 'rgba(128, 0, 32, 0.4)',
              border: `1px solid ${apiResponse.success ? '#10b981' : '#ef4444'}`,
              color: apiResponse.success ? '#6ee7b7' : '#fca5a5',
              fontSize: '0.95rem'
            }}>
              {apiResponse.success ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={20} />
                  <span>{apiResponse.message || 'Requisition submitted successfully!'}</span>
                </div>
              ) : (
                <div>Error: {apiResponse.error}</div>
              )}
            </div>
          )}
        </div>

        {/* TASK 2: Live Parchment Preview Card */}
        <div>
          <div className="parchment-preview">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>LIVE BORROWING SUMMARY</h3>
              <span className="wax-seal" style={{ width: '36px', height: '36px', fontSize: '0.75rem' }}>LN</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#785634', margin: '-5px 0 15px 0', fontStyle: 'italic' }}>
              Real-time Controlled Component State (useState)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '15px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={18} color="#800020" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8c7657', fontWeight: 'bold' }}>MEMBER NAME</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a0b08' }}>
                    {formData.memberName || <span style={{ color: '#a08c70', fontStyle: 'italic' }}>[Not entered]</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={18} color="#800020" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8c7657', fontWeight: 'bold' }}>TARGET VOLUME</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a0b08' }}>
                    {formData.bookTitle || <span style={{ color: '#a08c70', fontStyle: 'italic' }}>[Not entered]</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={18} color="#800020" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8c7657', fontWeight: 'bold' }}>ISSUE DATE</div>
                  <div style={{ fontSize: '1rem', color: '#281710' }}>
                    {formData.borrowDate || <span style={{ color: '#a08c70' }}>YYYY-MM-DD</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="#800020" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8c7657', fontWeight: 'bold' }}>EXPECTED RETURN</div>
                  <div style={{ fontSize: '1rem', color: '#281710' }}>
                    {formData.returnDate || <span style={{ color: '#a08c70' }}>YYYY-MM-DD</span>}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #8c7657', paddingTop: '12px', marginTop: '15px', fontSize: '0.85rem', color: '#685036', textAlign: 'center' }}>
              OFFICIAL LIBRANOVA ARCHIVAL REQUISITION
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================================
          NEW SECTION: UNIFIED BORROWING RECORDS LIST BELOW
          ========================================================== */}
      <div className="arch-card" style={{ padding: '30px' }}>
        
        {/* Section Header with Title & Refresh Records Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          borderBottom: '1px dashed #8c7657',
          paddingBottom: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <span className="volume-badge" style={{ marginBottom: '4px' }}>VOLUME V • REQUISITION LOG</span>
            <h3 style={{ fontSize: '1.6rem', color: '#f7f1e3', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ListFilter size={22} color="#d4af37" /> BORROWING RECORDS
            </h3>
          </div>

          <button
            onClick={fetchBorrowings}
            className="btn-classical-outline"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            disabled={recordsLoading}
          >
            <RefreshCw size={14} className={recordsLoading ? 'spin' : ''} /> REFRESH RECORDS
          </button>
        </div>

        {/* Loading State */}
        {recordsLoading && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <RefreshCw size={32} color="#d4af37" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '12px' }} />
            <p style={{ color: '#d4af37', fontFamily: 'var(--font-heading)' }}>Retrieving Archival Borrowing Records...</p>
          </div>
        )}

        {/* Error State */}
        {recordsError && !recordsLoading && (
          <div style={{ padding: '25px', textAlign: 'center', background: 'rgba(128, 0, 32, 0.3)', border: '1px solid #ef4444', borderRadius: '6px', margin: '15px 0' }}>
            <AlertTriangle size={32} color="#ef4444" style={{ marginBottom: '8px' }} />
            <h4 style={{ color: '#fca5a5', margin: '0 0 6px 0' }}>Failed to Fetch Records</h4>
            <p style={{ color: '#ece2c8', fontSize: '0.95rem', marginBottom: '15px' }}>{recordsError}</p>
            <button onClick={fetchBorrowings} className="btn-classical" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
              <RefreshCw size={14} /> RETRY
            </button>
          </div>
        )}

        {/* Single Unified Records Table */}
        {!recordsLoading && !recordsError && records.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: '#ece2c8',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem'
            }}>
              <thead>
                <tr style={{
                  background: 'rgba(18, 9, 7, 0.9)',
                  borderBottom: '2px solid #d4af37',
                  textAlign: 'left'
                }}>
                  <th style={{ padding: '12px 15px', color: '#d4af37', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>MEMBER</th>
                  <th style={{ padding: '12px 15px', color: '#d4af37', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>BOOK</th>
                  <th style={{ padding: '12px 15px', color: '#d4af37', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>BORROW DATE</th>
                  <th style={{ padding: '12px 15px', color: '#d4af37', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>RETURN DATE</th>
                  <th style={{ padding: '12px 15px', color: '#d4af37', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, idx) => (
                  <tr
                    key={rec.id || idx}
                    style={{
                      borderBottom: '1px solid rgba(140, 118, 87, 0.2)',
                      background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <td style={{ padding: '14px 15px', fontWeight: '600', color: '#f7f1e3' }}>
                      {rec.memberName || 'Scholar Member'}
                    </td>
                    <td style={{ padding: '14px 15px', color: '#d4af37', fontFamily: 'var(--font-subheading)', fontStyle: 'italic', fontSize: '1.05rem' }}>
                      {rec.bookTitle || 'Archival Masterwork'}
                    </td>
                    <td style={{ padding: '14px 15px', color: '#d9cbb0' }}>
                      {rec.borrowDate || 'N/A'}
                    </td>
                    <td style={{ padding: '14px 15px', color: '#d9cbb0' }}>
                      {rec.returnDate || 'N/A'}
                    </td>
                    <td style={{ padding: '14px 15px' }}>
                      {renderStatusBadge(rec.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty Records State */}
        {!recordsLoading && !recordsError && records.length === 0 && (
          <div style={{ padding: '30px', textAlign: 'center', color: '#d9cbb0' }}>
            <p>No borrowing records currently found in the repository.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default BorrowPage;

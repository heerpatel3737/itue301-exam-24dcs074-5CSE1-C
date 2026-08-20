import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Library, Bookmark, Feather } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navigation-header" style={{
      background: 'linear-gradient(180deg, #1a0b08 0%, #120604 100%)',
      borderBottom: '2px solid #d4af37',
      boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '15px 30px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        {/* Brand & Tagline */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="wax-seal">
            <Library size={22} color="#f3e2a9" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: '#f7f1e3', margin: 0, lineHeight: 1 }}>
              LIBRANOVA
            </h1>
            <p style={{
              fontFamily: 'var(--font-subheading)',
              color: '#d4af37',
              fontSize: '0.9rem',
              margin: 0,
              fontStyle: 'italic',
              letterSpacing: '1px'
            }}>
              "Your Books. Your Knowledge. Your Library."
            </p>
          </div>
        </Link>

        {/* Student Details Pill */}
        <div style={{
          background: 'rgba(40, 23, 16, 0.8)',
          border: '1px solid #8c7657',
          padding: '4px 14px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          color: '#ece2c8',
          fontFamily: 'var(--font-heading)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Feather size={14} color="#d4af37" />
          <span>Roll No: <strong>24DCS074</strong> | Batch: <strong>5CSE1-C</strong></span>
        </div>

        {/* TASK 2: React Router Navigation Links */}
        <nav style={{ display: 'flex', gap: '10px' }}>
          <Link
            to="/"
            className={isActive('/') ? 'btn-classical' : 'btn-classical-outline'}
            style={{ fontSize: '0.85rem', padding: '8px 18px' }}
          >
            <BookOpen size={16} /> HOME
          </Link>
          <Link
            to="/books"
            className={isActive('/books') ? 'btn-classical' : 'btn-classical-outline'}
            style={{ fontSize: '0.85rem', padding: '8px 18px' }}
          >
            <Library size={16} /> BOOKS
          </Link>
          <Link
            to="/borrow"
            className={isActive('/borrow') ? 'btn-classical' : 'btn-classical-outline'}
            style={{ fontSize: '0.85rem', padding: '8px 18px' }}
          >
            <Bookmark size={16} /> BORROW
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

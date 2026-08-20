import React from 'react';
import { BookOpen, CheckCircle, XCircle, Eye } from 'lucide-react';

/**
 * TASK 1: BookCard Component
 * Props: title, author, category, available, onPreview
 * Available vs Not Available styles visually distinct.
 */
const BookCard = ({ title, author, category, available, description, onPreview }) => {
  return (
    <div className="arch-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        {/* Category Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="volume-badge" style={{ fontSize: '0.75rem', marginBottom: 0 }}>
            {category || 'CLASSICAL LITERATURE'}
          </span>
          
          {/* TASK 1: Visually distinct Available vs Not Available badges */}
          {available ? (
            <span className="badge-available" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={14} /> Available
            </span>
          ) : (
            <span className="badge-unavailable" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <XCircle size={14} /> Not Available
            </span>
          )}
        </div>

        {/* Book Title & Author */}
        <h3 style={{ fontSize: '1.4rem', color: '#f7f1e3', marginBottom: '8px', lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontFamily: 'var(--font-subheading)', color: '#d4af37', fontStyle: 'italic', fontSize: '1.05rem', marginBottom: '16px' }}>
          By {author}
        </p>
      </div>

      <div style={{ borderTop: '1px dashed rgba(212, 175, 55, 0.25)', paddingTop: '14px', marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: '#8c7657', fontFamily: 'var(--font-heading)' }}>
          LIBRANOVA CAT.
        </span>

        {/* Interactive Feature: Quick Preview Button */}
        {onPreview && (
          <button
            onClick={() => onPreview({ title, author, category, available, description })}
            className="btn-classical-outline"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Eye size={14} /> PREVIEW
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;

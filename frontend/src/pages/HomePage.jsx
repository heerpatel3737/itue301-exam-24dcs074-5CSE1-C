import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Bookmark, Award, ShieldCheck, Scroll } from 'lucide-react';

const HomePage = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      
      {/* Classical Hero Header */}
      <div className="arch-card" style={{ padding: '60px 30px', marginBottom: '40px' }}>
        <span className="volume-badge">VOLUME I • THE LIBRARY</span>
        
        <h1 style={{ fontSize: '3.5rem', color: '#f7f1e3', margin: '15px 0 10px', textTransform: 'uppercase', letterSpacing: '3px' }}>
          LIBRANOVA
        </h1>
        
        <p style={{
          fontFamily: 'var(--font-subheading)',
          color: '#d4af37',
          fontSize: '1.5rem',
          fontStyle: 'italic',
          marginBottom: '30px'
        }}>
          "Your Books. Your Knowledge. Your Library."
        </p>

        <div className="ornate-divider">📜 • ⚔️ • 📜</div>

        <p style={{ maxWidth: '650px', margin: '0 auto 35px', color: '#d9cbb0', fontSize: '1.15rem' }}>
          Welcome to the scholarly repository of human wisdom. Explore classical masterworks, mathematical treatises, and philosophical discourses preserved across centuries.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/books" className="btn-classical">
            <BookOpen size={18} /> EXPLORE BOOKS
          </Link>
          <Link to="/borrow" className="btn-classical-outline">
            <Bookmark size={18} /> BORROW A BOOK
          </Link>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        <div className="arch-card" style={{ padding: '30px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#d4af37' }}>
            <Scroll size={24} />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>VOLUME II: ARCHIVES</h3>
          </div>
          <p style={{ fontSize: '1rem', color: '#d9cbb0' }}>
            Browse through curated categories of classical literature, metaphysics, natural philosophy, and geometry.
          </p>
        </div>

        <div className="arch-card" style={{ padding: '30px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#d4af37' }}>
            <Award size={24} />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>SCHOLARLY PREVIEW</h3>
          </div>
          <p style={{ fontSize: '1rem', color: '#d9cbb0' }}>
            Inspect book summaries and availability in real time with our instant preview modal and live status indicators.
          </p>
        </div>

        <div className="arch-card" style={{ padding: '30px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#d4af37' }}>
            <ShieldCheck size={24} />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>EXAM VERIFIED</h3>
          </div>
          <p style={{ fontSize: '1rem', color: '#d9cbb0' }}>
            Built for Practical Exam Set B (Roll No: 24DCS074 | 5CSE1-C) using React, Express REST APIs, and MongoDB Mongoose.
          </p>
        </div>
      </div>

    </div>
  );
};

export default HomePage;

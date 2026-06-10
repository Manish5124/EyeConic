'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className={`about-page ${visible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="container">
        {/* Back Link */}
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Hero Banner */}
        <div className="about-hero">
          <div className="overlay" />
          <div className="hero-content">
            <span className="section-label">OUR STORY</span>
            <h1 className="hero-title">About <strong>TheEyeConic</strong></h1>
            <p className="hero-subtitle">Redefining eyewear with premium materials, Japanese design philosophy, and absolute transparency.</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="about-content">
          <div className="story-section">
            <h2>The Vision</h2>
            <p>
              Founded in 2026, TheEyeConic set out with a simple mission: to make premium, stylish eyewear accessible to everyone. We believe that glasses are not just a medical necessity, but a key expression of your personal style.
            </p>
            <p>
              By eliminating unnecessary middlemen and designing our frames in-house, we offer high-grade lenses and designer frames at a fraction of standard retail prices.
            </p>
          </div>

          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <CheckCircle className="icon" />
                <h3>Japanese Quality</h3>
                <p>All our frames undergo strict quality checks using Japanese craftsmanship standards.</p>
              </div>

              <div className="value-card">
                <CheckCircle className="icon" />
                <h3>Transparent Pricing</h3>
                <p>No hidden charges. Frame price includes high-quality anti-glare single vision lenses.</p>
              </div>

              <div className="value-card">
                <CheckCircle className="icon" />
                <h3>Customer First</h3>
                <p>30-day return policy and a comprehensive 1-year warranty on all products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page {
          padding: 120px 0 80px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .about-page.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .back-link:hover {
          color: var(--color-accent);
        }

        /* ===== HERO ===== */
        .about-hero {
          position: relative;
          height: 300px;
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          background-image: url('https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1600&h=600&fit=crop');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          margin-bottom: 60px;
        }

        .about-hero .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          padding: 20px;
        }

        .hero-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          letter-spacing: -1px;
          margin: 12px 0;
        }

        .hero-title strong {
          font-weight: 600;
        }

        .hero-subtitle {
          font-size: 16px;
          font-weight: 300;
          opacity: 0.9;
        }

        /* ===== CONTENT ===== */
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
        }

        .story-section h2,
        .values-section h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .story-section p {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-weight: 300;
        }

        .values-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .value-card {
          padding: 20px;
          border-radius: var(--radius-md, 8px);
          background: var(--bg-secondary, #faf9f7);
          border: 1px solid var(--border);
        }

        .value-card .icon {
          color: var(--color-accent);
          margin-bottom: 12px;
        }

        .value-card h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .value-card p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </main>
  );
}
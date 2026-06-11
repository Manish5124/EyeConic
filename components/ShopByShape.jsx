'use client';
import Image from 'next/image';
import Link from 'next/link';
import shapes from '../data/shapes';

export default function ShopByShape() {
  return (
    <section className="shape-section">
      <div className="container">
        {/* Header */}
        <div className="shape-header">
          <span className="section-label">FIND YOUR FIT</span>
          <h2 className="section-title">
            Shop by <strong>Frame Shape</strong>
          </h2>
          <p className="shape-subtitle">
            Not sure what suits you? Explore by silhouette and find the perfect
            match for your face shape.
          </p>
        </div>

        {/* Grid */}
        <div className="shape-grid">
          {shapes.map((shape) => (
            <Link
              key={shape.slug}
              href={`/products?shape=${shape.slug}`}
              className="shape-card"
              aria-label={`Shop ${shape.name} frames`}
            >
              {/* Image */}
              <div className="shape-img-wrap">
                <Image
                  src={shape.img}
                  alt={`${shape.name} glasses frame`}
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="shape-img"
                />
                {/* Gradient overlay */}
                <div className="shape-overlay" />
                {/* Label badge */}
                <span className="shape-badge">{shape.label}</span>
              </div>

              {/* Info */}
              <div className="shape-info">
                <div className="shape-text">
                  <p className="shape-name">{shape.name}</p>
                  <p className="shape-desc">{shape.desc}</p>
                </div>
                <span className="shape-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="shape-cta">
          <Link href="/products" className="btn btn-outline">
            View All Frames
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* ===== SECTION ===== */
        .shape-section {
          padding: var(--section-padding, 80px 0);
          background: var(--bg-secondary);
        }

        /* ===== HEADER ===== */
        .shape-header {
          text-align: center;
          margin-bottom: 52px;
        }

        .shape-subtitle {
          margin-top: 14px;
          font-size: 15px;
          color: var(--text-secondary);
          font-weight: 300;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        /* ===== GRID ===== */
        .shape-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        /* ===== CARD ===== */
        .shape-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          background: var(--bg);
          border: 1px solid var(--border);
          text-decoration: none;
          color: var(--text);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.25s ease;
        }

        .shape-card:hover {
          transform: translateY(-8px);
          border-color: var(--color-accent, #c9a96e);
          box-shadow: 0 20px 50px rgba(201, 169, 110, 0.18);
        }

        /* ===== IMAGE WRAPPER ===== */
        .shape-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .shape-img {
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .shape-card:hover .shape-img {
          transform: scale(1.08);
        }

        /* dark gradient at bottom of image */
        .shape-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 30%,
            rgba(0, 0, 0, 0.52) 100%
          );
          z-index: 1;
        }

        /* floating label badge */
        .shape-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #fff;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .shape-card:hover .shape-badge {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== INFO ROW ===== */
        .shape-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 18px;
          gap: 8px;
        }

        .shape-name {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
          margin-bottom: 3px;
        }

        .shape-desc {
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.4px;
        }

        .shape-arrow {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.25s ease;
        }

        .shape-card:hover .shape-arrow {
          background: var(--color-accent, #c9a96e);
          border-color: var(--color-accent, #c9a96e);
          color: #fff;
          transform: translateX(2px);
        }

        /* ===== VIEW ALL CTA ===== */
        .shape-cta {
          text-align: center;
          margin-top: 48px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1100px) {
          .shape-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 900px) {
          .shape-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 480px) {
          .shape-section {
            padding: 50px 0;
          }
          .shape-header {
            margin-bottom: 32px;
          }
          .shape-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .shape-info {
            padding: 12px 14px;
          }
          .shape-name {
            font-size: 13px;
          }
          .shape-arrow {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </section>
  );
}

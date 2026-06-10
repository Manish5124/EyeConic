'use client';
import { useRef, useEffect, useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function ShopCategory() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      id: 1,
      title: 'Men\'s Eyewear',
      subtitle: 'Classic & Contemporary',
      count: '120+ Styles',
      img: '/cat-men.png',
    },
    {
      id: 2,
      title: 'Women\'s Eyewear',
      subtitle: 'Elegant & Bold',
      count: '150+ Styles',
      img: '/cat-women.png',
    },
    {
      id: 3,
      title: 'Kids\' Eyewear',
      subtitle: 'Fun & Durable',
      count: '80+ Styles',
      img: '/cat-kids.png',
    },
  ];

  return (
    <section className={`shop-category ${visible ? 'visible' : ''}`} ref={sectionRef} id="shop-category">
      <div className="section-header">
        <div>
          <span className="label">CATEGORIES</span>
          <h2 className="title">Shop by <strong>Collection</strong></h2>
        </div>
        <button className="view-all">
          View All
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="grid">
        {categories.map((cat, index) => (
          <div
            className="category-card"
            key={cat.id}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="card-image">
              <img src={cat.img} alt={cat.title} />
              <div className="card-overlay" />
            </div>

            <div className="card-content">
              <p className="card-count">{cat.count}</p>
              <h3 className="card-title">{cat.title}</h3>
              <p className="card-subtitle">{cat.subtitle}</p>

              <button className="card-cta">
                Explore
                <ChevronRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .shop-category {
          padding: var(--section-padding, 80px 0);
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          padding-left: 40px;
          padding-right: 40px;
        }

        /* ===== SECTION HEADER ===== */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .shop-category.visible .section-header {
          opacity: 1;
          transform: translateY(0);
        }

        .label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-accent, #c9a96e);
          display: block;
          margin-bottom: 8px;
        }

        .title {
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 300;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .title strong {
          font-weight: 600;
        }

        .view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 8px 0;
          border-bottom: 1px solid transparent;
          transition: all var(--transition-fast, 0.2s ease);
        }

        .view-all:hover {
          color: var(--color-accent, #c9a96e);
          border-bottom-color: var(--color-accent, #c9a96e);
        }

        /* ===== GRID ===== */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ===== CARD ===== */
        .category-card {
          position: relative;
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          aspect-ratio: 3 / 4;
          cursor: pointer;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .shop-category.visible .category-card {
          opacity: 1;
          transform: translateY(0);
        }

        .card-image {
          position: absolute;
          inset: 0;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-card:hover .card-image img {
          transform: scale(1.08);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 30%,
            rgba(0, 0, 0, 0.7) 100%
          );
          transition: background 0.4s ease;
        }

        .category-card:hover .card-overlay {
          background: linear-gradient(
            180deg,
            transparent 20%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }

        /* ===== CARD CONTENT ===== */
        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px;
          z-index: 2;
          color: #fff;
        }

        .card-count {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--color-accent, #c9a96e);
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 4px;
          letter-spacing: -0.3px;
        }

        .card-subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }

        .card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #fff;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .category-card:hover .card-cta {
          opacity: 1;
          transform: translateY(0);
        }

        .card-cta:hover {
          color: var(--color-accent, #c9a96e);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }

          .grid .category-card:last-child {
            grid-column: span 2;
            aspect-ratio: 16 / 9;
          }
        }

        @media (max-width: 600px) {
          .shop-category {
            padding-left: 20px;
            padding-right: 20px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .grid .category-card:last-child {
            grid-column: span 1;
            aspect-ratio: 3 / 4;
          }

          .category-card {
            aspect-ratio: 4 / 5;
          }

          .card-content {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
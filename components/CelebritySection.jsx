'use client';
import { useRef, useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function CelebritySection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const data = [
    {
      id: 1,
      name: 'Aditya Seal',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
      product: 'Illume | Shine Black Polarized',
      price: '₹1,199',
      oldPrice: '₹3,000',
    },
    {
      id: 2,
      name: 'Prince Narula',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      product: 'The OG | Round Black Silver',
      price: '₹1,099',
      oldPrice: '₹3,000',
    },
    {
      id: 3,
      name: 'Manish Paul',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
      product: 'Spectre | Silver-Black Retro',
      price: '₹1,099',
      oldPrice: '₹3,000',
    },
    {
      id: 4,
      name: 'Parineeti Chopra',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      product: 'Orbit | Silver Black Round',
      price: '₹1,099',
      oldPrice: '₹3,000',
    },
  ];

  return (
    <section className={`celebrity-section ${visible ? 'visible' : ''}`} ref={sectionRef} id="celebrity-spotted">
      {/* Background accent */}
      <div className="bg-accent" />

      <div className="inner">
        <div className="section-header">
          <div>
            <span className="label">STYLE ICONS</span>
            <h2 className="title">Celebrity <strong>Spotted</strong></h2>
            <p className="subtitle">Get the exact look worn by your favorite celebrities</p>
          </div>
          <button className="view-all">
            View All Celeb Looks
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid">
          {data.map((item, index) => (
            <div
              className="celeb-card"
              key={item.id}
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              {/* Image */}
              <div className="card-image">
                <img src={item.img} alt={item.name} loading="lazy" />
                <div className="card-gradient" />

                {/* Celebrity name overlay */}
                <div className="celeb-name-overlay">
                  <span className="celeb-name">{item.name}</span>
                </div>
              </div>

              {/* Product info */}
              <div className="card-info">
                <p className="product-name">{item.product}</p>

                <div className="price-row">
                  <div className="price-group">
                    <span className="price">{item.price}</span>
                    <span className="old-price">{item.oldPrice}</span>
                  </div>

                  <button className="add-btn" aria-label="Add to cart">
                    <ShoppingBag size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .celebrity-section {
          position: relative;
          padding: var(--section-padding, 80px 0);
          overflow: hidden;
        }

        .bg-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg-secondary, #faf9f7);
          z-index: 0;
        }

        .inner {
          position: relative;
          z-index: 1;
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          padding: 0 40px;
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

        .celebrity-section.visible .section-header {
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
          margin-bottom: 8px;
        }

        .title strong {
          font-weight: 600;
        }

        .subtitle {
          font-size: 15px;
          color: var(--text-secondary, #555);
          font-weight: 300;
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
          white-space: nowrap;
        }

        .view-all:hover {
          color: var(--color-accent, #c9a96e);
          border-bottom-color: var(--color-accent, #c9a96e);
        }

        /* ===== GRID ===== */
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* ===== CARD ===== */
        .celeb-card {
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          background: var(--card-bg, #fff);
          border: 1px solid var(--border, #e8e6e3);
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .celebrity-section.visible .celeb-card {
          opacity: 1;
          transform: translateY(0);
        }

        .celeb-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl, 0 20px 60px rgba(0,0,0,0.15));
          border-color: transparent;
        }

        /* ===== CARD IMAGE ===== */
        .card-image {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .celeb-card:hover .card-image img {
          transform: scale(1.06);
        }

        .card-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(transparent, rgba(0,0,0,0.5));
          pointer-events: none;
        }

        .celeb-name-overlay {
          position: absolute;
          bottom: 14px;
          left: 14px;
        }

        .celeb-name {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: var(--radius-full, 9999px);
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          color: #fff;
        }

        /* ===== CARD INFO ===== */
        .card-info {
          padding: 16px 18px 20px;
        }

        .product-name {
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 12px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .price {
          font-size: 16px;
          font-weight: 700;
        }

        .old-price {
          font-size: 13px;
          color: var(--text-secondary, #555);
          text-decoration: line-through;
        }

        .add-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-primary, #1a1a2e);
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s ease);
        }

        .add-btn:hover {
          background: var(--color-accent, #c9a96e);
          transform: scale(1.1);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 992px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .inner {
            padding: 0 20px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .card-image {
            height: 220px;
          }

          .card-info {
            padding: 12px 14px 16px;
          }
        }
      `}</style>
    </section>
  );
}
'use client';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';

export default function TrendingCategory() {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const amount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const cards = [
    {
      id: 1,
      name: 'UNDERDOG',
      type: 'Aviator Sunglasses',
      price: '₹1,099',
      oldPrice: '₹3,000',
      badge: 'BESTSELLER',
      img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=600&fit=crop',
    },
    {
      id: 2,
      name: 'MAVERICK',
      type: 'Round Eyeglasses',
      price: '₹1,299',
      oldPrice: '₹3,500',
      badge: 'NEW',
      img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=600&fit=crop',
    },
    {
      id: 3,
      name: 'CO-PILOT',
      type: 'Wayfarer Sunglasses',
      price: '₹1,099',
      oldPrice: '₹3,000',
      badge: 'TRENDING',
      img: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=600&fit=crop',
    },
    {
      id: 4,
      name: 'ARROW',
      type: 'Rectangle Eyeglasses',
      price: '₹1,199',
      oldPrice: '₹3,000',
      badge: 'NEW',
      img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=600&fit=crop',
    },
    {
      id: 5,
      name: 'SPECTRA',
      type: 'Cat Eye Sunglasses',
      price: '₹1,399',
      oldPrice: '₹3,500',
      badge: 'POPULAR',
      img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=600&fit=crop',
    },
    {
      id: 6,
      name: 'ORBIT',
      type: 'Hexagonal Frames',
      price: '₹1,499',
      oldPrice: '₹4,000',
      badge: 'PREMIUM',
      img: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&h=600&fit=crop',
    },
  ];

  return (
    <section className={`trending ${visible ? 'visible' : ''}`} ref={sectionRef} id="trending">
      <div className="trending-header">
        <div>
          <span className="label">CURATED FOR YOU</span>
          <h2 className="title">Trending <strong>This Week</strong></h2>
        </div>

        <div className="header-actions">
          <button className="view-all">
            View All
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
          <div className="scroll-btns">
            <button
              className={`scroll-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              className={`scroll-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="slider" ref={sliderRef}>
        {cards.map((card, index) => (
          <div
            className="card"
            key={card.id}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {/* Image Section */}
            <div className="card-image">
              <img src={card.img} alt={card.name} loading="lazy" />
              <div className="card-gradient" />

              {/* Badge */}
              <span className="card-badge">{card.badge}</span>

              {/* Quick Add */}
              <button className="quick-add" aria-label="Add to cart">
                <ShoppingBag size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Info */}
            <div className="card-info">
              <p className="card-type">{card.type}</p>
              <h3 className="card-name">{card.name}</h3>

              <div className="card-price">
                <span className="current">{card.price}</span>
                <span className="old">{card.oldPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trending {
          padding: var(--section-padding, 80px 0);
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          padding-left: 40px;
          padding-right: 40px;
        }

        /* ===== HEADER ===== */
        .trending-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .trending.visible .trending-header {
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

        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
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

        .scroll-btns {
          display: flex;
          gap: 8px;
        }

        .scroll-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--border, #e8e6e3);
          background: var(--bg);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s ease);
        }

        .scroll-btn:hover:not(.disabled) {
          border-color: var(--color-accent, #c9a96e);
          color: var(--color-accent, #c9a96e);
        }

        .scroll-btn.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* ===== SLIDER ===== */
        .slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          padding-bottom: 8px;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        /* ===== CARD ===== */
        .card {
          flex-shrink: 0;
          width: 260px;
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          background: var(--card-bg, #fff);
          border: 1px solid var(--border, #e8e6e3);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          scroll-snap-align: start;
          opacity: 0;
          transform: translateY(30px);
        }

        .trending.visible .card {
          opacity: 1;
          transform: translateY(0);
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg, 0 8px 40px rgba(0,0,0,0.12));
          border-color: transparent;
        }

        /* ===== CARD IMAGE ===== */
        .card-image {
          position: relative;
          height: 320px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card:hover .card-image img {
          transform: scale(1.06);
        }

        .card-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(transparent, rgba(0,0,0,0.3));
          pointer-events: none;
        }

        .card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: var(--radius-full, 9999px);
          background: var(--color-accent, #c9a96e);
          color: #fff;
        }

        .quick-add {
          position: absolute;
          bottom: 14px;
          right: 14px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          border: none;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        .card:hover .quick-add {
          opacity: 1;
          transform: translateY(0);
        }

        .quick-add:hover {
          background: var(--color-primary, #1a1a2e);
          color: #fff;
        }

        /* ===== CARD INFO ===== */
        .card-info {
          padding: 18px 18px 20px;
        }

        .card-type {
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-secondary, #555);
          margin-bottom: 4px;
        }

        .card-name {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.2px;
          margin-bottom: 10px;
        }

        .card-price {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .current {
          font-size: 16px;
          font-weight: 700;
        }

        .old {
          font-size: 13px;
          color: var(--text-secondary, #555);
          text-decoration: line-through;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .trending {
            padding-left: 20px;
            padding-right: 20px;
          }

          .trending-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .card {
            width: 220px;
          }

          .card-image {
            height: 260px;
          }

          .scroll-btns {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

'use client';
import { useRef, useEffect, useState } from 'react';
import { Heart, ShoppingBag, Eye, ArrowRight, Check } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import Link from 'next/link';

export default function ProductGrid() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { toggleWishlist, isInWishlist, addToCart, isInCart } = useCartWishlist();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);


  const products = [
    {
      id: 1,
      name: 'Dax | Aviator Black',
      type: 'RIMLESS / MEN',
      img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=400&fit=crop',
      price: '₹1,399',
      oldPrice: '₹3,000',
      discount: '-53%',
      badge: 'NEW',
      colors: ['#1a1a1a', '#c9a96e', '#8b4513', '#c0c0c0'],
    },
    {
      id: 2,
      name: 'Luna | Cat Eye Violet',
      type: 'CAT EYE / WOMEN',
      img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=400&fit=crop',
      price: '₹1,599',
      oldPrice: '₹3,500',
      discount: '-54%',
      badge: 'TRENDING',
      colors: ['#6b21a8', '#1a1a1a', '#ec4899'],
    },
    {
      id: 3,
      name: 'Atlas | Round Tortoise',
      type: 'ROUND / UNISEX',
      img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=400&fit=crop',
      price: '₹1,299',
      oldPrice: '₹3,000',
      discount: '-57%',
      badge: 'BESTSELLER',
      colors: ['#8b4513', '#1a1a1a', '#c9a96e'],
    },
    {
      id: 4,
      name: 'Titan | Rectangle Matte',
      type: 'RECTANGLE / MEN',
      img: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=400&fit=crop',
      price: '₹1,499',
      oldPrice: '₹3,000',
      discount: '-50%',
      badge: null,
      colors: ['#1a1a1a', '#0f172a', '#6b21a8'],
    },
    {
      id: 5,
      name: 'Nova | Oversized Square',
      type: 'SQUARE / WOMEN',
      img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&h=400&fit=crop',
      price: '₹1,699',
      oldPrice: '₹4,000',
      discount: '-58%',
      badge: 'NEW',
      colors: ['#1a1a1a', '#c9a96e', '#e53e3e'],
    },
    {
      id: 6,
      name: 'Vega | Classic Wayfarer',
      type: 'WAYFARER / UNISEX',
      img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&h=400&fit=crop',
      price: '₹1,199',
      oldPrice: '₹2,500',
      discount: '-52%',
      badge: 'POPULAR',
      colors: ['#1a1a1a', '#8b4513'],
    },
    {
      id: 7,
      name: 'Aura | Geometric Gold',
      type: 'GEOMETRIC / WOMEN',
      img: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500&h=400&fit=crop',
      price: '₹1,899',
      oldPrice: '₹4,500',
      discount: '-58%',
      badge: 'PREMIUM',
      colors: ['#c9a96e', '#c0c0c0', '#1a1a1a'],
    },
    {
      id: 8,
      name: 'Peter Jones',
      type: 'SHIELD / Unisex',
      img: '/frame/peter.png',
      price: '₹526',
      oldPrice: '₹1,100',
      discount: '-54%',
      badge: null,
      colors: ['#1a1a1a', '#0284c7', '#16a34a'],
    },
  ];

  return (
    <section className={`product-section ${visible ? 'visible' : ''}`} ref={sectionRef} id="product-grid">
      <div className="inner">
        <div className="section-header">
          <div>
            <span className="label">OUR COLLECTION</span>
            <h2 className="sec-title">Best <strong>Sellers</strong></h2>
          </div>
          <button className="view-all">
            View All Products
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid">
          {products.map((item, index) => (
            <div
              className="product-card"
              key={item.id}
              style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
            >
              {/* Image Section */}
              <div className="card-image">
                <img src={item.img} alt={item.name} loading="lazy" />

                {/* Badge */}
                {item.badge && (
                  <span className="card-badge">{item.badge}</span>
                )}

                {/* Wishlist */}
                <button
                  className={`wishlist-btn ${isInWishlist(item.id) ? 'liked' : ''}`}
                  onClick={() => toggleWishlist(item)}
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} strokeWidth={1.5} fill={isInWishlist(item.id) ? '#e53e3e' : 'none'} />
                </button>

                {/* Hover Actions */}
                <div className="hover-actions">
                  <button className="action-btn" aria-label="Quick view">
                    <Eye size={16} strokeWidth={1.5} />
                    <span>Quick View</span>
                  </button>
                  {isInCart(item.id) ? (
                    <Link href="/cart" className="action-btn in-cart" aria-label="Go to cart">
                      <Check size={16} strokeWidth={1.5} />
                      <span>In Cart</span>
                    </Link>
                  ) : (
                    <button
                      className="action-btn primary"
                      aria-label="Add to cart"
                      onClick={() => addToCart(item, item.colors ? item.colors[0] : null)}
                    >
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Color dots */}
              <div className="color-dots">
                {item.colors.map((color, i) => (
                  <span
                    key={i}
                    className={`color-dot ${i === 0 ? 'active' : ''}`}
                    style={{ background: color }}
                  />
                ))}
              </div>

              {/* Info */}
              <div className="card-info">
                <p className="card-type">{item.type}</p>
                <h3 className="card-name">{item.name}</h3>

                <div className="card-price">
                  <strong className="current">{item.price}</strong>
                  <span className="old">{item.oldPrice}</span>
                  <span className="discount">{item.discount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="load-more-wrap">
          <button className="load-more-btn">
            Load More Products
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-section {
          padding: var(--section-padding, 80px 0);
        }

        .inner {
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ===== HEADER ===== */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .product-section.visible .section-header {
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

        .sec-title {
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 300;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .sec-title strong {
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
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* ===== CARD ===== */
        .product-card {
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          background: var(--card-bg, #fff);
          border: 1px solid var(--border, #e8e6e3);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-section.visible .product-card {
          opacity: 1;
          transform: translateY(0);
        }

        .product-card:hover {
          border-color: transparent;
          box-shadow: var(--shadow-lg, 0 8px 40px rgba(0,0,0,0.12));
        }

        /* ===== CARD IMAGE ===== */
        .card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: var(--bg-secondary, #faf9f7);
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .card-image img {
          transform: scale(1.06);
        }

        .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: var(--radius-full, 9999px);
          background: var(--color-primary, #1a1a2e);
          color: #fff;
        }

        .wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          border: none;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s ease);
          opacity: 0;
          transform: scale(0.8);
        }

        .product-card:hover .wishlist-btn {
          opacity: 1;
          transform: scale(1);
        }

        .wishlist-btn.liked {
          opacity: 1;
          transform: scale(1);
          color: #e53e3e;
        }

        .wishlist-btn:hover {
          transform: scale(1.15);
        }

        /* ===== HOVER ACTIONS ===== */
        .hover-actions {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          display: flex;
          gap: 8px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .product-card:hover .hover-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 0;
          border-radius: var(--radius-md, 8px);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s ease);
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border, #e8e6e3);
          color: var(--color-text, #1a1a1a);
        }

        .action-btn.primary {
          background: var(--color-primary, #1a1a2e);
          color: #fff;
          border-color: transparent;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .action-btn.primary:hover {
          background: var(--color-accent, #c9a96e);
        }

        .action-btn.in-cart {
          background: #dcfce7;
          color: #16a34a;
          border-color: #86efac;
          font-weight: 700;
        }

        .action-btn.in-cart:hover {
          background: #bbf7d0;
          transform: translateY(-2px);
        }

        /* ===== COLOR DOTS ===== */
        .color-dots {
          display: flex;
          gap: 6px;
          padding: 12px 16px 0;
        }

        .color-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s ease);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
        }

        .color-dot.active {
          border-color: var(--color-accent, #c9a96e);
          transform: scale(1.15);
        }

        .color-dot:hover {
          transform: scale(1.2);
        }

        /* ===== CARD INFO ===== */
        .card-info {
          padding: 10px 16px 20px;
        }

        .card-type {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-secondary, #555);
          margin-bottom: 4px;
        }

        .card-name {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          letter-spacing: -0.2px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-price {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .current {
          font-size: 16px;
          font-weight: 700;
        }

        .old {
          font-size: 12px;
          color: var(--text-secondary, #555);
          text-decoration: line-through;
        }

        .discount {
          font-size: 11px;
          font-weight: 700;
          color: #16a34a;
          background: #dcfce7;
          padding: 2px 8px;
          border-radius: var(--radius-full, 9999px);
        }

        /* ===== LOAD MORE ===== */
        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 48px;
          opacity: 0;
          transition: opacity 0.6s ease 0.5s;
        }

        .product-section.visible .load-more-wrap {
          opacity: 1;
        }

        .load-more-btn {
          padding: 14px 40px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: var(--radius-full, 9999px);
          background: transparent;
          color: var(--text);
          border: 1.5px solid var(--border, #e8e6e3);
          cursor: pointer;
          transition: all var(--transition-medium, 0.35s ease);
        }

        .load-more-btn:hover {
          background: var(--color-primary, #1a1a2e);
          color: #fff;
          border-color: var(--color-primary, #1a1a2e);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md, 0 4px 20px rgba(0,0,0,0.08));
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 992px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .inner {
            padding: 0 20px;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .card-image {
            height: 180px;
          }

          .action-btn span {
            display: none;
          }

          .hover-actions {
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .card-image {
            height: 160px;
          }
        }
      `}</style>
    </section>
  );
}
'use client';
import { useCartWishlist } from '../../context/CartWishlistContext';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const { wishlist } = useCartWishlist() as any;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="loading-state">
        <p>Loading Wishlist...</p>
        <style jsx>{`
          .loading-state {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            font-size: 15px;
            letter-spacing: 1px;
            color: var(--text-secondary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="wishlist-page">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="hero-content">
          <span className="section-label">PERSONAL COLLECTION</span>
          <h1 className="page-title">
            My <strong>Wishlist</strong>
          </h1>
          <p className="page-desc">
            Keep track of your favorite styles, designer frames, and premium glasses all in one place.
          </p>
        </div>
      </div>

      <div className="container">
        {wishlist.length > 0 ? (
          <div className="wishlist-container">
            <div className="grid-header">
              <span className="count-label">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
              </span>
            </div>
            
            <div className="products-grid">
              {wishlist.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-card">
              <div className="empty-icon-wrap">
                <Heart size={44} strokeWidth={1.5} className="heart-icon animate-pulse" />
              </div>
              <h2 className="empty-title">Your Wishlist is Empty</h2>
              <p className="empty-desc">
                Explore our collections and add the frames you love to your personal wishlist.
              </p>
              <Link href="/products" className="btn btn-primary">
                Explore All Frames
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .wishlist-page {
          padding-bottom: 100px;
          min-height: 80vh;
          background: var(--bg);
        }

        /* Hero styling */
        .page-hero {
          background: linear-gradient(135deg, var(--color-primary, #1a1a2e) 0%, #0d0d1a 100%);
          padding: 120px 40px 60px;
          text-align: center;
          color: #fff;
        }

        .hero-content {
          max-width: 560px;
          margin: 0 auto;
        }

        .page-title {
          font-size: clamp(30px, 5vw, 48px);
          font-weight: 300;
          letter-spacing: -1px;
          margin: 10px 0 16px;
          color: #fff;
        }

        .page-title strong {
          font-weight: 700;
          color: var(--color-accent, #c9a96e);
        }

        .page-desc {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
          line-height: 1.7;
        }

        /* Container & Grid styling */
        .wishlist-container {
          margin-top: 40px;
        }

        .grid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }

        .count-label {
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 80px 20px;
        }

        .empty-card {
          text-align: center;
          max-width: 480px;
          padding: 48px 32px;
          border-radius: var(--radius-lg, 16px);
          border: 1px solid var(--border);
          background: var(--card-bg);
          box-shadow: var(--shadow-md);
        }

        .empty-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: var(--bg-secondary);
          color: var(--color-danger, #e53e3e);
          margin-bottom: 24px;
        }

        .empty-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text);
        }

        .empty-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        /* Responsive design */
        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 100px 20px 48px;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .empty-card {
            padding: 32px 20px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </main>
  );
}

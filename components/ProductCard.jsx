'use client';
import Link from "next/link";
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useCartWishlist } from "../context/CartWishlistContext";

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist, addToCart, isInCart } = useCartWishlist();
  const liked = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="product-card">
      <div className="card-image">
        <img src={product.img} alt={product.name} />
        
        {product.badge && (
          <span className="card-badge">{product.badge}</span>
        )}

        <button 
          className={`wishlist-btn ${liked ? 'liked' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={liked ? '#e53e3e' : 'none'} />
        </button>

        <div className="hover-actions">
          <Link href={`/products/${product.id}`} className="action-btn">
            View Details
          </Link>
          {inCart ? (
            <Link href="/cart" className="action-btn in-cart">
              <Check size={14} /> In Cart
            </Link>
          ) : (
            <button className="action-btn primary" onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.colors ? product.colors[0] : null);
            }}>
              <ShoppingBag size={14} /> Add
            </button>
          )}
        </div>
      </div>

      <div className="card-info">
        <p className="card-type">{product.type}</p>
        <h3 className="card-name">{product.name}</h3>
        
        <div className="card-price">
          <strong className="current">₹{product.price}</strong>
          {product.oldPrice && <span className="old">₹{product.oldPrice}</span>}
          {product.discount && <span className="discount">{product.discount}</span>}
        </div>
      </div>

      <style jsx>{`
        .product-card {
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          background: var(--card-bg, #fff);
          border: 1px solid var(--border, #e8e6e3);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover {
          border-color: transparent;
          box-shadow: var(--shadow-lg, 0 8px 40px rgba(0,0,0,0.12));
          transform: translateY(-4px);
        }

        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: var(--bg-secondary, #faf9f7);
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
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
        }

        .wishlist-btn.liked {
          color: #e53e3e;
        }

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
          padding: 8px 0;
          border-radius: var(--radius-md, 8px);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border, #e8e6e3);
          color: var(--color-text, #1a1a1a);
          text-align: center;
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

        .card-info {
          padding: 16px;
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
        }

        .card-price {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .current {
          font-size: 15px;
          font-weight: 700;
        }

        .old {
          font-size: 12px;
          color: var(--text-secondary, #555);
          text-decoration: line-through;
        }

        .discount {
          font-size: 10px;
          font-weight: 700;
          color: #16a34a;
          background: #dcfce7;
          padding: 1px 6px;
          border-radius: var(--radius-full, 9999px);
        }
      `}</style>
    </div>
  );
}
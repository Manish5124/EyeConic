'use client';
import React, { use } from 'react';
import products from "../../../data/products";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Heart, Shield, RefreshCw, Truck, Check } from 'lucide-react';
import { useState } from 'react';
import { useCartWishlist } from "../../../context/CartWishlistContext";


export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : null);
  
  const { toggleWishlist, isInWishlist, addToCart, isInCart } = useCartWishlist() as any;
  const liked = product ? isInWishlist(product.id) : false;
  const inCart = product ? isInCart(product.id, selectedColor) : false;


  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <Link href="/products" className="back-btn">
          <ArrowLeft size={16} /> Back to Products
        </Link>
        <style jsx>{`
          .not-found-container {
            padding: 120px 20px;
            text-align: center;
            min-height: 60vh;
          }
          .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 20px;
            color: var(--color-accent);
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="product-detail-page">
      <div className="container">
        {/* Back navigation */}
        <Link href="/products" className="back-link">
          <ArrowLeft size={16} /> Back to All Products
        </Link>

        <div className="product-layout">
          {/* Left: Gallery */}
          <div className="gallery-section">
            <div className="main-image">
              <img src={product.img} alt={product.name} />
              {product.badge && <span className="badge">{product.badge}</span>}
            </div>
          </div>

          {/* Right: Info */}
          <div className="info-section">
            <span className="product-type">{product.type}</span>
            <h1 className="product-name">{product.name}</h1>
            
            <div className="price-row">
              <span className="price">₹{product.price}</span>
              {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
              {product.discount && <span className="discount">{product.discount} Off</span>}
            </div>

            <p className="desc">{product.description}</p>

            {/* Color Selector */}
            <div className="color-selector">
              <h4>Select Frame Color</h4>
              <div className="dots">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`dot ${selectedColor === color ? 'active' : ''}`}
                    style={{ background: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select frame color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="action-row">
              {inCart ? (
                <Link href="/cart" className="add-to-cart-btn in-cart-btn">
                  <Check size={18} />
                  <span>In Cart — View Bag</span>
                </Link>
              ) : (
                <button className="add-to-cart-btn" onClick={() => addToCart(product, selectedColor)}>
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>
              )}
              <button 
                className={`wish-btn ${liked ? 'liked' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={liked ? '#e53e3e' : 'none'} />
              </button>
            </div>

            {/* Specs */}
            <div className="specs-section">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Frame Material</span>
                  <span className="spec-val">{product.specs.material}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Weight</span>
                  <span className="spec-val">{product.specs.weight}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Frame Width</span>
                  <span className="spec-val">{product.specs.width}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Gender</span>
                  <span className="spec-val">{product.specs.gender}</span>
                </div>
              </div>
            </div>

            {/* Value Props */}
            <div className="props-list">
              <div className="prop-item">
                <Truck size={18} />
                <span>Free Delivery in 3-5 Business Days</span>
              </div>
              <div className="prop-item">
                <RefreshCw size={18} />
                <span>30 Days Exchange & Money Back Guarantee</span>
              </div>
              <div className="prop-item">
                <Shield size={18} />
                <span>1 Year Warranty on Frames</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-detail-page {
          padding: 120px 0 80px;
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

        /* ===== LAYOUT ===== */
        .product-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
        }

        /* ===== GALLERY ===== */
        .gallery-section {
          position: sticky;
          top: 120px;
        }

        .main-image {
          position: relative;
          background: var(--bg-secondary, #faf9f7);
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          aspect-ratio: 4 / 3;
          border: 1px solid var(--border);
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--color-primary);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
        }

        /* ===== INFO SECTION ===== */
        .product-type {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--color-accent);
          display: block;
          margin-bottom: 8px;
        }

        .product-name {
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .price-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .price {
          font-size: 28px;
          font-weight: 700;
        }

        .old-price {
          font-size: 18px;
          color: var(--text-secondary);
          text-decoration: line-through;
        }

        .discount {
          font-size: 12px;
          font-weight: 700;
          color: #16a34a;
          background: #dcfce7;
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .desc {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
          font-weight: 300;
          margin-bottom: 32px;
        }

        /* ===== COLOR SELECTOR ===== */
        .color-selector {
          margin-bottom: 32px;
        }

        .color-selector h4 {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .dots {
          display: flex;
          gap: 10px;
        }

        .dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
        }

        .dot.active {
          border-color: var(--color-accent);
          transform: scale(1.15);
        }

        /* ===== ACTIONS ===== */
        .action-row {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }

        .add-to-cart-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: var(--color-primary);
          color: #fff;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all var(--transition-medium);
        }

        .add-to-cart-btn:hover {
          background: var(--color-accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .in-cart-btn {
          background: #dcfce7;
          color: #16a34a;
          border: none;
          text-decoration: none;
        }

        .in-cart-btn:hover {
          background: #bbf7d0;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .wish-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .wish-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .wish-btn.liked {
          color: #e53e3e;
          border-color: #e53e3e;
          background: #fef2f2;
        }

        /* ===== SPECS ===== */
        .specs-section {
          border-top: 1px solid var(--border);
          padding-top: 32px;
          margin-bottom: 32px;
        }

        .specs-section h3 {
          font-size: 15px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .spec-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .spec-val {
          font-size: 13px;
          font-weight: 600;
        }

        /* ===== VALUE PROPS ===== */
        .props-list {
          border-top: 1px solid var(--border);
          padding-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .prop-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .gallery-section {
            position: static;
          }
        }
      `}</style>
    </main>
  );
}

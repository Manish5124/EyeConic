'use client';
import products from "../../../data/products";
import ProductCard from "../../../components/ProductCard";
import Link from "next/link";

const womenProducts = products.filter(
  (p) => p.gender === "Women" || p.gender === "Unisex"
);

export default function WomenPage() {
  return (
    <main className="products-page">
      <div className="page-hero">
        <div className="hero-content">
          <span className="section-label">WOMEN'S COLLECTION</span>
          <h1 className="page-title">Eyewear for <strong>Women</strong></h1>
          <p className="page-desc">
            Elegant, expressive, and endlessly stylish — discover frames that define your look.
          </p>
        </div>
        <div className="gender-tabs">
          <Link href="/products/men" className="gender-tab">Men</Link>
          <Link href="/products/women" className="gender-tab active">Women</Link>
          <Link href="/products/kids" className="gender-tab">Kids</Link>
          <Link href="/products" className="gender-tab">All</Link>
        </div>
      </div>

      <div className="container">
        <div className="filter-bar">
          <div className="results-count">{womenProducts.length} Products Found</div>
          <div className="filter-options">
            <select className="filter-select" aria-label="Sort products">
              <option>Sort By: Best Seller</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .products-page { padding-bottom: 80px; min-height: 80vh; }

        .page-hero {
          background: linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 100%);
          padding: 120px 40px 60px;
          text-align: center;
          color: #fff;
        }

        .hero-content { max-width: 560px; margin: 0 auto 40px; }

        .page-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 300;
          letter-spacing: -1px;
          margin: 10px 0 16px;
          color: #fff;
        }

        .page-title strong { font-weight: 700; color: var(--color-accent, #c9a96e); }

        .page-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          font-weight: 300;
          line-height: 1.7;
        }

        .gender-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .gender-tab {
          padding: 10px 28px;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .gender-tab:hover, .gender-tab.active {
          background: var(--color-accent, #c9a96e);
          border-color: var(--color-accent, #c9a96e);
          color: #fff;
        }

        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid var(--border, #e8e6e3);
          margin: 40px 0;
        }

        .results-count { font-size: 13px; color: var(--text-secondary, #555); }

        .filter-select {
          padding: 8px 16px;
          border: 1px solid var(--border, #e8e6e3);
          background: var(--bg);
          color: var(--text);
          border-radius: var(--radius-md, 8px);
          font-size: 13px;
          cursor: pointer;
          outline: none;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1200px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .page-hero { padding: 100px 20px 48px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 480px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </main>
  );
}

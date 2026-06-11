'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";

const shapes = ["Round","Rectangle","Aviator","Cat Eye","Square","Boston","Oval","Rimless"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const shapeParam = searchParams.get('shape');

  const activeShape = shapeParam
    ? shapes.find(s => s.toLowerCase().replace(' ', '-') === shapeParam)
    : null;

  const filtered = activeShape
    ? products.filter(p => p.shape?.toLowerCase() === activeShape.toLowerCase())
    : products;

  return (
    <main className="products-page">
      <div className="page-hero">
        <div className="hero-content">
          <span className="section-label">COLLECTIONS</span>
          <h1 className="page-title">
            {activeShape ? <><strong>{activeShape}</strong> Frames</> : <>Explore <strong>All Eyewear</strong></>}
          </h1>
          <p className="page-desc">
            {activeShape
              ? `Showing all ${activeShape.toLowerCase()} frame styles. Premium crafted for every personality.`
              : "Discover our range of precision-crafted frames, designed for every look, personality, and lifestyle."}
          </p>
        </div>
        <div className="gender-tabs">
          <Link href="/products/men" className="gender-tab">Men</Link>
          <Link href="/products/women" className="gender-tab">Women</Link>
          <Link href="/products/kids" className="gender-tab">Kids</Link>
          <Link href="/products" className={`gender-tab${!activeShape ? ' active' : ''}`}>All</Link>
        </div>
      </div>

      <div className="container">
        {/* Shape filter pills */}
        <div className="shape-pills">
          <Link href="/products" className={`pill${!activeShape ? ' active' : ''}`}>All Shapes</Link>
          {shapes.map(s => {
            const slug = s.toLowerCase().replace(' ', '-');
            return (
              <Link
                key={slug}
                href={`/products?shape=${slug}`}
                className={`pill${activeShape === s ? ' active' : ''}`}
              >{s}</Link>
            );
          })}
        </div>

        <div className="filter-bar">
          <div className="results-count">{filtered.length} Product{filtered.length !== 1 ? 's' : ''} Found</div>
          <select className="filter-select" aria-label="Sort products">
            <option>Sort By: Best Seller</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-icon">🕶️</p>
            <p className="empty-title">No frames found for "{activeShape}"</p>
            <Link href="/products" className="btn btn-primary">View All Frames</Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .products-page { padding-bottom: 80px; min-height: 80vh; }

        .page-hero {
          background: linear-gradient(135deg, var(--color-primary, #1a1a2e) 0%, #0d0d1a 100%);
          padding: 120px 40px 60px;
          text-align: center;
          color: #fff;
        }

        .hero-content { max-width: 560px; margin: 0 auto 40px; }

        .page-title {
          font-size: clamp(30px, 5vw, 50px);
          font-weight: 300;
          letter-spacing: -1px;
          margin: 10px 0 16px;
          color: #fff;
        }

        .page-title strong { font-weight: 700; color: var(--color-accent, #c9a96e); }

        .page-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
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

        .shape-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          padding: 32px 0 0;
        }

        .pill {
          padding: 7px 18px;
          border: 1.5px solid var(--border, #e8e6e3);
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.22s ease;
        }

        .pill:hover, .pill.active {
          background: var(--color-primary, #1a1a2e);
          border-color: var(--color-primary, #1a1a2e);
          color: #fff;
        }

        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid var(--border, #e8e6e3);
          margin: 20px 0 36px;
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

        .empty-state {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-icon { font-size: 56px; margin-bottom: 16px; }

        .empty-title {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-weight: 300;
        }

        @media (max-width: 1200px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }

        @media (max-width: 768px) {
          .page-hero { padding: 100px 20px 48px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }

        @media (max-width: 480px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{padding:'200px 0', textAlign:'center'}}>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
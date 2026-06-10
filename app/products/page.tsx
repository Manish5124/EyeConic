'use client';
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  return (
    <main className="products-page">
      <div className="container">
        {/* Breadcrumb / Label */}
        <div className="page-header">
          <span className="section-label">COLLECTIONS</span>
          <h1 className="page-title">Explore <strong>All Eyewear</strong></h1>
          <p className="page-desc">Discover our range of precision-crafted frames, designed for every look, personality, and lifestyle.</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="results-count">{products.length} Products Found</div>
          <div className="filter-options">
            <select className="filter-select" aria-label="Sort products">
              <option>Sort By: Best Seller</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .products-page {
          padding: 120px 0 80px; /* Offset for sticky header */
          min-height: 80vh;
        }

        .page-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px;
        }

        .page-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 300;
          letter-spacing: -1px;
          margin: 8px 0 16px;
        }

        .page-title strong {
          font-weight: 600;
        }

        .page-desc {
          font-size: 15px;
          color: var(--text-secondary, #555);
          font-weight: 300;
          line-height: 1.6;
        }

        /* ===== FILTER BAR ===== */
        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid var(--border, #e8e6e3);
          border-bottom: 1px solid var(--border, #e8e6e3);
          margin-bottom: 40px;
        }

        .results-count {
          font-size: 13px;
          color: var(--text-secondary, #555);
        }

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

        /* ===== GRID ===== */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .products-page {
            padding: 100px 0 60px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
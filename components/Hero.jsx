'use client';
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="promo-hero">
      <div className="promo-overlay" />
      <div className="promo-content">
        <span className="promo-label">LIMITED TIME ONLY</span>
        <h2 className="promo-title">Luxury Eyewear <strong>Made Affordable</strong></h2>
        <p className="promo-text">Get high-quality, lightweight frames with anti-reflective lens coatings included. Starting from only ₹999.</p>
        <div className="promo-actions">
          <Link href="/products" className="btn btn-accent">
            Shop Now <ArrowRight size={16} />
          </Link>
          <Link href="/about" className="btn btn-outline-white">
            Learn More
          </Link>
        </div>
      </div>

      <style jsx>{`
        .promo-hero {
          position: relative;
          padding: 100px 40px;
          text-align: center;
          background-image: url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&h=800&fit=crop');
          background-size: cover;
          background-position: center;
          border-radius: var(--radius-lg, 16px);
          overflow: hidden;
          margin: 60px auto;
          max-width: var(--container-max, 1280px);
          color: #fff;
          box-shadow: var(--shadow-lg);
        }

        .promo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          z-index: 1;
        }

        .promo-content {
          position: relative;
          z-index: 2;
          max-width: 640px;
          margin: 0 auto;
        }

        .promo-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--color-accent);
          text-transform: uppercase;
        }

        .promo-title {
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 300;
          line-height: 1.2;
          margin: 12px 0 16px;
        }

        .promo-title strong {
          font-weight: 600;
        }

        .promo-text {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 32px;
          font-weight: 300;
        }

        .promo-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .btn-outline-white {
          border: 1.5px solid #fff;
          color: #fff;
          background: transparent;
        }

        .btn-outline-white:hover {
          background: #fff;
          color: #1a1a1a;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .promo-hero {
            margin: 40px 20px;
            padding: 60px 20px;
          }
          
          .promo-actions {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Top Banner */}
      <div className="footer-top">
        <div className="footer-container">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">🚚</div>
              <div>
                <h4>Free Shipping</h4>
                <p>On all orders above ₹2,000</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🔄</div>
              <div>
                <h4>15-Day Returns</h4>
                <p>Hassle-free return policy</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🛡️</div>
              <div>
                <h4>1-Year Warranty</h4>
                <p>Guaranteed frame durability</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">👓</div>
              <div>
                <h4>Free Lens Coating</h4>
                <p>Anti-glare & scratch resistant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-container main-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-the">The</span>
              <span className="logo-eye">Eye</span>
              <span className="logo-conic">Conic</span>
            </div>
            <p className="brand-desc">
              Experience the perfect fusion of Japanese precision and modern fashion. Crafting premium eyeglasses and sunglasses for the discerning individual.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Youtube">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h3>Shop Eyewear</h3>
            <ul>
              <li><Link href="/">Men\'s Eyeglasses</Link></li>
              <li><Link href="/">Women\'s Eyeglasses</Link></li>
              <li><Link href="/">Kids\' Eyeglasses</Link></li>
              <li><Link href="/">Polarized Sunglasses</Link></li>
              <li><Link href="/">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-links-col">
            <h3>Customer Service</h3>
            <ul>
              <li><Link href="/">Track Order</Link></li>
              <li><Link href="/">Book Eye Test</Link></li>
              <li><Link href="/">Store Locator</Link></li>
              <li><Link href="/">Returns & Exchange</Link></li>
              <li><Link href="/">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-links-col">
            <h3>Contact Us</h3>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>100 Feet Rd, Indiranagar, Bengaluru, KA 560038</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>1800-123-4567 (Mon-Sat, 9AM-6PM)</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>support@theeyeconic.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container bottom-inner">
          <p className="copyright">© 2026 TheEyeConic. All rights reserved.</p>
          <div className="bottom-links">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Sitemap</Link>
          </div>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-secondary, #faf9f7);
          color: var(--text);
          border-top: 1px solid var(--border, #e8e6e3);
          font-family: inherit;
        }

        .footer-container {
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ===== TOP BANNER ===== */
        .footer-top {
          border-bottom: 1px solid var(--border, #e8e6e3);
          padding: 40px 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .info-icon {
          font-size: 28px;
        }

        .info-item h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .info-item p {
          font-size: 12px;
          color: var(--text-secondary, #555);
        }

        /* ===== MAIN FOOTER ===== */
        .footer-main {
          padding: 80px 0;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 50px;
        }

        .footer-brand .logo {
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .logo-the {
          font-weight: 300;
          opacity: 0.7;
        }

        .logo-eye {
          font-weight: 700;
          color: var(--color-accent, #c9a96e);
        }

        .logo-conic {
          font-weight: 300;
        }

        .brand-desc {
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-secondary, #555);
          margin-bottom: 24px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border, #e8e6e3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast, 0.2s ease);
        }

        .social-btn:hover {
          background: var(--color-primary, #1a1a2e);
          color: #fff;
          border-color: var(--color-primary, #1a1a2e);
          transform: translateY(-2px);
        }

        .footer-links-col h3 {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 24px;
        }

        .footer-links-col ul {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-col a {
          font-size: 13px;
          color: var(--text-secondary, #555);
          transition: color var(--transition-fast, 0.2s ease);
        }

        .footer-links-col a:hover {
          color: var(--color-accent, #c9a96e);
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          color: var(--text-secondary, #555);
        }

        .contact-icon {
          color: var(--color-accent, #c9a96e);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ===== BOTTOM FOOTER ===== */
        .footer-bottom {
          border-top: 1px solid var(--border, #e8e6e3);
          padding: 30px 0;
        }

        .bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .copyright {
          font-size: 12px;
          color: var(--text-secondary, #555);
        }

        .bottom-links {
          display: flex;
          gap: 24px;
        }

        .bottom-links a {
          font-size: 12px;
          color: var(--text-secondary, #555);
        }

        .bottom-links a:hover {
          color: var(--color-accent, #c9a96e);
        }

        .back-to-top {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border, #e8e6e3);
          background: var(--bg);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s ease);
        }

        .back-to-top:hover {
          background: var(--color-primary, #1a1a2e);
          color: #fff;
          border-color: var(--color-primary, #1a1a2e);
          transform: translateY(-2px);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .info-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 0 20px;
          }

          .footer-main {
            padding: 50px 0;
          }

          .bottom-inner {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .back-to-top {
            position: static;
            margin-top: 10px;
          }
        }

        @media (max-width: 480px) {
          .info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}
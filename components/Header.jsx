'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, Sun, X, ChevronDown, Moon, ShoppingBag, Heart, User } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* Announcement Bar */}
      {/* <div className="announcement-bar">
        <p>✨ Free Shipping on Orders Above ₹2,000 | Use Code: <strong>EYECONIC20</strong> for 20% Off</p>
      </div> */}

      {/* Main Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Left Nav */}
          <nav className="nav-left">
            <Link href="/products/men" className="nav-link">Men</Link>
            <Link href="/products/women" className="nav-link">Women</Link>
            <Link href="/products/kids" className="nav-link">Kids</Link>
            <Link href="/products" className="nav-link">All Frames</Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="logo">
            <span className="logo-the">The</span>
            <span className="logo-eye">Eye</span>
            <span className="logo-conic">Conic</span>
          </Link>

          {/* Right Icons */}
          <div className="icons">
            <button onClick={() => setSearchOpen(!searchOpen)} className="icon-btn" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
              {theme === "light" ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
            </button>

            <button className="icon-btn" aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </button>

            <button className="icon-btn cart-btn" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="cart-count">0</span>
            </button>

            <button className="icon-btn mobile-menu-btn" onClick={() => setIsOpen(true)} aria-label="Menu">
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="search-bar">
            <div className="search-inner">
              <Search size={18} strokeWidth={1.5} />
              <input type="text" placeholder="Search eyeglasses, sunglasses, brands..." autoFocus />
              <button onClick={() => setSearchOpen(false)} className="search-close">
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-logo">
            <span className="logo-the">The</span>
            <span className="logo-eye">Eye</span>
            <span className="logo-conic">Conic</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="close-btn">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="drawer-body">
          {/* User greeting */}
          <div className="drawer-user">
            <div className="user-avatar">
              <User size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="user-greeting">Welcome</p>
              <p className="user-cta">Sign in for the best experience</p>
            </div>
          </div>

          <div className="menu">
            {/* EYEGLASSES */}
            <div onClick={() => toggleMenu('eyeglasses')} className="menu-title">
              <span>EYEGLASSES</span>
              <ChevronDown size={16} className={openMenu === 'eyeglasses' ? 'rotate' : ''} />
            </div>
            {openMenu === 'eyeglasses' && (
              <div className="submenu">
                <Link href="/products/men" className="submenu-item" onClick={() => setIsOpen(false)}>Men</Link>
                <Link href="/products/women" className="submenu-item" onClick={() => setIsOpen(false)}>Women</Link>
                <Link href="/products/kids" className="submenu-item" onClick={() => setIsOpen(false)}>Kids</Link>
                <Link href="/products" className="submenu-item" onClick={() => setIsOpen(false)}>View All</Link>
              </div>
            )}

            {/* SUNGLASSES */}
            <div onClick={() => toggleMenu('sunglasses')} className="menu-title">
              <span>SUNGLASSES</span>
              <ChevronDown size={16} className={openMenu === 'sunglasses' ? 'rotate' : ''} />
            </div>
            {openMenu === 'sunglasses' && (
              <div className="submenu">
                <Link href="/products/men" className="submenu-item" onClick={() => setIsOpen(false)}>Men</Link>
                <Link href="/products/women" className="submenu-item" onClick={() => setIsOpen(false)}>Women</Link>
                <Link href="/products" className="submenu-item" onClick={() => setIsOpen(false)}>Polarized</Link>
                <Link href="/products" className="submenu-item" onClick={() => setIsOpen(false)}>View All</Link>
              </div>
            )}

            {/* CATEGORIES */}
            <div onClick={() => toggleMenu('categories')} className="menu-title">
              <span>SHOP BY SHAPE</span>
              <ChevronDown size={16} className={openMenu === 'categories' ? 'rotate' : ''} />
            </div>
            {openMenu === 'categories' && (
              <div className="submenu">
                <Link href="/products?shape=round" className="submenu-item" onClick={() => setIsOpen(false)}>Round</Link>
                <Link href="/products?shape=rectangle" className="submenu-item" onClick={() => setIsOpen(false)}>Rectangle</Link>
                <Link href="/products?shape=cat-eye" className="submenu-item" onClick={() => setIsOpen(false)}>Cat Eye</Link>
                <Link href="/products?shape=aviator" className="submenu-item" onClick={() => setIsOpen(false)}>Aviator</Link>
                <Link href="/products?shape=square" className="submenu-item" onClick={() => setIsOpen(false)}>Square</Link>
                <Link href="/products?shape=oval" className="submenu-item" onClick={() => setIsOpen(false)}>Oval</Link>
              </div>
            )}

            <Link href="/products" className="menu-item" onClick={() => setIsOpen(false)}>NEW ARRIVALS</Link>
            <Link href="/products" className="menu-item" onClick={() => setIsOpen(false)}>BEST SELLERS</Link>
            <Link href="/about" className="menu-item" onClick={() => setIsOpen(false)}>ABOUT US</Link>
            <Link href="/#contact" className="menu-item" onClick={() => setIsOpen(false)}>CONTACT</Link>
          </div>
        </div>

        <div className="drawer-footer">
          <div className="drawer-footer-links">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms & Conditions</Link>
            <Link href="/">Returns & Shipping</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ===== ANNOUNCEMENT BAR ===== */
        .announcement-bar {
          background: var(--color-primary, #1a1a2e);
          color: #fff;
          text-align: center;
          padding: 8px 16px;
          font-size: 12px;
          letter-spacing: 0.5px;
          font-weight: 400;
        }

        .announcement-bar strong {
          color: var(--color-accent, #c9a96e);
        }

        /* ===== HEADER ===== */
        .header {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 100;
          background: var(--header-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all var(--transition-medium, 0.35s ease);
          border-bottom: 1px solid transparent;
        }

        .header.scrolled {
          border-bottom: 1px solid var(--border, #e8e6e3);
          box-shadow: 0 1px 10px rgba(0, 0, 0, 0.04);
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 40px;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* ===== NAV LEFT ===== */
        .nav-left {
          display: flex;
          gap: 32px;
          flex: 1;
        }

        .nav-link {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          position: relative;
          padding: 4px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--color-accent, #c9a96e);
          transition: width var(--transition-medium, 0.35s ease);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* ===== LOGO ===== */
        .logo {
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }

        .logo-the {
          font-weight: 300;
          font-size: 20px;
          opacity: 0.7;
        }

        .logo-eye {
          font-weight: 700;
          color: var(--color-accent, #c9a96e);
        }

        .logo-conic {
          font-weight: 300;
        }

        /* ===== ICONS ===== */
        .icons {
          display: flex;
          gap: 16px;
          align-items: center;
          flex: 1;
          justify-content: flex-end;
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--text);
          padding: 8px;
          border-radius: var(--radius-full, 9999px);
          transition: all var(--transition-fast, 0.2s ease);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          background: var(--bg-secondary);
          color: var(--color-accent, #c9a96e);
        }

        .cart-count {
          position: absolute;
          top: 2px;
          right: 2px;
          background: var(--color-accent, #c9a96e);
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-btn {
          display: none;
        }

        /* ===== SEARCH BAR ===== */
        .search-bar {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg);
          border-bottom: 1px solid var(--border, #e8e6e3);
          padding: 16px 40px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .search-inner {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-secondary);
          border-radius: var(--radius-full, 9999px);
          padding: 12px 20px;
          border: 1px solid var(--border, #e8e6e3);
        }

        .search-inner input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          color: var(--text);
          outline: none;
          font-family: inherit;
        }

        .search-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 4px;
          cursor: pointer;
        }

        /* ===== OVERLAY ===== */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 200;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ===== DRAWER ===== */
        .drawer {
          position: fixed;
          top: 0;
          right: -380px;
          width: 360px;
          height: 100%;
          background: var(--menu-bg);
          color: var(--text);
          z-index: 300;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
        }

        .drawer.open {
          right: 0;
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid var(--border, #e8e6e3);
        }

        .drawer-logo {
          font-size: 20px;
          display: flex;
          gap: 2px;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text);
          padding: 8px;
          border-radius: 50%;
          transition: all var(--transition-fast, 0.2s ease);
        }

        .close-btn:hover {
          background: var(--bg-secondary);
        }

        .drawer-body {
          flex: 1;
          overflow-y: auto;
        }

        /* ===== USER GREETING ===== */
        .drawer-user {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border, #e8e6e3);
        }

        .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--color-accent, #c9a96e);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-greeting {
          font-size: 15px;
          font-weight: 600;
        }

        .user-cta {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* ===== MENU ===== */
        .menu {
          padding: 8px 0;
        }

        .menu-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: background var(--transition-fast, 0.2s ease);
        }

        .menu-title:hover {
          background: var(--bg-secondary);
        }

        .rotate {
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }

        .submenu {
          background: var(--submenu-bg);
          overflow: hidden;
          animation: expandMenu 0.3s ease;
        }

        @keyframes expandMenu {
          from { max-height: 0; opacity: 0; }
          to { max-height: 300px; opacity: 1; }
        }

        .submenu-item {
          display: block;
          padding: 12px 24px 12px 40px;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-secondary);
          transition: all var(--transition-fast, 0.2s ease);
          letter-spacing: 0.5px;
        }

        .submenu-item:hover {
          color: var(--color-accent, #c9a96e);
          padding-left: 48px;
        }

        .menu-item {
          display: block;
          padding: 16px 24px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all var(--transition-fast, 0.2s ease);
        }

        .menu-item:hover {
          background: var(--bg-secondary);
          color: var(--color-accent, #c9a96e);
        }

        /* ===== DRAWER FOOTER ===== */
        .drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--border, #e8e6e3);
        }

        .drawer-footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .drawer-footer-links a {
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
          transition: color var(--transition-fast, 0.2s ease);
        }

        .drawer-footer-links a:hover {
          color: var(--color-accent, #c9a96e);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .nav-left {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .header-inner {
            padding: 14px 20px;
          }

          .logo {
            flex: unset;
          }
        }

        @media (max-width: 480px) {
          .drawer {
            width: 100%;
            right: -100%;
          }

          .icons {
            gap: 8px;
          }

          .announcement-bar {
            font-size: 11px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </>
  );
}

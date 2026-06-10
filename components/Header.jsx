'use client';
import { useState, useEffect } from 'react';
import { Menu, Search, Sun, X, ChevronDown, Moon } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [theme, setTheme] = useState("light");

  // ✅ Apply theme globally
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* ✅ HEADER */}
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">TheEyeConic</h1>

          <div className="icons">
            <Search size={20} />

            {/* ✅ THEME TOGGLE */}
            <div onClick={toggleTheme} className="icon-btn">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </div>

            <Menu size={24} onClick={() => setIsOpen(true)} />
          </div>
        </div>
      </header>

      {/* ✅ OVERLAY */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* ✅ DRAWER */}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2 className="title">The Eye Conic</h2>
          <X onClick={() => setIsOpen(false)} className="icon-btn" />
        </div>

        <div className="menu">

          {/* ✅ EYEGLASSES */}
          <div onClick={() => toggleMenu('eyeglasses')} className="menu-title">
            EYEGLASSES
            <ChevronDown className={openMenu === 'eyeglasses' ? 'rotate' : ''} />
          </div>

          {openMenu === 'eyeglasses' && (
            <div className="submenu">
              <div>MEN</div>
              <div>WOMEN</div>
              <div>VIEW ALL</div>
            </div>
          )}

          {/* ✅ SUNGLASSES */}
          <div onClick={() => toggleMenu('sunglasses')} className="menu-title">
            SUNGLASSES
            <ChevronDown className={openMenu === 'sunglasses' ? 'rotate' : ''} />
          </div>

          {openMenu === 'sunglasses' && (
            <div className="submenu">
              <div>MEN</div>
              <div>WOMEN</div>
              <div>VIEW ALL</div>
            </div>
          )}

          {/* ✅ CATEGORIES */}
          <div onClick={() => toggleMenu('categories')} className="menu-title">
            CATEGORIES
            <ChevronDown className={openMenu === 'categories' ? 'rotate' : ''} />
          </div>

          {openMenu === 'categories' && (
            <div className="submenu">
              <div>SHOP BY SHAPE</div>
            </div>
          )}

          {/* ✅ STATIC */}
          <div className="menu-item">POLARIZED SUNGLASSES</div>
          <div className="menu-item">RETURN AND EXCHANGE</div>
          <div className="menu-item">ABOUT US</div>
          <div className="menu-item">CONTACT US</div>
        </div>

        <div className="footer">
          <p>PRIVACY POLICY</p>
          <p>TERMS & CONDITIONS</p>
          <p>DELIVERY & SHIPPING</p>
          <p>RETURN POLICIES</p>
        </div>
      </div>

      {/* ✅ CLEAN STYLES */}
      <style jsx>{`
        .header {
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 50;
          background: var(--bg);
          color: var(--text);
          transition: 0.3s;
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          padding: 15px 20px;
        }

        .logo {
          font-weight: 600;
          font-size: 18px;
        }

        .icons {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .icon-btn {
          cursor: pointer;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }

        .drawer {
          position: fixed;
          top: 0;
          right: -320px;
          width: 300px;
          height: 100%;
          background: var(--menu-bg);
          color: var(--text);
          z-index: 50;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .drawer.open {
          right: 0;
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: var(--bg);
        }

        .title {
          font-weight: 600;
        }

        .menu {
          flex: 1;
          padding: 10px 20px;
          overflow-y: auto;
        }

        .menu-title {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          font-weight: 600;
          border-bottom: 1px solid rgba(150,150,150,0.3);
          cursor: pointer;
        }

        .submenu {
          background: var(--submenu-bg);
        }

        .submenu div {
          padding: 12px 10px;
        }

        .menu-item {
          padding: 15px 0;
          border-bottom: 1px solid rgba(150,150,150,0.3);
          cursor: pointer;
        }

        .rotate {
          transform: rotate(180deg);
          transition: 0.3s;
        }

        .footer {
          padding: 20px;
          font-size: 12px;
          text-align: center;
        }
      `}</style>
    </>
  );
}

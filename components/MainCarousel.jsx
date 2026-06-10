'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MainCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      label: 'NEW COLLECTION',
      title: 'See the World\nThrough Style',
      subtitle: 'Discover our latest collection of premium eyewear crafted for the modern individual.',
      cta: 'Shop Collection',
      img: '/hero-1.png',
    },
    {
      id: 2,
      label: 'SUNGLASSES',
      title: 'Bold Shades,\nBrighter Days',
      subtitle: 'Step into the spotlight with designer sunglasses that define your personality.',
      cta: 'Explore Sunglasses',
      img: '/hero-2.png',
    },
    {
      id: 3,
      label: 'LIFESTYLE',
      title: 'Frames That\nTell Your Story',
      subtitle: 'Find your perfect pair from our curated selection of iconic designs.',
      cta: 'View All Styles',
      img: '/hero-3.png',
    },
  ];

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero-carousel" id="hero-carousel">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === current ? 'active' : ''}`}
          key={slide.id}
        >
          {/* Background Image */}
          <div className="slide-bg">
            <img src={slide.img} alt={slide.title} />
            <div className="slide-overlay" />
          </div>

          {/* Content */}
          <div className={`slide-content ${index === current ? 'animate' : ''}`}>
            <span className="slide-label">{slide.label}</span>
            <h1 className="slide-title">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
            <button className="slide-cta">{slide.cta}</button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button className="nav-btn prev" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button className="nav-btn next-btn" onClick={next} aria-label="Next slide">
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Progress Indicators */}
      <div className="indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="dot-inner" />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="counter">
        <span className="counter-current">{String(current + 1).padStart(2, '0')}</span>
        <span className="counter-sep">/</span>
        <span className="counter-total">{String(slides.length).padStart(2, '0')}</span>
      </div>

      <style jsx>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 90vh;
          min-height: 500px;
          overflow: hidden;
          background: #0a0a0a;
        }

        /* ===== SLIDES ===== */
        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        .slide-bg {
          position: absolute;
          inset: 0;
        }

        .slide-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide.active .slide-bg img {
          transform: scale(1.05);
        }

        .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
        }

        /* ===== SLIDE CONTENT ===== */
        .slide-content {
          position: absolute;
          bottom: 15%;
          left: 6%;
          max-width: 580px;
          z-index: 2;
          color: #fff;
        }

        .slide-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-accent, #c9a96e);
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease 0.2s;
        }

        .slide-content.animate .slide-label {
          opacity: 1;
          transform: translateY(0);
        }

        .slide-title {
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s ease 0.35s;
        }

        .slide-content.animate .slide-title {
          opacity: 1;
          transform: translateY(0);
        }

        .slide-subtitle {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
          opacity: 0;
          max-width: 420px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 32px;
          transform: translateY(20px);
          transition: all 0.6s ease 0.5s;
        }

        .slide-content.animate .slide-subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        .slide-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 36px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #fff;
          background: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.35s ease;
          opacity: 0;
          transform: translateY(20px);
        }

        .slide-content.animate .slide-cta {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s ease 0.65s, background 0.3s ease, border-color 0.3s ease;
        }

        .slide-cta:hover {
          background: var(--color-accent, #c9a96e);
          border-color: var(--color-accent, #c9a96e);
          transform: translateY(-2px);
        }

        /* ===== NAV BUTTONS ===== */
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-medium, 0.35s ease);
          z-index: 3;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .prev {
          left: 30px;
        }

        .next-btn {
          right: 30px;
        }

        /* ===== INDICATORS ===== */
        .indicators {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 3;
        }

        .dot {
          width: 40px;
          height: 3px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 2px;
          cursor: pointer;
          border: none;
          overflow: hidden;
          transition: background 0.3s ease;
        }

        .dot-inner {
          display: block;
          width: 0;
          height: 100%;
          background: var(--color-accent, #c9a96e);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .dot.active .dot-inner {
          width: 100%;
          transition: width 5s linear;
        }

        /* ===== COUNTER ===== */
        .counter {
          position: absolute;
          bottom: 40px;
          right: 40px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          letter-spacing: 2px;
          z-index: 3;
        }

        .counter-current {
          color: #fff;
          font-weight: 600;
        }

        .counter-sep {
          margin: 0 6px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .hero-carousel {
            height: 75vh;
            min-height: 400px;
          }

          .slide-content {
            bottom: 20%;
            left: 5%;
            right: 5%;
            max-width: none;
          }

          .slide-title {
            font-size: clamp(28px, 8vw, 44px);
          }

          .slide-subtitle {
            font-size: 13px;
            max-width: none;
          }

          .nav-btn {
            width: 40px;
            height: 40px;
          }

          .prev { left: 16px; }
          .next-btn { right: 16px; }

          .counter { display: none; }
        }
      `}</style>
    </section>
  );
}
'use client';
import { useRef } from 'react';

export default function HeroCarousel() {
  const sliderRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: 'OWNDAYS',
      subtitle: 'FROM TOKYO, JAPAN',
      img: 'https://picsum.photos/id/1018/1200/600',
    },
    {
      id: 2,
      title: 'NEW COLLECTION',
      subtitle: 'LATEST ARRIVALS',
      img: 'https://picsum.photos/id/1015/1200/600',
    },
    {
      id: 3,
      title: 'PREMIUM STYLE',
      subtitle: 'TRENDING NOW',
      img: 'https://picsum.photos/id/1016/1200/600',
    },
  ];

  return (
    <div className="carousel" ref={sliderRef}>
      {slides.map((slide) => (
        <div className="slide" key={slide.id}>
          <img src={slide.img} alt={slide.title} />

          {/* Overlay Content */}
          <div className="content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <button style={{backgroundColor:'skyblue'}}>Shop Now</button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          width: 100%;
          height: 50vh; /* ✅ HALF SCREEN */
        }

        .carousel::-webkit-scrollbar {
          display: none;
        }

        .slide {
          position: relative;
          min-width: 100%;
          height: 100%;
          scroll-snap-align: center;
          flex-shrink: 0;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Overlay */
        .content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
        }

        .content h1 {
          font-size: 40px;
          letter-spacing: 4px;
        }

        .content p {
          margin: 10px 0 20px;
          font-size: 14px;
        }

        .content button {
          padding: 10px 20px;
          border-radius: 8px;
          background: white;
          border: none;
          cursor: pointer;
        }

        /* ✅ Mobile Responsive */
        @media (max-width: 768px) {
          .carousel {
            height: 35vh; /* smaller on mobile */
          }

          .content h1 {
            font-size: 24px;
          }

          .content p {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
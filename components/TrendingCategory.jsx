'use client';
import { useRef } from 'react';

export default function TrendingCategory() {
  const sliderRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: 'UNDERDOG',
      subtitle: 'Black Rimless Sunglasses',
      price: '₹1,099',
      oldPrice: '₹3,000',
      img: 'https://picsum.photos/id/1018/400/600',
    },
    {
      id: 2,
      title: 'BOB',
      subtitle: 'Golden Oval Sunglasses',
      price: '₹1,099',
      oldPrice: '₹3,000',
      img: 'https://picsum.photos/id/1015/400/600',
    },
    {
      id: 3,
      title: 'CO-PILOT',
      subtitle: 'Silver Wayfarer Sunglasses',
      price: '₹1,099',
      oldPrice: '₹3,000',
      img: 'https://picsum.photos/id/1016/400/600',
    },
    {
      id: 4,
      title: 'ARROW',
      subtitle: 'Retro Square Sunglasses',
      price: '₹1,099',
      oldPrice: '₹3,000',
      img: 'https://picsum.photos/id/1011/400/600',
    },
    {
      id: 5,
      title: 'MALANA',
      subtitle: 'Olive Hexagonal Sunglasses',
      price: '₹1,399',
      oldPrice: '₹3,000',
      img: 'https://picsum.photos/id/1019/400/600',
    },
  ];

  return (
    <main style={{ marginTop: '50px', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px',textAlign: 'left', fontWeight: '600', marginLeft: '15px' }}>TRENDING THIS WEEK</h2>

      <div className="slider" ref={sliderRef}>
        {cards.map((card) => (
          <div className="card" key={card.id}>
            {/* Image */}
            <img src={card.img} alt={card.title} />

            {/* Overlay Text */}
            <div className="overlay">
              <h3>{card.title}</h3>
              <p>{card.subtitle}</p>
            </div>

            {/* Bottom Price Bar */}
            <div className="price-bar">
              <div>
                <strong>{card.price}</strong>
                <span className="old">{card.oldPrice}</span>
              </div>
              <div className="cart">🛒</div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        .card {
          position: relative;
          min-width: 260px;
          height: 420px; /* ✅ vertical card */
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
          background: #000;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Overlay (title on image) */
        .overlay {
          position: absolute;
          top: 20px;
          left: 20px;
          color: #fff;
        }

        .overlay h3 {
          margin: 0;
          font-size: 22px;
          font-weight: bold;
        }

        .overlay p {
          margin: 5px 0 0;
          font-size: 13px;
          opacity: 0.9;
        }

        /* Bottom bar */
        .price-bar {
          position: absolute;
          bottom: 15px;
          left: 15px;
          right: 15px;
          background: #fff;
          border-radius: 12px;
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .old {
          margin-left: 10px;
          text-decoration: line-through;
          color: gray;
          font-size: 12px;
        }

        .cart {
          background: black;
          color: white;
          border-radius: 50%;
          padding: 8px;
          font-size: 14px;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .card {
            min-width: 200px;
            height: 340px;
          }
        }
      `}</style>
    </main>
  );
}

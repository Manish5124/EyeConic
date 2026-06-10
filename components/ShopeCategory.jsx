'use client';
import { useRef } from 'react';

export default function Home() {
  const sliderRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: 'Round',
      img: 'https://picsum.photos/id/1018/300/200',
    },
    {
      id: 2,
      title: 'Oval',
      img: 'https://picsum.photos/id/1015/300/200',
    },
    {
      id: 3,
      title: 'Princess',
      img: 'https://picsum.photos/id/1016/300/200',
    },
    {
      id: 4,
      title: 'Cushion',
      img: 'https://picsum.photos/id/1011/300/200',
    },
    {
      id: 5,
      title: 'Emerald',
      img: 'https://picsum.photos/id/1019/300/200',
    },
  ];

  return (
    <main className="container" style={{ marginTop: "50px", padding:'20px' }}>
      <h1 style={{ textAlign: "left", fontWeight: "600", marginLeft: "15px" }}>
        SHOP BY SHAPE
      </h1>

      <div className="slider-wrapper">
        <div className="slider" ref={sliderRef}>
          {cards.map((card) => (
            <div className="card-wrapper" key={card.id}>
              {/* ✅ Image Card */}
              <div className="card">
                <img src={card.img} alt={card.title} />
              </div>

              {/* ✅ Title BELOW card */}
              <p className="title">{card.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Scoped CSS */}
      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
        }

        .slider-wrapper {
          margin-top: 10px;
        }

        .slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        /* ✅ wrapper controls spacing */
        .card-wrapper {
          flex-shrink: 0;
          width: 250px;
          text-align: center;
          scroll-snap-align: start;
        }

        .card {
          width: 100%;
          height: 180px;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .title {
          margin-top: 10px; /* ✅ spacing below card */
          font-size: 16px;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .card-wrapper {
            width: 200px;
          }
        }
      `}</style>
    </main>
  );
}
``
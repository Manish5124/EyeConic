'use client';

export default function CelebritySection() {
  const data = [
    {
      id: 1,
      name: 'Aditya Seal',
      img: 'https://picsum.photos/id/1011/400/500',
      product: 'illume | Shine Black Polarized',
      price: '1,199',
      oldPrice: '3,000',
    },
    {
      id: 2,
      name: 'Prince Narula',
      img: 'https://picsum.photos/id/1012/400/500',
      product: 'The OG | Round Black Silver',
      price: '1,099',
      oldPrice: '3,000',
    },
    {
      id: 3,
      name: 'Manish Paul',
      img: 'https://picsum.photos/id/1013/400/500',
      product: 'Spectre | Silver-Black Retro',
      price: '1,099',
      oldPrice: '3,000',
    },
    {
      id: 4,
      name: 'Parineeti Chopra',
      img: 'https://picsum.photos/id/1014/400/500',
      product: 'Orbit | Silver Black Round',
      price: '1,099',
      oldPrice: '3,000',
    },
  ];

  return (
    <section className="wrapper">
      <h2>Celebrity Spotted</h2>
      <p className="subtitle">
        Get the look worn by your favorite celebrities
      </p>

      <div className="slider">
        {data.map((item) => (
          <div className="card" key={item.id}>
            
            {/* Image */}
            <div className="image-box">
              <img src={item.img} alt={item.name} />

              {/* Name badge */}
              <div className="badge">{item.name}</div>
            </div>

            {/* Product */}
            <div className="info">
              <p className="product">{item.product}</p>

              <div className="price-row">
                <div>
                  <strong>Rs. {item.price}</strong>
                  <span className="old">Rs. {item.oldPrice}</span>
                </div>

                <div className="cart">🛒</div>
              </div>
            </div>

          </div>
        ))}
      </div>

      <style jsx>{`
        .wrapper {
          padding: 30px;
        }

        h2 {
          font-size: 28px;
          font-weight: 700;
        }

        .subtitle {
          color: gray;
          margin-bottom: 20px;
        }

        .slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        .card {
          min-width: 260px;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }

        .image-box {
          position: relative;
          height: 300px;
        }

        .image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: black;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .info {
          padding: 12px;
        }

        .product {
          font-size: 14px;
          margin-bottom: 10px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .old {
          margin-left: 8px;
          text-decoration: line-through;
          color: gray;
          font-size: 12px;
        }

        .cart {
          background: black;
          color: white;
          border-radius: 50%;
          padding: 8px;
          cursor: pointer;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .card {
            min-width: 220px;
          }

          .image-box {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}
'use client';

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      name: "Dax | Black Rimless Sunglasses | Golden Frame - MG8168",
      img: "https://picsum.photos/id/101/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
    {
      id: 2,
      name: "Dax | Violet Rimless Sunglasses | Golden Frame - MG8169",
      img: "https://picsum.photos/id/102/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
    {
      id: 3,
      name: "Dax | Brown Rimless Sunglasses | Golden Frame - MG8171",
      img: "https://picsum.photos/id/103/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
    {
      id: 4,
      name: "Dax | Shadow Black Rimless Sunglasses | Grey Frame - MG8172",
      img: "https://picsum.photos/id/104/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
     {
      id: 5,
      name: "Dax | Black Rimless Sunglasses | Golden Frame - MG8168",
      img: "https://picsum.photos/id/101/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
    {
      id: 6,
      name: "Dax | Violet Rimless Sunglasses | Golden Frame - MG8169",
      img: "https://picsum.photos/id/102/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
    {
      id: 7,
      name: "Dax | Brown Rimless Sunglasses | Golden Frame - MG8171",
      img: "https://picsum.photos/id/103/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
    {
      id: 8,
      name: "Dax | Shadow Black Rimless Sunglasses | Grey Frame - MG8172",
      img: "https://picsum.photos/id/104/500/300",
      price: "1,399",
      oldPrice: "3,000",
      discount: "-53%",
    },
  ];

  return (
    <div className="container">
      <div className="grid">
        {products.map((item) => (
          <div className="card" key={item.id}>
            
            {/* ✅ Image */}
            <div className="image-box">
              <img src={item.img} alt={item.name} />
              
              {/* NEW Badge */}
              <span className="badge">NEW</span>
            </div>

            {/* ✅ Dots */}
            <div className="dots">
              <span className="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* ✅ Info */}
            <div className="info">
              <p className="category">RIMLESS / M</p>
              <p className="title">{item.name}</p>

              <div className="price">
                <strong>₹{item.price}</strong>
                <span className="old">₹{item.oldPrice}</span>
                <span className="discount">{item.discount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .card {
          background: #f8f8f8;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          padding-bottom: 15px;
        }

        .image-box {
          position: relative;
          height: 180px;
          background: white;
        }

        .image-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 15px;
        }

        /* NEW badge */
        .badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: black;
          color: white;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 3px;
        }

        /* dots */
        .dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin: 10px 0;
        }

        .dots span {
          width: 6px;
          height: 6px;
          background: #ccc;
          border-radius: 50%;
        }

        .dots .active {
          background: #c97a6a;
          width: 10px;
          border-radius: 4px;
        }

        .info {
          padding: 0 10px;
        }

        .category {
          font-size: 11px;
          color: gray;
          margin-bottom: 5px;
        }

        .title {
          font-size: 13px;
          margin-bottom: 8px;
        }

        .price {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .old {
          text-decoration: line-through;
          color: gray;
          font-size: 12px;
        }

        .discount {
          color: red;
          font-size: 12px;
        }

        /* ✅ Responsive */
        @media (max-width: 992px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
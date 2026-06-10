import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px" }}>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <Link href={`/product/${product.id}`}>View</Link>
    </div>
  );
}
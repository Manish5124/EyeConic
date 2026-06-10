import products from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Eyeglasses</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
import products from "../../data/products";

export default function ProductDetail({ params }:any) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>{product.name}</h1>
      <p>Price: ₹{product.price}</p>
    </main>
  );
}
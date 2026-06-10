import Link from "next/link";

export default function Hero() {
  return (
    <section style={{ padding: "40px", textAlign: "center" }}>
      <h1>Eyewear for Everyone</h1>
      <p>Stylish frames starting at ₹999</p>
      <Link href="/products">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Shop Now
        </button>
      </Link>
    </section>
  );
}
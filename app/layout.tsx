import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartWishlistProvider } from "../context/CartWishlistContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "TheEyeConic | Premium Eyewear",
  description: "Discover premium eyeglasses and sunglasses at TheEyeConic. Stylish frames, designer collections, and affordable luxury eyewear for everyone.",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CartWishlistProvider>
          <Header />
          {children}
          <Footer />
        </CartWishlistProvider>
      </body>
    </html>
  );
}
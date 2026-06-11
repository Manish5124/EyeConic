import MainCarousel from '../components/MainCarousel';
import ShopeCategory from '../components/ShopeCategory';
import TrendingCategory from '../components/TrendingCategory';
import ShopByShape from '../components/ShopByShape';
import CelebritySection from '../components/CelebritySection';
import ProductGrid from '../components/ProductGrid';
import ContactUs from '../components/ContactUs';

export default function Home() {
  return (
    <main>
      <MainCarousel />
      <ShopeCategory />
      <TrendingCategory />
      <ShopByShape />
      <CelebritySection />
      <ProductGrid />
      <ContactUs />
    </main>
  );
}
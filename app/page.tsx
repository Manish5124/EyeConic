import MainCarousel from '../components/MainCarousel';
import ShopeCategory from '../components/ShopeCategory';
import TrendingCategory from '../components/TrendingCategory';
import CelebritySection from '../components/CelebritySection';
import ProductGrid from '../components/ProductGrid';
import ContactUs from '../components/ContactUs';

export default function Home() {
  return (
    <main>
      <MainCarousel />
      <ShopeCategory />
      <TrendingCategory />
      <CelebritySection />
      <ProductGrid />
      <ContactUs />
    </main>
  );
}
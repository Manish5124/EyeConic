import Hero from "../components/Hero";
import ShopeCategory from '../components/ShopeCategory';
import TrendingCategory from '../components/TrendingCategory';
import MainCarousel from '../components/MainCarousel';
import CelebritySetion from '../components/CelebritySection';
import ProductGrid from '../components/ProductGrid';


export default function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <MainCarousel />
     <ShopeCategory />
     <TrendingCategory />
     <CelebritySetion />
     <ProductGrid />
        </main>
  );
}
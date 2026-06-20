import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import FeaturedServices from "../../components/FeaturedServices/FeaturedServices";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import FeaturedPortfolio from "../../components/FeaturedPortfolio/FeaturedPortfolio";
import FilmRollGallery from "../../components/FilmRollGallery/FilmRollGallery";
import CTA from "../../components/CTA/CTA";
import PageTransition from "../../components/PageTransition";
import { useSEO } from "../../hooks/useSEO";

function Home() {
  useSEO({
    title: "Home",
    description: "Welcome to Almeida Photography. We capture your special moments with elegance, offering premium wedding, event, and portrait photography."
  });

  return (
    <PageTransition>
      <Hero />
      <About />
      <FeaturedServices />
      <FeaturedCategories />
      <FeaturedPortfolio />
      <FilmRollGallery />
      <CTA />
    </PageTransition>
  );
}

export default Home;
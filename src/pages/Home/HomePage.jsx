import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import FeaturedServices from "../../components/FeaturedServices/FeaturedServices";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import FeaturedPortfolio from "../../components/FeaturedPortfolio/FeaturedPortfolio";
import FilmRollGallery from "../../components/FilmRollGallery/FilmRollGallery";
import CTA from "../../components/CTA/CTA";
import PageTransition from "../../components/PageTransition";

function Home() {
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
import About from "../../components/About/About";
import PageTransition from "../../components/PageTransition";
import { useSEO } from "../../hooks/useSEO";

function AboutPage() {
  useSEO({
    title: "About Us",
    description: "Learn more about the team behind Almeida Photography. Our passion is to perfectly capture the essence of your most important moments."
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] pt-20">
        <About />
      </div>
    </PageTransition>
  );
}

export default AboutPage;

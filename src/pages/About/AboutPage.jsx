import About from "../../components/About/About";
import PageTransition from "../../components/PageTransition";

function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] pt-20">
        <About />
      </div>
    </PageTransition>
  );
}

export default AboutPage;

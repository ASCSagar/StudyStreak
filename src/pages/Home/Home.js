import Footer from "../../components/Footer/Footer";
import AboutSection from "../../components/Landing/AboutSection";
import BlogSection from "../../components/Landing/BlogSection";
import BrandSection from "../../components/Landing/BrandSection";
import CounterArea from "../../components/Landing/CounterArea";
import GridSection from "../../components/Landing/GridSection";
import HeroBanner from "../../components/Landing/HeroBanner";
import PopulerArea from "../../components/Landing/PopularArea";
import RegisterSection from "../../components/Landing/RegisterSection";
import NavBar from "../../components/NavBar/NavBar";
import TopBar from "../../components/TopBar/TopBar";

const Main = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <HeroBanner />
      <BrandSection />
      <GridSection />
      <CounterArea />
      <PopulerArea />
      <RegisterSection />
      <AboutSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default Main;

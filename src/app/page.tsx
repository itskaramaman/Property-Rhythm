import Hero from "@/app/components/Hero";
import InforBoxes from "@/app/components/InfoBoxes";
import Footer from "./components/Footer";
import HomeProperties from "./components/HomeProperties";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InforBoxes />
      <HomeProperties />
    </div>
  );
};

export default HomePage;

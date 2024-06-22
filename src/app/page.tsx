import Hero from "@/app/components/Hero";
import InforBoxes from "@/app/components/InfoBoxes";
import HomeProperties from "./components/HomeProperties";
import FeaturedProperties from "./components/FeaturedProperties";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InforBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

export default HomePage;

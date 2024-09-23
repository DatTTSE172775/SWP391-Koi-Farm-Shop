import React from "react";
import Blog from "../../components/blog/Blog";
import HeroSection from "../../components/heroSection/HeroSection";
import KoiFeature from "../../components/koifeature/KoiFeature";
import Newsletter from "../../components/newsletter/Newsletter";
import Testimonials from "../../components/testimonials/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <KoiFeature />
      <Blog />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;

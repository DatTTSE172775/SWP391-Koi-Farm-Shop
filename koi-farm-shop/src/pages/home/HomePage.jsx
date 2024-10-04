import React from "react";
import AboutUs from "../../components/home/aboutUs/aboutUs";
import ContactInformation from "../../components/home/contactInfomation/ContactInformation";
import FAQ from "../../components/home/faq/FAQ";
import FeatureProduct from "../../components/home/featureProduct/FeatureProduct";
import Gallery from "../../components/home/gallery/Gallery";
import HeroBanner from "../../components/home/heroBanner/HeroBanner";
import Newletters from "../../components/home/newletters/NewLetters";
import Promotions from "../../components/home/promotions/Promotions";
import Testimonials from "../../components/home/testimonials/Testimonials";
import Tutorial from "../../components/home/tutorial/Tutorial";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div>
      <div className="homepage-container">
        <HeroBanner />
        <AboutUs />
        <Tutorial />
        <FeatureProduct />
        <Promotions />
        <Testimonials />
        <Newletters />
        <Gallery />
        <ContactInformation />
        <FAQ />
      </div>
    </div>
  );
};

export default HomePage;

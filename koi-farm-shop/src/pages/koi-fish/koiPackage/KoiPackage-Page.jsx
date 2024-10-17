import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import Footer from "../../../components/footer/Footer";
import KoiPackage from "../../../components/koiFish/koiPackage/KoiPackage";
import axiosPublic from "../../../api/axiosPublic";
import "./KoiPackage-Page.scss";

const KoiPackagePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [koiPackage, setKoiPackage] = useState([]);

  const fetchKoiPackage = async () => { 
    try {
      const response = await axiosPublic.get("koipackages");
      console.log("Fetched koi package data:", response.data);
      setKoiPackage(response.data);
    } catch (error) {
      console.error("Error fetching koi package:", error);
    }
  };
  
  useEffect(() => {
    fetchKoiPackage();
  }, []);

  return (
    <div className="koi-package-page">
      <Navigation />
      <div className="koi-package-content">
        <h1>Koi Packages</h1>
        <KoiPackage koipackages={koiPackage} isAuthenticated={isAuthenticated} />
      </div>
      <Footer />
    </div>
  );
};

export default KoiPackagePage;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import Footer from "../../../components/footer/Footer";
import KoiList from "../../../components/koiFish/koiList/KoiList";
import axiosPublic from "../../../api/axiosPublic";

const KoiListPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [koiFish, setKoiFish] = useState([]);

  const fetchKoiFish = async () => { 
    try {
      const response = await axiosPublic.get("koifish");
      console.log("Fetched koi fish data:", response.data);
      setKoiFish(response.data);
    } catch (error) {
      console.error("Error fetching koi fish:", error);
    }
  };
  
  useEffect(() => {
    fetchKoiFish();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="koi-list-page">
        <KoiList koiFish={koiFish} isAuthenticated={isAuthenticated} />
      </div>
      <Footer />
    </div>
  );
};

export default KoiListPage;

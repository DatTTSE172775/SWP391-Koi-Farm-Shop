import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../../components/footer/Footer";
import KoiList from "../../../components/koiFish/koiList/KoiList";
import Navigation from "../../../components/navigation/Navigation";
import "./Koi-List-Page.scss";

const KoiListPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Navigation />
      <div className="koi-list-page">
        <KoiList isAuthenticated={isAuthenticated} />
      </div>
      <Footer />
    </div>
  );
};

export default KoiListPage;

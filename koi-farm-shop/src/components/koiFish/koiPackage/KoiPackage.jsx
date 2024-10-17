import { Row, Col } from "antd";
import React from "react";
import KoiPackageHeader from "../header/KoiPackageHeader";
import KoiPackageCard from "../koiPackageCard/koiPackageCard";
import "./KoiPackage.scss";

const KoiPackage = ({ koipackages, isAuthenticated }) => {
  return (
    <div className="koi-package-list">
      <KoiPackageHeader />
      <Row gutter={[16, 16]}>
        {koipackages.map((koipackage) => (
          <Col key={koipackage.PackageID} xs={24} sm={12} md={8} lg={6}>
            <KoiPackageCard
              koipackage={koipackage}
              isAuthenticated={isAuthenticated}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default KoiPackage;

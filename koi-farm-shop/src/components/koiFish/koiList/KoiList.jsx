import { Col, Row } from "antd";
import React from "react";
import KoiListHeader from "../header/KoiListHeader";
import KoiCard from "../koiCard/KoiCard";
import "./KoiList.scss";

const KoiList = ({ koiFish, isAuthenticated }) => {

  return (
    <div className="koi-list">
      <h1>-------------</h1>
      <KoiListHeader />
      {/* Tạm thời bỏ KoiSearch */}
      {/* <KoiSearch onSearch={handleSearch} /> */}
      {koiFish.length === 0 ? (
        <p>No koi fish found. Please try adjusting your search or filters.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {koiFish.map((koi) => (
            <Col key={koi.KoiID} xs={24} sm={12} md={8} lg={6}>
              <KoiCard koifish={koi} isAuthenticated={isAuthenticated} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default KoiList;

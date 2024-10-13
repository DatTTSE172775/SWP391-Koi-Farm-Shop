import { Breadcrumb, Row, Space, Col } from "antd";
import React, { useMemo, useState } from "react";
import KoiListHeader from "../header/KoiListHeader";
import KoiCard from "../koiCard/KoiCard";
import KoiSearch from "../koiSearch/KoiSearch";
import "./KoiList.scss";

import { Link } from "react-router-dom";
import koiImg1 from "../../../assets/koi-list/koiImg1.jpg";
import koiImg2 from "../../../assets/koi-list/koiImg2.jpg";
import koiImg3 from "../../../assets/koi-list/koiImg3.jpg";
import koiImg4 from "../../../assets/koi-list/koiImg4.jpg";
import koiImg5 from "../../../assets/koi-list/koiImg5.jpg";
import koiImg6 from "../../../assets/koi-list/koiImg6.jpg";
import koiImg7 from "../../../assets/koi-list/koiImg7.jpg";
import koiImg8 from "../../../assets/koi-list/koiImg8.jpg";

const koiSampleList = [
  {
    id: 1,
    name: "Kohaku Koi",
    image: koiImg1,
    color: "Đỏ & Trắng",
    size: "30 cm",
    price: "2.000.000 VND",
  },
  {
    id: 2,
    name: "Showa Koi",
    image: koiImg2,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 3,
    name: "Showa Koi",
    image: koiImg3,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 4,
    name: "Showa Koi",
    image: koiImg4,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 5,
    name: "Kohaku Koi",
    image: koiImg5,
    color: "Đỏ & Trắng",
    size: "30 cm",
    price: "2.000.000 VND",
  },
  {
    id: 6,
    name: "Showa Koi",
    image: koiImg6,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 7,
    name: "Showa Koi",
    image: koiImg7,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 8,
    name: "Showa Koi",
    image: koiImg8,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
];

const KoiList = ({ isAuthenticated }) => {
  const [filter, setFilter] = useState({});
  const [searchTerms, setSearchTerms] = useState("");

  const handleFilter = (filterValues) => {
    setFilter(filterValues);
  };

  const handleSearch = (searchValue) => {
    setSearchTerms(searchValue);
  };

  const filteredKoiList = useMemo(() => {
    return koiSampleList.filter((koi) => {
      const matchesSearch = koi.name
        .toLowerCase()
        .includes(searchTerms.toLowerCase());
      const matchesColor = filter.color ? koi.color === filter.color : true;
      const matchesSize = filter.size ? koi.size === filter.size : true;
      return matchesSearch && matchesColor && matchesSize;
    });
  }, [searchTerms, filter]);

  return (
    <div className="koi-list">
      <div className="breadcrumb-container">
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item>
            <Link to="/home">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tất cả cá Koi</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <KoiListHeader />
      <KoiSearch onFilter={handleFilter} onSearch={handleSearch} />
      <Row gutter={[24, 24]} justify="center" className="koi-grid">
        {filteredKoiList.length > 0 ? (
          filteredKoiList.map((koi) => (
            <Col xs={24} sm={12} md={8} lg={6} key={koi.id}>
              <KoiCard koi={koi} isAuthenticated={isAuthenticated} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <p className="no-results">Không tìm thấy cá Koi nào phù hợp với yêu cầu của bạn.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default KoiList;

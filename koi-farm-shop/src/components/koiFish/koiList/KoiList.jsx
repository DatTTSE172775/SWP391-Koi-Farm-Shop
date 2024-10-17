import { Breadcrumb, Col, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import KoiListHeader from "../header/KoiListHeader";
import KoiCard from "../koiCard/KoiCard";
import KoiSearch from "../koiSearch/KoiSearch";
import "./KoiList.scss";

const KoiList = ({ koiFish, isAuthenticated }) => {
  const [filter, setFilter] = useState({});
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    console.log("KoiList received koiFish:", koiFish);
    koiFish.forEach((koi, index) => {
      console.log(`Koi ${index}:`, koi);
      console.log(`Koi ${index} ImagesLink:`, koi.ImagesLink);
    });
  }, [koiFish]);

  const handleFilter = (filterValues) => {
    setFilter(filterValues);
  };

  const handleSearch = (searchValue) => {
    setSearchTerms(searchValue);
  };

  const filteredKoiList = useMemo(() => {
    const filtered = koiFish.filter((koi) => {
      const matchesSearch = koi.Name.toLowerCase().includes(
        searchTerms.toLowerCase()
      );
      const matchesSize = filter.size ? koi.Size === filter.size : true;
      return matchesSearch && matchesSize;
    });
    console.log("Filtered koi list:", filtered);
    return filtered;
  }, [koiFish, searchTerms, filter]);

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
            <p className="no-results">
              Không tìm thấy cá Koi nào phù hợp với yêu cầu của bạn.
            </p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default KoiList;

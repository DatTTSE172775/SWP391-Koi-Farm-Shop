import { Row, Col } from "antd";
import React, { useMemo, useState, useEffect } from "react";
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
      const matchesSearch = koi.Name.toLowerCase().includes(searchTerms.toLowerCase());
      const matchesSize = filter.size ? koi.Size === filter.size : true;
      return matchesSearch && matchesSize;
    });
    console.log("Filtered koi list:", filtered);
    return filtered;
  }, [koiFish, searchTerms, filter]);

  return (
    <div className="koi-list">
      <KoiListHeader />
      <KoiSearch onSearch={handleSearch} onFilter={handleFilter} />
      {filteredKoiList.length === 0 ? (
        <p>No koi fish found. Please try adjusting your search or filters.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredKoiList.map((koi) => (
            <Col key={koi.KoiID} xs={24} sm={12} md={8} lg={6}>
              <KoiCard
                koifish={koi}
                isAuthenticated={isAuthenticated}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default KoiList;

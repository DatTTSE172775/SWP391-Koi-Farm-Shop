import { Col, Row } from "antd";
import React from "react";
import KoiListHeader from "../header/KoiListHeader";
import KoiCard from "../koiCard/KoiCard";
import "./KoiList.scss";

const KoiList = ({ koiFish, isAuthenticated }) => {
  // const [searchTerms, setSearchTerms] = useState("");

  // useEffect(() => {
  //   console.log("KoiList received koiFish:", koiFish);
  //   koiFish.forEach((koi, index) => {
  //     console.log(`Koi ${index}:`, koi);
  //     console.log(`Koi ${index} ImagesLink:`, koi.ImagesLink);
  //   });
  // }, [koiFish]);

  // const handleSearch = (searchValue) => {
  //   setSearchTerms(searchValue);
  // };

  // const filteredKoiList = useMemo(() => {
  //   const filtered = koiFish.filter((koi) => {
  //     const matchesSearch = koi.Name.toLowerCase().includes(searchTerms.toLowerCase());
  //     return matchesSearch;
  //   });
  //   console.log("Filtered koi list:", filtered);
  //   return filtered;
  // }, [koiFish, searchTerms]);

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

import { Col, Row, notification } from "antd";
import React, { useState, useEffect } from "react";
import KoiListHeader from "../header/KoiListHeader";
import KoiCard from "../koiCard/KoiCard";
import "./KoiList.scss";
import KoiSearch from "../koiSearch/KoiSearch";
import Loading from "../../loading/Loading";
import {getAllVarieties} from "../../../store/actions/KoiActions";
import {useDispatch, useSelector} from "react-redux";

const KoiList = ({ koiFish, isAuthenticated }) => {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({});
    const [filteredKoiFish, setFilteredKoiFish] = useState([]);
    const [loading, setLoading] = useState(true); // Hiển thị loading khi mới vào trang
    const { varieties } = useSelector(state => state.koi);

    const handleFilter = (filterValues) => {
        setLoading(true); // Hiển thị loading khi bắt đầu tìm kiếm
        setFilters(filterValues);
    };

    useEffect(() => {
        // Gọi action để lấy danh sách giống cá khi component được render lần đầu
        if (!varieties.length) {
            dispatch(getAllVarieties());
        }
    }, [dispatch, varieties.length]);

    useEffect(() => {
        if (Object.keys(filters).length === 0) {
            // Khi không có bộ lọc nào, hiển thị tất cả cá Koi
            setFilteredKoiFish(koiFish);
            setLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            const results = koiFish.filter((koi) => {
                const matchesSearch = filters.search
                    ? koi.Name.toLowerCase().includes(filters.search.toLowerCase())
                    : true;
                const matchesVarieties = filters.varieties
                    ? filters.varieties.includes(koi.VarietyID)
                    : true;
                const matchesOrigin = filters.origin ? koi.Origin === filters.origin : true;
                const matchesPrice = filters.priceRange
                    ? koi.Price >= filters.priceRange[0] && koi.Price <= filters.priceRange[1]
                    : true;
                const matchesSize = filters.sizeRange
                    ? koi.Size >= filters.sizeRange[0] && koi.Size <= filters.sizeRange[1]
                    : true;
                const matchesWeight = filters.weightRange
                    ? koi.Weight >= filters.weightRange[0] && koi.Weight <= filters.weightRange[1]
                    : true;

                return matchesSearch && matchesVarieties && matchesOrigin && matchesPrice && matchesSize && matchesWeight;
            });

            if (Object.keys(filters).length > 0 && results.length === 0) {
                notification.info({
                    message: "Không tìm thấy kết quả",
                    description: "Không tìm thấy cá Koi bạn cần tìm. Vui lòng thử lại với từ khóa khác.",
                    placement: "topRight",
                });
            }

            setFilteredKoiFish(results);
            setLoading(false); // Tắt loading sau khi hoàn tất
        }, 500); // Thời gian giả lập tải

        return () => clearTimeout(timer);
    }, [filters, koiFish]);

    return (
        <div className="koi-list">
            <KoiListHeader />
            <KoiSearch onFilter={handleFilter} setLoading={setLoading} /> {/* Truyền setLoading */}
            {loading ? (
                <Loading />
            ) : filteredKoiFish.length === 0 && Object.keys(filters).length > 0 ? (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <p>Không tìm thấy cá Koi nào theo từ khóa và bộ lọc đã chọn.</p>
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {filteredKoiFish.map((koi) => (
                        <Col key={koi.KoiID} xs={24} sm={12} md={8} lg={6}>
                            <KoiCard koifish={koi} isAuthenticated={isAuthenticated} varieties={varieties} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default KoiList;
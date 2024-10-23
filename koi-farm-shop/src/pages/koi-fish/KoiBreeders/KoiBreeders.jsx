import React, { useEffect, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import { Card, Button, Typography, Spin } from "antd";
import KoiBreedersHeader from "../../koi-fish/KoiBreedersHeader/KoiBreedersHeader";
import "./KoiBreeders.scss";

const { Text } = Typography;

const KoiBreeders = () => {
  const [breeders, setBreeders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeders = async () => {
      try {
        const response = await axiosPublic.get("/breeders");
        setBreeders(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBreeders();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="koi-breeders">
      <KoiBreedersHeader />
      <div className="koi-breeders__list">
        {breeders.length > 0 ? (
          breeders.map((breeder) => (
            <Card
              key={breeder.id}
              hoverable
              className="koi-breeder-card"
              cover={
                <img
                  alt={breeder.Name}
                  src={breeder.Image || "https://via.placeholder.com/150"}
                />
              }
            >
              <Card.Meta
                title={breeder.Name}
                description={<Text type="secondary">{breeder.ContactInfo}</Text>}
              />
              <div className="koi-breeder-card__details">
                <div>
                  <Text type="secondary">Địa chỉ: {breeder.Address}</Text>
                </div>
                <div>
                  <Text type="secondary">Năm thành lập: {breeder.FoundedYear || "Không rõ"}</Text>
                </div>
                <div>
                  <Text type="secondary">Chuyên môn: {breeder.Specialty || "Không rõ"}</Text>
                </div>
              </div>
              <Button type="primary" block>
                Xem chi tiết
              </Button>
            </Card>
          ))
        ) : (
          <p>Không có nhà lai tạo nào.</p>
        )}
      </div>
    </div>
  );
};

export default KoiBreeders;

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./FeatureProduct.scss";
import koipond100l from "../../../assets/homepage/koi-pond100l.jpg";
import koipond200l from "../../../assets/homepage/koi-pond200l.jpg";
import aquapro from "../../../assets/homepage/aqua-pro.jpg";
import koifood from "../../../assets/homepage/koi-food-premium.jpg";
import decor from "../../../assets/homepage/decorate.png";
import pondlight from "../../../assets/homepage/LED.jpg";


const featuredProducts = [
  {
    id: 1,
    name: "Ao Cá Koi 100L",
    image: koipond100l,
    price: "$150",
    rating: 4.5,
    description: "Ao cá Koi chất lượng cao, dung tích 100L, dễ dàng lắp đặt.",
  },
  {
    id: 2,
    name: "Ao Cá Koi 200L",
    image: koipond200l,
    price: "$500",
    rating: 4.8,
    description: "Ao cá Koi chất lượng cao, dung tích 200L, dễ dàng lắp đặt.",
  },
  {
    id: 3,
    name: "Thiết Bị Lọc AquaPro",
    image: aquapro,
    price: "$120",
    rating: 4.2,
    description: "Thiết bị lọc nước hiệu suất cao, bảo vệ sức khỏe cá Koi.",
  },
  {
    id: 4,
    name: "Thức Ăn Cá Koi Premium",
    image: koifood,
    price: "$30",
    rating: 4.7,
    description: "Thức ăn bổ dưỡng, đảm bảo sức khỏe và sắc màu cho cá Koi.",
  },
  {
    id: 5,
    name: "Trang Trí Ao Cá",
    image: decor,
    price: "$80",
    rating: 4.3,
    description: "Các phụ kiện trang trí ao cá, tạo điểm nhấn cho khu vườn.",
  },
  {
    id: 6,
    name: "Hệ Thống Chiếu Sáng LED",
    image: pondlight,
    price: "$60",
    rating: 4.6,
    description:
      "Hệ thống chiếu sáng LED tiết kiệm năng lượng, làm nổi bật vẻ đẹp của ao cá.",
  },
];

const FeatureProduct = () => {
  return (
    <Box className="featured-products-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="featured-products-title"
      >
        Sản Phẩm Nổi Bật
      </Typography>
      <Grid container spacing={4} className="featured-products-grid">
        {featuredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className="product-card">
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                className="product-image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="product-name"
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="product-price"
                >
                  {product.price}
                </Typography>
                <Rating
                  name="read-only"
                  value={product.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="product-description"
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Mua Ngay
                </Button>
                <Button size="small" color="primary">
                  Xem Chi Tiết
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureProduct;

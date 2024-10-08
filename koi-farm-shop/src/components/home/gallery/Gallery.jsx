import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import "./Gallery.scss";
import scene from "../../../assets/galleryImage/koiscene.jpg";
import koiProd from "../../../assets/galleryImage/koiprod.jpg";
import pondExpert from "../../../assets/galleryImage/aopro.jpg";
import like from "../../../assets/galleryImage/like.jpg";


const galleryItems = [
  {
    id: 1,
    type: "image",
    src: scene,
    alt: "Cảnh ao cá Koi",
  },
  {
    id: 2,
    type: "video",
    src: "https://www.youtube.com/embed/76UcaHnx5gE",
    alt: "Video hướng dẫn chăm sóc cá Koi",
  },
  {
    id: 3,
    type: "image",
    src: koiProd,
    alt: "Sản phẩm cá Koi đẹp mắt",
  },
  {
    id: 4,
    type: "video",
    src: "https://www.youtube.com/embed/2DKFs3zVCuo",
    alt: "Hướng dẫn lắp đặt ao cá",
  },
  {
    id: 5,
    type: "image",
    src: like,
    alt: "Khách hàng hài lòng với sản phẩm",
  },
  {
    id: 6,
    type: "image",
    src: pondExpert,
    alt: "Thiết kế ao cá chuyên nghiệp",
  },
];

const Gallery = () => {
  return (
    <Box className="gallery-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="gallery-title"
      >
        Hình Ảnh và Video Thư Giãn
      </Typography>
      <Grid container spacing={4} className="gallery-grid">
        {galleryItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card className="gallery-card">
              {item.type === "image" ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.src}
                  alt={item.alt}
                  className="gallery-media"
                />
              ) : (
                <div className="gallery-video">
                  <iframe
                    width="100%"
                    height="200"
                    src={item.src}
                    title={item.alt}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="gallery-description"
                >
                  {item.alt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;

import { useState } from "react";
import blogOverviewImage from "../../assets/images/BlogOverview.jpg";
import koiBehaviorImage from "../../assets/images/koi-behavior.avif";
import koiBreedingImage from "../../assets/images/koi-breeding.jpg";
import koiPondMaintenanceImage from "../../assets/images/koi-pond-maintenance.jpg";
import Navigation from "../../components/navigation/Navigation";
import "./Blog.scss";

const blogPosts = [
  {
    id: 1,
    title: "Nghệ thuật nhân giống cá Koi",
    excerpt:
      "Tìm hiểu về quá trình nhân giống cá Koi và các yếu tố tạo nên sắc màu và hình dáng đa dạng của chúng.",
    date: "2023-05-15",
    image: koiBreedingImage,
    readTime: "5 mins",
    category: "Breeding Techniques",
  },
  {
    id: 2,
    title: "Mẹo bảo trì ao cá Koi cần biết",
    excerpt:
      "Khám phá những thực phẩm chăm sóc ao cá Koi và các hệ thống lọc thiết yếu để giữ cho ao cá Koi khỏe mạnh và thật sự.",
    date: "2023-06-02",
    image: koiPondMaintenanceImage,
    readTime: "4 mins",
    category: "Pond Management",
  },
  {
    id: 3,
    title: "Hiểu biết về hành vi cá Koi",
    excerpt:
      "Khám phá thế giới hành vi cá Koi và tìm hiểu cách diễn giải hành vi của chúng để có sự chăm sóc và tương tác tốt hơn.",
    date: "2023-06-20",
    image: koiBehaviorImage,
    readTime: "6 mins",
    category: "Koi Care",
  },
];

const categories = [
  "Koi Care",
  "Breeding Techniques",
  "Pond Management",
  "Koi Varieties",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts;

  return (
    <div>
      <Navigation />
      <div className="blog-container">
        <section className="blog-intro">
          <h1>Tin tức</h1>
          <p>
            Chào mừng bạn đến với blog Koi Farm Shop, nơi chúng tôi đi sâu vào
            thế giới hấp dẫn của cá Koi, cách chăm sóc ao, kỹ thuật nhân giống
            và nhiều hơn nữa. Hãy theo dõi để biết thêm thông tin chi tiết, mẹo
            và câu chuyện từ nhóm chuyên gia của chúng tôi, những người đam mê
            mọi thứ liên quan đến cá Koi.
          </p>
          <img
            src={blogOverviewImage}
            alt="Blog Overview"
            className="blog-image"
          />
        </section>

        <div className="search-bar">
          <input type="text" placeholder="Search blog posts..." />
        </div>

        <section className="blog-latest">
          <h2>Bài đăng mới nhất</h2>
          <div className="blog-posts">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-post">
                <img src={post.image} alt={post.title} className="post-image" />
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p className="post-date">
                    {post.date} - {post.readTime} read
                  </p>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-cta">
                    <button className="cta-button">Mua Ngay</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="blog-categories">
          <h2>Danh mục</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  className={`category-button ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="blog-subscribe">
          <h2>Đăng ký chúng tôi</h2>
          <p>
            Không bỏ lỡ bất kỳ bài viết nào! Đăng ký để cập nhật những mẹo,
            hướng dẫn và tin tức mới nhất từ blog của chúng tôi.
          </p>
          <form>
            <input type="email" placeholder="Nhập địa chỉ email" required />
            <button type="submit">Đăng ký</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Blog;

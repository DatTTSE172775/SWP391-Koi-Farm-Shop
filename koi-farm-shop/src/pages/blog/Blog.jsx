import React from "react";
//import Footer from "../../components/footer/Footer";
import Navigation from "../../components/navigation/Navigation";
import "./Blog.scss";
import blogOverviewImage from "../../assets/images/BlogOverview.jpg";
import koiBreedingImage from "../../assets/images/koi-breeding.jpg";
import koiPondMaintenanceImage from "../../assets/images/koi-pond-maintenance.jpg";
import koiBehaviorImage from "../../assets/images/koi-behavior.avif";

const blogPosts = [
    {
        id: 1,
        title: "Nghệ thuật nhân giống cá Koi",
        excerpt: "Tìm hiểu về quá trình nhân giống cá Koi và các yếu tố tạo nên sắc màu và hình dáng đa dạng của chúng.",
        date: "2023-05-15",
        image: koiBreedingImage
    },
    {
        id: 2,
        title: "Mẹo bảo trì ao cá Koi cần biết",
        excerpt: "Khám phá những thực phẩm chăm sóc ao cá Koi và các hệ thống lọc thiết yếu để giữ cho ao cá Koi khỏe mạnh và thật sự.",
        date: "2023-06-02",
        image: koiPondMaintenanceImage
    },
    {
        id: 3,
        title: "Hiểu biết về hành vi cá Koi",
        excerpt: "Khám phá thế giới hành vi cá Koi và tìm hiểu cách diễn giải hành vi của chúng để có sự chăm sóc và tương tác tốt hơn.",
        date: "2023-06-20",
        image: koiBehaviorImage
    }
];

const Blog = () => {
    return (
        <div>
            <Navigation />
            <div className="blog-container">
                <section className="blog-intro">
                    <h1>Tin tức</h1>
                    <p>
                    Chào mừng bạn đến với blog Koi Farm Shop, nơi chúng tôi đi sâu vào
                    thế giới hấp dẫn của cá Koi, cách chăm sóc ao, kỹ thuật nhân giống và
                    nhiều hơn nữa. Hãy theo dõi để biết thêm thông tin chi tiết, mẹo và câu chuyện từ nhóm
                    chuyên gia của chúng tôi, những người đam mê mọi thứ liên quan đến cá Koi.
                    </p>
                    <img
                        src={blogOverviewImage}
                        alt="Blog Overview"
                        className="blog-image"
                    />
                </section>

                <section className="blog-latest">
                    <h2>Bài đăng mới nhất</h2>
                    <div className="blog-posts">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="blog-post">
                                <img src={post.image} alt={post.title} className="post-image" />
                                <div className="post-content">
                                    <h3>{post.title}</h3>
                                    <p className="post-date">{post.date}</p>
                                    <p className="post-excerpt">{post.excerpt}</p>
                                    <a href={`/blog/${post.id}`} className="read-more">
                                        Đọc thêm
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="blog-categories">
                    <h2>Danh mục</h2>
                    <ul>
                        <li>Chăm sóc cá Koi</li>
                        <li>Kỹ thuật nhân giống</li>
                        <li>Quản lý ao</li>
                        <li>Các giống cá Koi</li>
                    </ul>
                </section>

                <section className="blog-subscribe">
                    <h2>Đăng ký chúng tôi</h2>
                    <p>Không bỏ lỡ bất kỳ bài viết nào! Đăng ký để cập nhật những mẹo, hướng dẫn và tin tức mới nhất từ blog của chúng tôi.</p>
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

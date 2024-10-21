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
        title: "The Art of Koi Breeding",
        excerpt: "Learn about the intricate process of breeding Koi fish and the factors that contribute to their vibrant colors and patterns.",
        date: "2023-05-15",
        image: koiBreedingImage
    },
    {
        id: 2,
        title: "Essential Koi Pond Maintenance Tips",
        excerpt: "Discover the key practices for maintaining a healthy and thriving Koi pond, including water quality management and filtration systems.",
        date: "2023-06-02",
        image: koiPondMaintenanceImage
    },
    {
        id: 3,
        title: "Understanding Koi Fish Behavior",
        excerpt: "Explore the fascinating world of Koi fish behavior and learn how to interpret their actions for better care and interaction.",
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
                    <h1>Blog của chúng tôi!</h1>
                    <p>
                    Chào mừng bạn đến với blog của Koi Farm Shop, nơi chúng tôi khám phá sâu vào thế giới đầy thú vị của cá Koi, cách chăm sóc hồ, kỹ thuật lai tạo, và nhiều hơn thế nữa. Hãy theo dõi để nhận những thông tin hữu ích, mẹo vặt, và những câu chuyện từ đội ngũ chuyên gia đam mê mọi điều về cá Koi.
                    </p>
                    <img
                        src={blogOverviewImage}
                        alt="Blog Overview"
                        className="blog-image"
                    />
                </section>

                <section className="blog-latest">
                    <h2>Latest Posts</h2>
                    <div className="blog-posts">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="blog-post">
                                <img src={post.image} alt={post.title} className="post-image" />
                                <div className="post-content">
                                    <h3>{post.title}</h3>
                                    <p className="post-date">{post.date}</p>
                                    <p className="post-excerpt">{post.excerpt}</p>
                                    <a href={`/blog/${post.id}`} className="read-more">
                                        Read More
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="blog-categories">
                    <h2>Categories</h2>
                    <ul>
                        <li>Koi Care</li>
                        <li>Breeding Techniques</li>
                        <li>Pond Management</li>
                        <li>Koi Varieties</li>
                    </ul>
                </section>

                <section className="blog-subscribe">
                    <h2>Subscribe to Our Blog</h2>
                    <p>Never miss a post! Subscribe to stay updated with the latest tips, guides, and news from our blog.</p>
                    <form>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Blog;

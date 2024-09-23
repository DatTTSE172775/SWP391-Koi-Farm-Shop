import React, { useState } from 'react';
import './Blog.scss';

const Blog = () => {
    const newsArticles = [
        {
            id: 1,
            title: 'Kỹ thuật nuôi cá Koi mới nhất',
            description: 'Khám phá những phương pháp tiên tiến trong việc chăm sóc cá Koi...',
            content:
                'Các chuyên gia nuôi cá Koi đã phát triển nhiều kỹ thuật mới để cải thiện sức khỏe và màu sắc của cá. Bài viết này sẽ đi sâu vào các phương pháp như lọc nước tiên tiến, chế độ ăn uống cân bằng, và kiểm soát nhiệt độ chính xác.',
            date: '23/09/2024',
            author: 'Trần Quang Thuận',
            category: 'Chăm sóc',
            imageUrl: 'image1.jpg',
            featured: true,
        },
        {
            id: 2,
            title: 'Top 5 loại cá Koi đẹp nhất 2024',
            description: 'Cùng điểm qua những giống cá Koi được ưa chuộng nhất trong năm nay...',
            content:
                'Năm 2024 chứng kiến sự nổi lên của nhiều giống cá Koi tuyệt đẹp. Danh sách top 5 bao gồm: Kohaku với màu đỏ trắng tinh tế, Showa đen trắng đỏ ấn tượng, Sanke ba màu hài hòa, Asagi với vảy xanh độc đáo, và Kikokuryu với ánh kim lấp lánh.',
            date: '22/09/2024',
            author: 'Trần Quang Thuận',
            category: 'Giống loài',
            imageUrl: 'C:/Users/Phoen/Desktop/SWP391-Koi-Farm-Shop/koi-farm-shop/public/image1.jpg',
            featured: false,
        },
        {
            id: 3,
            title: 'Cách thiết kế hồ Koi hoàn hảo',
            description: 'Hướng dẫn chi tiết cách tạo ra một môi trường sống lý tưởng cho cá Koi...',
            content:
                'Thiết kế hồ Koi cần cân nhắc nhiều yếu tố như kích thước, độ sâu, hệ thống lọc, và cảnh quan xung quanh. Bài viết này sẽ hướng dẫn bạn từng bước để tạo ra một hồ Koi không chỉ đẹp mắt mà còn đảm bảo sức khỏe tốt nhất cho cá.',
            date: '21/09/2024',
            author: 'Trần Quang Thuận',
            category: 'Thiết kế',
            imageUrl: 'C:/Users/Phoen/Desktop/SWP391-Koi-Farm-Shop/koi-farm-shop/src/hồ koi.jpg',
            featured: true,
        },
        {
            id: 4,
            title: 'Lịch sử và ý nghĩa văn hóa của cá Koi',
            description: 'Khám phá nguồn gốc và tầm quan trọng của cá Koi trong văn hóa Nhật Bản...',
            content:
                'Cá Koi không chỉ là một loài cá cảnh, mà còn mang nhiều ý nghĩa sâu sắc trong văn hóa Nhật Bản. Từ biểu tượng của sự kiên trì và thành công đến vai trò trong nghệ thuật và tín ngưỡng, cá Koi đã trở thành một phần không thể thiếu trong di sản văn hóa Nhật Bản.',
            date: '20/09/2024',
            author: 'Trần Quang Thuận',
            category: 'Văn hóa',
            imageUrl: 'C:/Users/Phoen/Desktop/SWP391-Koi-Farm-Shop/koi-farm-shop/src/Lịch sử và ý nghĩa văn hóa của cá Koi.jpg',
            featured: false,
        },
    ];

    // State quản lý tìm kiếm và danh mục
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Lấy danh mục từ các bài viết
    const categories = ['All', ...new Set(newsArticles.map((article) => article.category))];

    // Lọc bài viết dựa trên tìm kiếm và danh mục
    const filteredArticles = newsArticles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All' || article.category === selectedCategory)
    );

    // Lấy bài viết nổi bật
    const featuredArticle = newsArticles.find((article) => article.featured);

    return (
        <div className="news-page">
            <div className="container">
                <h1>Tin tức mới nhất về cá Koi</h1>

                {/* Tìm kiếm và chọn danh mục */}
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tin tức..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-select"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Bài viết nổi bật */}
                {featuredArticle && (
                    <div className="featured-article">
                        <h2>Tin nổi bật</h2>
                        <div className="featured-content">
                            <img
                                src={featuredArticle.imageUrl}
                                alt={featuredArticle.title}
                                className="featured-image"
                            />
                            <div className="featured-text">
                                <h3>{featuredArticle.title}</h3>
                                <p>{featuredArticle.description}</p>
                                <button className="read-more">Đọc thêm</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Lưới bài viết */}
                <div className="news-grid">
                    {filteredArticles.map((article) => (
                        <div key={article.id} className="news-card">
                            <div className="card-image">
                                <img src={article.imageUrl} alt={article.title} />
                                <span className="category-tag">{article.category}</span>
                            </div>
                            <div className="card-content">
                                <h2>{article.title}</h2>
                                <p className="description">{article.description}</p>
                                <div className="meta">
                                    <span className="date">{article.date}</span>
                                    <span className="author">by {article.author}</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="read-more">Đọc thêm</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;

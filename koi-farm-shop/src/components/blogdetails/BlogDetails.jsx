import React, { useState } from 'react';

const BlogDetails = () => {
    // Dữ liệu các con cá Koi
    const koiFishList = [
        {
            id: 1,
            name: "Koi Kohaku",
            description: "Koi Kohaku là giống cá Koi có màu đỏ và trắng nổi bật.",
            imageUrl: "/images/koi-kohaku.jpg",
            details: "Chi tiết về Koi Kohaku: Đây là giống cá có nguồn gốc từ Nhật Bản, với màu đỏ trắng tinh tế.",
        },
        {
            id: 2,
            name: "Koi Sanke",
            description: "Koi Sanke có ba màu trắng, đỏ và đen.",
            imageUrl: "/images/koi-sanke.jpg",
            details: "Chi tiết về Koi Sanke: Đây là một giống cá Koi ba màu với sự phối hợp của màu trắng, đỏ và đen.",
        },
        // Các cá Koi khác...
    ];

    // Trạng thái lưu cá Koi được chọn
    const [selectedKoi, setSelectedKoi] = useState(null);

    // Hàm xử lý khi click vào cá Koi
    const handleKoiClick = (koi) => {
        setSelectedKoi(koi); // Cập nhật trạng thái với cá Koi được chọn
    };

    return (
        <div className="koi-fish-container">
            <h1>Danh sách các loài cá Koi</h1>

            <div className="koi-list">
                {koiFishList.map((koi) => (
                    <div key={koi.id} className="koi-card" onClick={() => handleKoiClick(koi)}>
                        <img src={koi.imageUrl} alt={koi.name} />
                        <h2>{koi.name}</h2>
                        <p>{koi.description}</p>
                    </div>
                ))}
            </div>

            {selectedKoi && (
                <div className="koi-details">
                    <h2>Chi tiết về {selectedKoi.name}</h2>
                    <img src={selectedKoi.imageUrl} alt={selectedKoi.name} />
                    <p>{selectedKoi.details}</p>
                </div>
            )}
        </div>
    );
};

export default BlogDetails;

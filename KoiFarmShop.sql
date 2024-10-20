CREATE DATABASE KoiFarmShop2
USE KoiFarmShop2


CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(50) CHECK (Role IN ('Guest', 'Customer', 'Staff', 'Manager')) DEFAULT 'Guest',
    SubscriptionStatus VARCHAR(50) CHECK (SubscriptionStatus IN ('Active', 'Inactive')) NOT NULL
);

--select * from Users

CREATE TABLE Customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(20),
    Address VARCHAR(MAX),
    LoyaltyPoints INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Varieties (
    VarietyID INT IDENTITY(1,1) PRIMARY KEY,
    VarietyName VARCHAR(255) NOT NULL,
    Description VARCHAR(MAX),
    Origin VARCHAR(50) CHECK (Origin IN ('Japan', 'Vietnam', 'Other'))
);

CREATE TABLE Breeders (
    BreederID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(MAX),
    ContactInfo VARCHAR(255),
    CertificationLink VARCHAR(255),
    Notes VARCHAR(MAX)
);

CREATE TABLE KoiFish (
    KoiID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    VarietyID INT,
    Origin VARCHAR(50) CHECK (Origin IN ('Imported', 'F1 Hybrid', 'Pure Vietnamese')),
    BreederID INT,
    Gender VARCHAR(50) CHECK (Gender IN ('Male', 'Female', 'Unknown')),
    Born INT,
    Size FLOAT,
    Weight FLOAT,
    Personality VARCHAR(MAX),
    FeedingAmountPerDay FLOAT,
    HealthStatus VARCHAR(255),
    ScreeningRate FLOAT,
    Price DECIMAL(10, 2),
    CertificateLink VARCHAR(255),
    ImagesLink VARCHAR(255),
    AddedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Availability VARCHAR(50) CHECK (Availability IN ('Available', 'Sold Out')),
    FOREIGN KEY (VarietyID) REFERENCES Varieties(VarietyID),
    FOREIGN KEY (BreederID) REFERENCES Breeders(BreederID)
);

--select * from KoiFish where KoiID = 1


CREATE TABLE KoiPackage (
    PackageID INT IDENTITY(1,1) PRIMARY KEY,
    KoiID INT,
    PackageName VARCHAR(255),
    ImageLink VARCHAR(255),
    Price DECIMAL(10, 2),
    PackageSize INT,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Availability VARCHAR(50) CHECK (Availability IN ('Available', 'Sold Out')),
    FOREIGN KEY (KoiID) REFERENCES KoiFish(KoiID)
);

--SELECT * FROM KoiPackage

CREATE TABLE KoiConsignment (
    ConsignmentID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT,
    KoiID INT,
    ConsignmentType VARCHAR(50),
    ConsignmentMode VARCHAR(50) CHECK (ConsignmentMode IN ('Offline', 'Online')),
    StartDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    EndDate DATETIME,
    Status VARCHAR(50) CHECK (Status IN ('Pending', 'Approved', 'In Care', 'Listed for Sale', 'Sold', 'Withdrawn')) DEFAULT 'Pending',
    PriceAgreed DECIMAL(10, 2),
    PickupDate DATETIME,
    ApprovedStatus VARCHAR(50) CHECK (ApprovedStatus IN ('Approved', 'Rejected')) DEFAULT 'Pending',
    InspectionResult VARCHAR(MAX),
    Notes VARCHAR(MAX),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (KoiID) REFERENCES KoiFish(KoiID)
);

ALTER TABLE KoiConsignment
ADD KoiType NVARCHAR(100),
    KoiColor NVARCHAR(100),
    KoiAge NVARCHAR(50),
    KoiSize NVARCHAR(50),
    ImagePath NVARCHAR(255);


--use KoiFarmShop
--select * from KoiConsignment;

--select * from Users;

CREATE TABLE Promotions (
    PromotionID INT IDENTITY(1,1) PRIMARY KEY,
    PromotionCode VARCHAR(255) UNIQUE,
    Description VARCHAR(255),
    DiscountType VARCHAR(50) CHECK (DiscountType IN ('Percentage', 'Fixed Amount')),
    DiscountValue DECIMAL(10, 2),
    StartDate DATETIME,
    EndDate DATETIME,
    Status VARCHAR(50) CHECK (Status IN ('Active', 'Expired')) DEFAULT 'Active',
    MinPurchaseAmount DECIMAL(10, 2) DEFAULT 0.00
);


CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2),
    ShippingAddress VARCHAR(MAX),
    OrderStatus VARCHAR(50) CHECK (OrderStatus IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')) DEFAULT 'Pending',
    PaymentMethod VARCHAR(50) CHECK (PaymentMethod IN ('Credit Card', 'Bank Transfer', 'Cash on Delivery')),
    PaymentStatus VARCHAR(50) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Refunded', 'Failed')) DEFAULT 'Pending',
    TrackingNumber VARCHAR(255),
    Discount DECIMAL(10, 2) DEFAULT 0.00,
    ShippingCost DECIMAL(10, 2) DEFAULT 0.00,
    ConsignmentID INT,
    PromotionID INT DEFAULT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ConsignmentID) REFERENCES KoiConsignment(ConsignmentID),
    FOREIGN KEY (PromotionID) REFERENCES Promotions(PromotionID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    UnitPrice DECIMAL(10, 2),
    TotalPrice DECIMAL(10, 2),
    ProductType VARCHAR(50) CHECK (ProductType IN ('Single Fish', 'Package')),
    CertificateStatus VARCHAR(50) CHECK (CertificateStatus IN ('Issued', 'Not Issued')) DEFAULT 'Not Issued',
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES KoiFish(KoiID)
);

CREATE TABLE Payments (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT,
    PaymentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PaymentMethod VARCHAR(50) CHECK (PaymentMethod IN ('Credit Card', 'Bank Transfer', 'Cash on Delivery')),
    PaymentStatus VARCHAR(50) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')) DEFAULT 'Pending',
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE KoiImages (
    ImageID INT IDENTITY(1,1) PRIMARY KEY,
    KoiID INT,
    ImageLink VARCHAR(255),
    Description VARCHAR(255),
    UploadedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (KoiID) REFERENCES KoiFish(KoiID)
);

CREATE TABLE KoiCertificates (
    CertificateID INT IDENTITY(1,1) PRIMARY KEY,
    KoiID INT,
    CertificateLink VARCHAR(255),
    IssuedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    SoldDate DATETIME,
    FOREIGN KEY (KoiID) REFERENCES KoiFish(KoiID)
);

CREATE TABLE KoiReport (
    ReportID INT IDENTITY(1,1) PRIMARY KEY,
    ConsignmentID INT,
    CareStartDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CareEndDate DATETIME,
    CareDetails VARCHAR(MAX),
    FOREIGN KEY (ConsignmentID) REFERENCES KoiConsignment(ConsignmentID)
);

CREATE TABLE LoyaltyPoints (
    LoyaltyPointID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT,
    PointsEarned INT,
    PointsUsed INT,
    TotalPoints INT,
    LastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Reviews (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT,
    CustomerID INT,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment VARCHAR(MAX),
    ReviewDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) CHECK (Status IN ('Visible', 'Hidden')) DEFAULT 'Visible',
    FOREIGN KEY (ProductID) REFERENCES KoiFish(KoiID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE BlogPosts (
    PostID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    Title VARCHAR(255),
    Content VARCHAR(MAX),
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedDate DATETIME,
    Status VARCHAR(50) CHECK (Status IN ('Draft', 'Published', 'Archived')) DEFAULT 'Draft',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL
);

CREATE TABLE BlogCategories (
    PostID INT,
    CategoryID INT,
    FOREIGN KEY (PostID) REFERENCES BlogPosts(PostID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Comments (
    CommentID INT IDENTITY(1,1) PRIMARY KEY,
    PostID INT,
    BlogPostID INT,
    UserID INT,
    CommentText VARCHAR(MAX),
    CommentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) CHECK (Status IN ('Visible', 'Hidden')) DEFAULT 'Visible',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE KoiPackageVarieties (
    PackageID INT,
    VarietyID INT,
    FOREIGN KEY (PackageID) REFERENCES KoiPackage(PackageID),
    FOREIGN KEY (VarietyID) REFERENCES Varieties(VarietyID)
);

CREATE TABLE KoiPackageBreeders (
    PackageID INT,
    BreederID INT,
    FOREIGN KEY (PackageID) REFERENCES KoiPackage(PackageID),
    FOREIGN KEY (BreederID) REFERENCES Breeders(BreederID)
);

CREATE TABLE OrderHistory (
    ShipmentID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT,
    TrackingNumber VARCHAR(255),
    ShipmentDate DATETIME,
    DeliveryDate DATETIME,
    ShipmentStatus VARCHAR(50) CHECK (ShipmentStatus IN ('In Transit', 'Delivered', 'Delayed')) DEFAULT 'In Transit',
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

--SET IDENTITY_INSERT Users OFF;
INSERT INTO Users (Username, PasswordHash, Role, SubscriptionStatus) VALUES
('SWP391', '1', 'Manager', 'Active'),
('tranganh', '2', 'Staff', 'Active'),
('thanhdat', '3', 'Staff', 'Active'),
('dangkhoa', '4', 'Staff', 'Active'),
('huunam', '5', 'Staff', 'Active'),
('quangthuan', '6', 'Staff', 'Active'),
('TuyetHuong', '7', 'Customer', 'Active'),
('PhuNinh', '8', 'Customer', 'Active'),
('TuongHuy', '9', 'Customer', 'Inactive'),
('VietHan', '10', 'Customer', 'Active'),
('LeDuy', '11', 'Customer', 'Active'),
('QuocTrieu', '12', 'Customer', 'Active'),
('ThanhDien', '13', 'Customer', 'Active'),
('MinhAnh', '14', 'Customer', 'Active');

INSERT INTO Users (Username, PasswordHash, Role, SubscriptionStatus) VALUES
('ThaiBao', '15', 'Customer', 'Inactive'),
('MinhKhoi', '16', 'Customer', 'Active'),
('ManhHung', '17', 'Customer', 'Active'),
('AnhTuan', '18', 'Customer', 'Active'),
('DiemQuynh', '19', 'Customer', 'Active'),
('MinhKiet', '20', 'Customer', 'Active');
--delete from Users
--DBCC CHECKIDENT ('Users', RESEED, 0);
--select * from Users

INSERT INTO Customers (UserID, FullName, Email, PhoneNumber, Address, LoyaltyPoints) VALUES
(7, 'Nguyễn Thị Tuyết Hương', 'nguyenthituyethuong10.1@gmail.com', '0799670750', '123 Lê Lợi, Quận 1, TP.HCM', 100),
(8, 'Trần Thanh Phú Ninh', 'ninhttpsa170260@fpt.edu.vn', '0387142103', '456 Nguyễn Huệ, Quận 1, TP.HCM', 50),
(9, 'Nguyễn Tường Huy', 'huyntse172712@fpt.edu.vn', '0366629575', '789 Trần Hưng Đạo, Quận 5, TP.HCM', 75),
(10, 'Phạm Việt Hàn ', 'hanpvse170116@fpt.edu.vn', '0854315552', '101 Võ Văn Tần, Quận 3, TP.HCM', 200),
(11, 'Trần Lê Duy', 'duytlse172563@fpt.edu.vn', '0565678442', '202 Nguyễn Thị Minh Khai, Quận 3, TP.HCM', 150),
(12, 'Lương Quốc Triệu', 'trieulqse172431@fpt.edu.vn', '0705726731', '303 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', 25),
(13, 'Ngô Viết Thanh Điền', 'ngodien2905@gmail.com', '0929617045', '404 Phan Xích Long, Quận Phú Nhuận, TP.HCM', 80),
(14, 'Trần Thị Minh Ánh', 'AnhTTMSS170415@fpt.edu.vn', '0393034039', '139 Nguyễn Kiệm, Quận 4, TP.HCM', 55),
(15, 'Nguyễn Thái Bảo', 'nguyenthaibao726@gmail.com', '0936616938', '254 Võ Nguyên Giáp, Quận 2, TP.HCM', 15),
(16, 'Đoàn Minh Khôi', 'khoidmse182684@fpt.edu.vn', '0776100666', '70 Quốc lộ 50, Quận 8, TP.HCM', 305),
(17, 'Đặng Mạnh Hùng', 'hungdmss180045@fpt.edu.vn', '0393034039', '139 Nguyễn Kiệm, Quận 4, TP.HCM', 95),
(18, 'Lê Anh Tuấn', 'tuanlase173591@fpt.edu.vn', '0934105023', '20/8 Trần Đăng Khoa, Quận 6, TP.HCM', 54),
(19, 'Nguyễn Ngọc Diễm Quỳnh', 'Quynhnndse172195@fpt.edu.vn', '0919895530', '27/5 Ký hòa, Quận 7, TP.HCM', 55),
(20, 'Nguyễn Lê Minh Kiệt', 'kietnlmse171427@fpt.edu.vn', '0782131516', '250 Nguyễn Văn Tăng, Quận 9, TP.HCM', 55);
--delete from Customers
--DBCC CHECKIDENT ('Customers', RESEED, 0);
--select * from Customers

INSERT INTO Varieties (VarietyName, Description, Origin) VALUES
('Kohaku', 'Cá Koi trắng với các mảng đỏ', 'Japan'),
('Sanke', 'Cá Koi trắng với các mảng đỏ và đen', 'Japan'),
('Showa', 'Cá Koi đen với các mảng đỏ và trắng', 'Japan'),
('Chagoi', 'Cá Koi màu nâu đồng', 'Japan'),
('Shusui', 'Cá Koi vảy gương với màu xanh và đỏ', 'Japan'),
('Kujaku', 'Cá Koi trắng với vảy bạc và mảng đỏ', 'Japan'),
('Goshiki', 'Cá Koi năm màu', 'Japan'),
('Yamabuki', 'Cá Koi màu vàng', 'Japan'),
('Asagi', 'Cá Koi xanh trên lưng, đỏ ở bụng', 'Japan'),
('Beni Kumonryu', 'Cá Koi đen với mảng trắng và đỏ', 'Japan');
--select * from Varieties

INSERT INTO Breeders (Name, Address, ContactInfo, CertificationLink, Notes) VALUES
('Dainichi Koi Farm', 'Niigata, Japan', 'contact@dainichi.com', 'https://dainichi-certification.jp', 'Nổi tiếng với dòng Koi Chagoi'),
('Momotaro Koi Farm', 'Aichi, Japan', 'info@momotaro-koi.com', 'https://momotaro-cert.jp', 'Chuyên về Koi Kohaku và Sanke'),
('Sakai Fish Farm', 'Hiroshima, Japan', 'sakai@koi.jp', 'https://sakai-fish-cert.jp', 'Một trong những trại cá Koi lâu đời nhất'),
('Omosako Koi Farm', 'Niigata, Japan', 'omosako@koifarm.jp', 'https://omosako-cert.jp', 'Nổi tiếng với dòng Koi Shiro Utsuri'),
('Marudo Koi Farm', 'Niigata, Japan', 'contact@marudo.jp', 'https://marudo-certification.jp', 'Chuyên về Koi Gosanke'),
('Isa Koi Farm', 'Niigata, Japan', 'isa@koifarm.com', 'https://isa-cert.jp', 'Nổi tiếng với dòng Koi Showa'),
('Kaneko Koi Farm', 'Fukuoka, Japan', 'info@kaneko-koi.jp', 'https://kaneko-certification.jp', 'Chuyên về Koi Doitsu'),
('Marusaka Koi Farm', 'Niigata, Japan', 'marusaka@koi.com', 'https://marusaka-cert.jp', 'Nổi tiếng với dòng Koi Goshiki'),
('Yagenji Koi Farm', 'Niigata, Japan', 'contact@yagenji.jp', 'https://yagenji-certification.jp', 'Chuyên về Koi Asagi và Shusui'),
('Otsuka Koi Farm', 'Saitama, Japan', 'otsuka@koifarm.jp', 'https://otsuka-cert.jp', 'Nổi tiếng với dòng Koi Kujaku');
--select * from Breeders

SET IDENTITY_INSERT KoiFish ON;
INSERT INTO KoiFish (KoiID, Name, VarietyID, Origin, BreederID, Gender, Born, Size, Weight, Personality, FeedingAmountPerDay, HealthStatus, ScreeningRate, Price, CertificateLink, ImagesLink, Availability) VALUES
(1, 'Sakura Beauty', 1, 'Imported', 1, 'Female', 2022, 45, 2.5, 'Friendly and active', 30, 'Excellent', 9.5, 5000000, 'https://cert.onkoi.vn/sakura-beauty', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-80-cm-3-tuoi-010-300x300.jpg', 'Available'),
(2, 'Golden Dragon', 8, 'Imported', 2, 'Male', 2021, 60, 4.2, 'Majestic and calm', 50, 'Good', 9.0, 8000000, 'https://cert.onkoi.vn/golden-dragon', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-97-cm-5-tuoi-049-300x300.jpg', 'Available'),
(3, 'Azure Dream', 9, 'F1 Hybrid', 4, 'Female', 2023, 35, 1.8, 'Shy but curious', 25, 'Excellent', 8.5, 3500000, 'https://cert.onkoi.vn/azure-dream', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-78-cm-3-tuoi-050-300x300.jpg', 'Available'),
(4, 'Crimson Warrior', 3, 'Imported', 6, 'Male', 2020, 70, 5.5, 'Bold and energetic', 60, 'Excellent', 9.8, 12000000, 'https://cert.onkoi.vn/crimson-warrior', 'https://onkoi.vn/wp-content/uploads/2021/03/tancho-kohaku-84-cm-4-tuoi-052-300x300.jpg', 'Available'),
(5, 'Moonlight Serenade', 5, 'Pure Vietnamese', 9, 'Female', 2022, 50, 3.0, 'Graceful and gentle', 35, 'Good', 8.7, 4500000, 'https://cert.onkoi.vn/moonlight-serenade', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kohaku-91-cm-7-tuoi-056-300x300.jpg', 'Available'),
(6, 'Sunset Blaze', 7, 'Imported', 8, 'Male', 2021, 55, 3.8, 'Playful and sociable', 45, 'Excellent', 9.2, 7000000, 'https://cert.onkoi.vn/sunset-blaze', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-chagoi-80-cm-4-tuoi-016-300x300.jpg', 'Available'),
(7, 'Pearl Princess', 2, 'F1 Hybrid', 3, 'Female', 2023, 40, 2.2, 'Elegant and calm', 30, 'Good', 8.8, 4000000, 'https://cert.onkoi.vn/pearl-princess', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-80-cm-3-tuoi-010-300x300.jpg', 'Available'),
(8, 'Thunder Storm', 6, 'Imported', 5, 'Male', 2020, 65, 4.8, 'Powerful and dominant', 55, 'Excellent', 9.6, 9500000, 'https://cert.onkoi.vn/thunder-storm', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-goshiki-72-cm-3-tuoi-013-300x300.jpg', 'Available'),
(9, 'Autumn Whisper', 4, 'Pure Vietnamese', 7, 'Female', 2022, 48, 2.8, 'Peaceful and adaptable', 35, 'Good', 8.9, 5500000, 'https://cert.onkoi.vn/autumn-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-75-cm-3-tuoi-009-300x300.jpg', 'Available'),
(10, 'Midnight Samurai', 10, 'Imported', 10, 'Male', 2021, 58, 4.0, 'Mysterious and strong', 50, 'Excellent', 9.4, 8500000, 'https://cert.onkoi.vn/midnight-samurai', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-85-cm-4-tuoi-006-300x300.jpg', 'Available');
--select * from KoiFish

--SET IDENTITY_INSERT KoiPackage ON;
INSERT INTO KoiPackage (KoiID, PackageName, ImageLink, Price, PackageSize, Availability) VALUES
(1, 'Sakura Starter Pack', 'https://onkoi.vn/wp-content/uploads/2021/01/lo-kohaku-38-cm-066-768x768.jpg', 6000000, 1, 'Available'),
(2, 'Golden Luxury Set', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-karashi-70-75-cm-3-tuoi-005-768x768.jpg', 10000000, 2, 'Available'),
(3, 'Azure Beginner Bundle', 'https://onkoi.vn/wp-content/uploads/2021/03/lo-koi-showa-kohaku-75-80-cm-3-tuoi-051-768x768.jpg', 4500000, 1, 'Available'),
(4, 'Crimson Elite Collection', 'https://onkoi.vn/wp-content/uploads/2021/01/lo-koi-kohaku-dainichi-30-cm-063-768x768.jpg', 15000000, 3, 'Available'),
(5, 'Moonlight Duo', 'https://onkoi.vn/wp-content/uploads/2020/07/lo-koi-Yagenji-Beni-Kikokuryu-35-cm-004-768x768.jpg', 8000000, 2, 'Available'),
(6, 'Sunset Family Pack', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-karashi-70-75-cm-3-tuoi-005-768x768.jpg', 12000000, 4, 'Available');
--select * from KoiPackage
--delete from KoiPackage
--DBCC CHECKIDENT ('KoiPackage', RESEED, 0);

INSERT INTO Promotions (PromotionCode, Description, DiscountType, DiscountValue, StartDate, EndDate, Status, MinPurchaseAmount) VALUES
('SUMMER2024', 'Khuyến mãi mùa hè 2024', 'Percentage', 15.00, '2024-06-01', '2024-08-31', 'Active', 5000000),
('NEWCUSTOMER', 'Ưu đãi cho khách hàng mới', 'Fixed Amount', 500000, '2024-01-01', '2024-12-31', 'Active', 3000000),
('LOYALTY10', 'Giảm giá cho khách hàng thân thiết', 'Percentage', 10.00, '2024-03-01', '2024-12-31', 'Active', 8000000),
('FLASH24H', 'Khuyến mãi flash 24 giờ', 'Percentage', 20.00, '2024-07-15', '2024-07-16', 'Active', 2000000),
('AUTUMN2024', 'Ưu đãi mùa thu 2024', 'Percentage', 12.00, '2024-09-01', '2024-11-30', 'Active', 6000000),
('BLACKFRIDAY', 'Giảm giá Black Friday', 'Percentage', 25.00, '2024-11-29', '2024-11-30', 'Active', 10000000),
('XMAS2024', 'Quà tặng Giáng sinh', 'Fixed Amount', 1000000, '2024-12-20', '2024-12-25', 'Active', 15000000),
('NEWYEAR2025', 'Chào đón năm mới 2025', 'Percentage', 18.00, '2024-12-31', '2025-01-07', 'Active', 5000000),
('TETHOLIDAY', 'Ưu đãi Tết Nguyên Đán', 'Percentage', 15.00, '2025-01-25', '2025-02-05', 'Active', 8000000),
('SPRINGJOY', 'Hân hoan mùa xuân', 'Fixed Amount', 750000, '2025-03-01', '2025-03-31', 'Active', 4000000);
--select * from Promotions

INSERT INTO Orders (CustomerID, OrderDate, TotalAmount, ShippingAddress, OrderStatus, PaymentMethod, PaymentStatus, TrackingNumber, Discount, ShippingCost, PromotionID) VALUES
(1, '2024-06-15 10:30:00', 5500000, '123 Lê Lợi, Quận 1, TP.HCM', 'Delivered', 'Credit Card', 'Completed', 'VN123456789', 500000, 200000, 1),
(2, '2024-07-20 14:45:00', 8200000, '456 Nguyễn Huệ, Quận 1, TP.HCM', 'Shipped', 'Bank Transfer', 'Completed', 'VN987654321', 800000, 250000, 3),
(5, '2024-08-05 09:15:00', 3700000, '789 Trần Hưng Đạo, Quận 5, TP.HCM', 'Processing', 'Cash on Delivery', 'Pending', NULL, 300000, 150000, 2),
(6, '2024-09-10 16:20:00', 12500000, '101 Võ Văn Tần, Quận 3, TP.HCM', 'Pending', 'Credit Card', 'Pending', NULL, 1500000, 300000, 5),
(7, '2024-10-01 11:00:00', 7800000, '202 Nguyễn Thị Minh Khai, Quận 3, TP.HCM', 'Shipped', 'Bank Transfer', 'Completed', 'VN135792468', 700000, 200000, 4),
(9, '2024-11-15 13:30:00', 9200000, '303 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', 'Delivered', 'Credit Card', 'Completed', 'VN246813579', 1000000, 250000, 6),
(10, '2024-12-20 15:45:00', 15800000, '404 Phan Xích Long, Quận Phú Nhuận, TP.HCM', 'Processing', 'Bank Transfer', 'Completed', NULL, 2000000, 300000, 7),
(11, '2025-01-05 08:30:00', 6300000, '123 Lê Lợi, Quận 1, TP.HCM', 'Pending', 'Cash on Delivery', 'Pending', NULL, 600000, 200000, 8),
(12, '2025-02-10 10:00:00', 10500000, '456 Nguyễn Huệ, Quận 1, TP.HCM', 'Shipped', 'Credit Card', 'Completed', 'VN369258147', 1200000, 250000, 9),
(14, '2025-03-15 14:15:00', 4800000, '789 Trần Hưng Đạo, Quận 5, TP.HCM', 'Delivered', 'Bank Transfer', 'Completed', 'VN741852963', 450000, 150000, 10);
--DELETE from Orders
--DBCC CHECKIDENT ('Orders', RESEED, 0);
--select * from Orders

INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice, TotalPrice, ProductType, CertificateStatus) VALUES
(1, 1, 1, 5000000, 5000000, 'Single Fish', 'Issued'),
(2, 2, 1, 8000000, 8000000, 'Single Fish', 'Issued'),
(3, 3, 1, 3500000, 3500000, 'Single Fish', 'Not Issued'),
(4, 4, 1, 12000000, 12000000, 'Single Fish', 'Issued'),
(5, 5, 1, 4500000, 4500000, 'Single Fish', 'Issued'),
(6, 6, 1, 7000000, 7000000, 'Single Fish', 'Issued'),
(7, 7, 1, 4000000, 4000000, 'Single Fish', 'Not Issued'),
(8, 8, 1, 9500000, 9500000, 'Single Fish', 'Issued'),
(9, 9, 1, 5500000, 5500000, 'Single Fish', 'Issued'),
(10, 10, 1, 8500000, 8500000, 'Single Fish', 'Issued');
--select * from OrderDetails

INSERT INTO Payments (OrderID, PaymentDate, PaymentMethod, PaymentStatus) VALUES
(1, '2024-06-15 10:35:00', 'Credit Card', 'Completed'),
(2, '2024-07-20 14:50:00', 'Bank Transfer', 'Completed'),
(3, '2024-08-05 09:20:00', 'Cash on Delivery', 'Pending'),
(4, '2024-09-10 16:25:00', 'Credit Card', 'Pending'),
(5, '2024-10-01 11:05:00', 'Bank Transfer', 'Completed'),
(6, '2024-11-15 13:35:00', 'Credit Card', 'Completed'),
(7, '2024-12-20 15:50:00', 'Bank Transfer', 'Completed'),
(8, '2025-01-05 08:35:00', 'Cash on Delivery', 'Pending'),
(9, '2025-02-10 10:05:00', 'Credit Card', 'Completed'),
(10, '2025-03-15 14:20:00', 'Bank Transfer', 'Completed');
--select * from Payments

INSERT INTO KoiImages (KoiID, ImageLink, Description, UploadedDate) VALUES
(1, 'https://img.onkoi.vn/sakura-beauty-1.jpg', 'Sakura Beauty - Mặt bên', '2024-05-01 09:00:00'),
(1, 'https://img.onkoi.vn/sakura-beauty-2.jpg', 'Sakura Beauty - Mặt trên', '2024-05-01 09:05:00'),
(2, 'https://img.onkoi.vn/golden-dragon-1.jpg', 'Golden Dragon - Toàn thân', '2024-05-02 10:30:00'),
(3, 'https://img.onkoi.vn/azure-dream-1.jpg', 'Azure Dream - Mặt bên', '2024-05-03 11:15:00'),
(4, 'https://img.onkoi.vn/crimson-warrior-1.jpg', 'Crimson Warrior - Toàn cảnh', '2024-05-04 14:00:00'),
(4, 'https://img.onkoi.vn/crimson-warrior-2.jpg', 'Crimson Warrior - Cận cảnh đầu', '2024-05-04 14:05:00'),
(5, 'https://img.onkoi.vn/moonlight-serenade-1.jpg', 'Moonlight Serenade - Mặt bên', '2024-05-05 16:30:00'),
(6, 'https://img.onkoi.vn/sunset-blaze-1.jpg', 'Sunset Blaze - Toàn thân', '2024-05-06 09:45:00'),
(7, 'https://img.onkoi.vn/pearl-princess-1.jpg', 'Pearl Princess - Mặt trên', '2024-05-07 11:20:00'),
(8, 'https://img.onkoi.vn/thunder-storm-1.jpg', 'Thunder Storm - Cận cảnh vảy', '2024-05-08 13:00:00');
--select * from KoiImages

INSERT INTO KoiCertificates (KoiID, CertificateLink, IssuedDate, SoldDate) VALUES
(1, 'https://cert.onkoi.vn/sakura-beauty-cert.pdf', '2024-05-15', '2024-06-15'),
(2, 'https://cert.onkoi.vn/golden-dragon-cert.pdf', '2024-06-01', '2024-07-20'),
(4, 'https://cert.onkoi.vn/crimson-warrior-cert.pdf', '2024-07-10', '2024-09-10'),
(5, 'https://cert.onkoi.vn/moonlight-serenade-cert.pdf', '2024-08-05', '2024-10-01'),
(6, 'https://cert.onkoi.vn/sunset-blaze-cert.pdf', '2024-09-20', '2024-11-15'),
(8, 'https://cert.onkoi.vn/thunder-storm-cert.pdf', '2024-10-15', '2025-01-05'),
(9, 'https://cert.onkoi.vn/autumn-whisper-cert.pdf', '2024-11-01', '2025-02-10'),
(10, 'https://cert.onkoi.vn/midnight-samurai-cert.pdf', '2024-12-05', '2025-03-15');
--select * from KoiCertificates

INSERT INTO LoyaltyPoints (CustomerID, PointsEarned, PointsUsed, TotalPoints, LastUpdated) VALUES
(1, 500, 200, 300, '2024-06-15 10:40:00'),
(2, 800, 300, 500, '2024-07-20 14:55:00'),
(4, 350, 50, 300, '2024-08-05 09:25:00'),
(6, 1200, 400, 800, '2024-09-10 16:30:00'),
(7, 750, 250, 500, '2024-10-01 11:10:00'),
(9, 900, 100, 800, '2024-11-15 13:40:00'),
(10, 1500, 500, 1000, '2024-12-20 15:55:00');
--select * from LoyaltyPoints

INSERT INTO Reviews (ProductID, CustomerID, Rating, Comment, ReviewDate, Status) VALUES
(1, 1, 5, 'Cá Koi Sakura Beauty thật sự đẹp và khỏe mạnh. Rất hài lòng với sản phẩm!', '2024-06-30 09:00:00', 'Visible'),
(2, 2, 4, 'Golden Dragon là một con cá Koi ấn tượng. Chỉ tiếc là hơi nhút nhát.', '2024-08-05 14:30:00', 'Visible'),
(3, 4, 5, 'Azure Dream là một lựa chọn tuyệt vời cho người mới chơi Koi như tôi.', '2024-08-20 11:15:00', 'Visible'),
(4, 6, 5, 'Crimson Warrior quả thực xứng đáng với cái tên. Rất mạnh mẽ và đẹp!', '2024-09-25 16:45:00', 'Visible'),
(5, 7, 4, 'Moonlight Serenade có màu sắc rất dịu dàng, phù hợp với hồ cá của tôi.', '2024-10-15 10:20:00', 'Visible'),
(6, 9, 5, 'Sunset Blaze là một bổ sung tuyệt vời cho bộ sưu tập Koi của tôi.', '2024-11-30 13:00:00', 'Visible'),
(7, 10, 4, 'Pearl Princess rất duyên dáng. Chỉ có điều hơi nhỏ so với mong đợi.', '2024-12-30 15:30:00', 'Visible'),
(8, 1, 5, 'Thunder Storm quả là một con cá Koi ấn tượng. Rất hài lòng với việc mua hàng!', '2025-01-20 09:45:00', 'Visible'),
(9, 2, 5, 'Autumn Whisper là một lựa chọn tuyệt vời. Màu sắc rất hài hòa và đẹp mắt.', '2025-02-25 11:30:00', 'Visible'),
(10, 4, 5, 'Midnight Samurai thực sự là một tác phẩm nghệ thuật sống. Rất ấn tượng!', '2025-03-30 14:15:00', 'Visible');
--select * from Reviews


INSERT INTO BlogPosts (UserID, Title, Content, CreatedDate, UpdatedDate, Status) VALUES
(5, 'Cách chọn cá Koi chất lượng', 'Khi chọn cá Koi, có một số yếu tố quan trọng cần xem xét...', '2024-06-01 09:00:00', '2024-06-01 09:00:00', 'Published'),
(3, 'Dinh dưỡng cho cá Koi: Những điều cần biết', 'Chế độ dinh dưỡng đóng vai trò quan trọng trong sức khỏe và màu sắc của cá Koi...', '2024-07-15 10:30:00', '2024-07-15 10:30:00', 'Published'),
(5, 'Các loại cá Koi phổ biến tại Việt Nam', 'Tại Việt Nam, có nhiều loại cá Koi được yêu thích...', '2024-08-20 14:00:00', '2024-08-20 14:00:00', 'Published'),
(3, 'Cách xây dựng hồ Koi đúng cách', 'Để có một hồ Koi hoàn hảo, bạn cần chú ý đến một số yếu tố...', '2024-09-10 11:45:00', '2024-09-10 11:45:00', 'Published'),
(5, 'Lịch sử và ý nghĩa của cá Koi trong văn hóa Nhật Bản', 'Cá Koi không chỉ là một loài cá cảnh, mà còn mang nhiều ý nghĩa sâu sắc...', '2024-10-05 16:20:00', '2024-10-05 16:20:00', 'Published'),
(3, 'Cách phòng và trị bệnh cho cá Koi', 'Bệnh tật là một trong những thách thức lớn nhất khi nuôi cá Koi...', '2024-11-12 13:10:00', '2024-11-12 13:10:00', 'Published'),
(5, 'Kỹ thuật cho cá Koi ăn đúng cách', 'Cho cá Koi ăn không chỉ đơn giản là thả thức ăn vào hồ...', '2024-12-18 09:30:00', '2024-12-18 09:30:00', 'Published'),
(3, 'Cách nhận biết cá Koi có chất lượng tốt', 'Để chọn được một con cá Koi chất lượng, bạn cần biết một số đặc điểm...', '2025-01-22 15:00:00', '2025-01-22 15:00:00', 'Published'),
(5, 'Xu hướng nuôi cá Koi tại Việt Nam', 'Trong những năm gần đây, việc nuôi cá Koi tại Việt Nam ngày càng phổ biến...', '2025-02-28 10:45:00', '2025-02-28 10:45:00', 'Published'),
(3, 'Cách tạo môi trường sống tốt nhất cho cá Koi', 'Môi trường sống đóng vai trò quan trọng trong sự phát triển của cá Koi...', '2025-03-15 12:30:00', '2025-03-15 12:30:00', 'Published');
--select * from BlogPosts

INSERT INTO Categories (CategoryName) VALUES
('Chăm sóc cá Koi'),
('Dinh dưỡng'),
('Thiết kế hồ'),
('Lịch sử và văn hóa'),
('Sức khỏe cá'),
('Kỹ thuật nuôi'),
('Chọn lựa cá Koi'),
('Xu hướng thị trường'),
('Môi trường sống'),
('Giống cá Koi');
--select * from Categories

INSERT INTO BlogCategories (PostID, CategoryID) VALUES
(1, 7), (1, 1),
(2, 2), (2, 1),
(3, 10), (3, 8),
(4, 3), (4, 9),
(5, 4), (5, 10),
(6, 5), (6, 1),
(7, 2), (7, 6),
(8, 7), (8, 1),
(9, 8), (9, 10),
(10, 9), (10, 1);
--select * from BlogCategories

INSERT INTO Comments (PostID, UserID, CommentText, CommentDate, Status) VALUES
(1, 1, 'Bài viết rất hữu ích cho người mới chơi Koi như tôi!', '2024-06-02 10:15:00', 'Visible'),
(1, 2, 'Tôi đã áp dụng những lời khuyên này và thấy rất hiệu quả.', '2024-06-03 14:30:00', 'Visible'),
(2, 4, 'Cảm ơn vì đã chia sẻ thông tin về dinh dưỡng cho cá Koi.', '2024-07-16 09:45:00', 'Visible'),
(3, 6, 'Tôi không biết có nhiều loại cá Koi đến vậy ở Việt Nam!', '2024-08-21 11:20:00', 'Visible'),
(4, 7, 'Bài viết này đã giúp tôi rất nhiều trong việc thiết kế hồ cá.', '2024-09-11 16:00:00', 'Visible'),
(5, 9, 'Thật thú vị khi biết về lịch sử và ý nghĩa của cá Koi.', '2024-10-06 13:40:00', 'Visible'),
(6, 10, 'Những thông tin về bệnh cá rất hữu ích. Cảm ơn tác giả!', '2024-11-13 10:30:00', 'Visible'),
(7, 1, 'Tôi đã học được nhiều điều mới về cách cho cá Koi ăn.', '2024-12-19 15:15:00', 'Visible'),
(8, 2, 'Bài viết này giúp tôi tự tin hơn khi chọn mua cá Koi.', '2025-01-23 09:00:00', 'Visible'),
(9, 4, 'Thật tuyệt vời khi thấy ngày càng nhiều người yêu thích cá Koi ở Việt Nam!', '2025-03-01 11:45:00', 'Visible');
--select * from Comments

INSERT INTO KoiPackageVarieties (PackageID, VarietyID) VALUES
(3, 1), (4, 2),
(5, 8), (6, 3),
(7, 9), (8, 5);
--(6, 3), (4, 6), (4, 7),
--(7, 5), (5, 9);
--(6, 6), (6, 7), (6, 8), (6, 10),
--(7, 2), (7, 4),
--(8, 6), (8, 10),
--(9, 4), (9, 5), (9, 7),
--(10, 10), (10, 3);

--select * from KoiPackageVarieties
--select * from KoiPackage

INSERT INTO KoiPackageBreeders (PackageID, BreederID) VALUES
(3, 1), (4, 2),
(5, 2), (6, 3),
(7, 4), (8, 9);
--(4, 6), (4, 5), (4, 8),
--(5, 9), (5, 4),
--(2, 2), (2, 1),
--(3, 10), (3, 8),
--(4, 3), (4, 9),
--(5, 4), (5, 10);
--select * from KoiPackageBreeders

-- Thêm dữ liệu vào bảng Comments
INSERT INTO Comments (PostID, UserID, CommentText, CommentDate, Status) VALUES
(1, 1, 'Bài viết rất hữu ích cho người mới chơi Koi như tôi!', '2024-06-02 10:15:00', 'Visible'),
(1, 2, 'Tôi đã áp dụng những lời khuyên này và thấy rất hiệu quả.', '2024-06-03 14:30:00', 'Visible'),
(2, 4, 'Cảm ơn vì đã chia sẻ thông tin về dinh dưỡng cho cá Koi.', '2024-07-16 09:45:00', 'Visible'),
(3, 6, 'Tôi không biết có nhiều loại cá Koi đến vậy ở Việt Nam!', '2024-08-21 11:20:00', 'Visible'),
(4, 7, 'Bài viết này đã giúp tôi rất nhiều trong việc thiết kế hồ cá.', '2024-09-11 16:00:00', 'Visible'),
(5, 9, 'Thật thú vị khi biết về lịch sử và ý nghĩa của cá Koi.', '2024-10-06 13:40:00', 'Visible'),
(6, 10, 'Những thông tin về bệnh cá rất hữu ích. Cảm ơn tác giả!', '2024-11-13 10:30:00', 'Visible'),
(7, 1, 'Tôi đã học được nhiều điều mới về cách cho cá Koi ăn.', '2024-12-19 15:15:00', 'Visible'),
(8, 2, 'Bài viết này giúp tôi tự tin hơn khi chọn mua cá Koi.', '2025-01-23 09:00:00', 'Visible'),
(9, 4, 'Thật tuyệt vời khi thấy ngày càng nhiều người yêu thích cá Koi ở Việt Nam!', '2025-03-01 11:45:00', 'Visible');
--select * from Comments

INSERT INTO OrderHistory (OrderID, TrackingNumber, ShipmentDate, DeliveryDate, ShipmentStatus) VALUES
(1, 'VN123456789', '2024-06-16 09:00:00', '2024-06-18 14:30:00', 'Delivered'),
(2, 'VN987654321', '2024-07-21 10:15:00', '2024-07-23 16:45:00', 'Delivered'),
(3, NULL, NULL, NULL, 'In Transit'),
(4, NULL, NULL, NULL, 'In Transit'),
(5, 'VN135792468', '2024-10-02 08:30:00', '2024-10-04 13:20:00', 'Delivered'),
(6, 'VN246813579', '2024-11-16 11:00:00', '2024-11-18 15:40:00', 'Delivered'),
(7, NULL, NULL, NULL, 'In Transit'),
(8, NULL, NULL, NULL, 'In Transit'),
(9, 'VN369258147', '2025-02-11 09:45:00', '2025-02-13 14:15:00', 'Delivered'),
(10, 'VN741852963', '2025-03-16 10:30:00', '2025-03-18 16:00:00', 'Delivered');
--select * from OrderHistory

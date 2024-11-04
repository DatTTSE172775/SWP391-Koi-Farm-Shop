CREATE DATABASE KoiFarmShop3
USE KoiFarmShop3

CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(50) CHECK (Role IN ('Customer', 'Staff', 'Manager')) DEFAULT 'Customer',
    SubscriptionStatus VARCHAR(50) CHECK (SubscriptionStatus IN ('Active', 'Inactive')) NOT NULL
);

select * from Users

CREATE TABLE Customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    FullName NVARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(20),
    Address NVARCHAR(MAX),
    LoyaltyPoints INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

--select * from Customers

CREATE TABLE Varieties (
    VarietyID INT IDENTITY(1,1) PRIMARY KEY,
    VarietyName NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Origin NVARCHAR(50) CHECK (Origin IN ('Japan', 'Vietnam', 'Other'))
);

--select * from Varieties where VarietyID =1

CREATE TABLE Breeders (
    BreederID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Address NVARCHAR(MAX),
    ContactInfo NVARCHAR(255),
    CertificationLink VARCHAR(255),
    Notes NVARCHAR(MAX)
);

CREATE TABLE KoiFish (
    KoiID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    VarietyID INT,
    Origin VARCHAR(50) CHECK (Origin IN ('Imported', 'F1 Hybrid', 'Pure Vietnamese')),
    BreederID INT,
    Gender VARCHAR(50) CHECK (Gender IN ('Male', 'Female', 'Unknown')),
    Born INT,
    Size FLOAT,
    Weight FLOAT,
    Personality NVARCHAR(MAX),
    FeedingAmountPerDay FLOAT,
    HealthStatus NVARCHAR(255),
    ScreeningRate FLOAT,
    Price DECIMAL(10, 2),
    CertificateLink VARCHAR(255),
    ImagesLink VARCHAR(255),
    AddedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Availability VARCHAR(50) CHECK (Availability IN ('Available', 'Sold Out')),
    FOREIGN KEY (VarietyID) REFERENCES Varieties(VarietyID),
    FOREIGN KEY (BreederID) REFERENCES Breeders(BreederID)
);

--select * from KoiFish
--select * from Breeders
--select * from Varieties


CREATE TABLE KoiPackage(
    PackageID INT IDENTITY(1,1) PRIMARY KEY,
    KoiID INT NOT NULL,
    PackageName NVARCHAR(255),
    ImageLink VARCHAR(255),
    Price DECIMAL(10, 2),
    PackageSize INT,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Availability VARCHAR(50) CHECK (Availability IN ('Available', 'Sold Out')),
	Quantity INT DEFAULT NULL,
    FOREIGN KEY (KoiID) REFERENCES KoiFish(KoiID),
);

--SELECT * FROM KoiPackage WHERE PackageID = 7


--select * from KoiFish
--SELECT * FROM KoiPackage
--select * from KoiPackageVarieties
--select * from KoiPackageBreeders
--select * from Reviews

CREATE TABLE KoiConsignment (
    ConsignmentID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT,
    KoiID INT,
    ConsignmentType VARCHAR(50) CHECK (ConsignmentType IN ('Care', 'Sale')), -- Should be Care or Sale only
    ConsignmentMode VARCHAR(50) CHECK (ConsignmentMode IN ('Offline', 'Online')), -- Should be online only
    StartDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    EndDate DATETIME,
    Status VARCHAR(50) CHECK (Status IN ('Pending', 'Approved', 'In Care', 'Listed for Sale', 'Sold', 'Withdrawn')) DEFAULT 'Pending',
    PriceAgreed DECIMAL(10, 2),
    PickupDate DATETIME,
    ApprovedStatus VARCHAR(50) CHECK (ApprovedStatus IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    InspectionResult NVARCHAR(MAX),
    Notes NVARCHAR(MAX),
    KoiType NVARCHAR(100),
    KoiColor NVARCHAR(100),
    KoiAge INT,
    KoiSize INT,
    ImagePath NVARCHAR(255),
    UserID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (KoiID) REFERENCES KoiFish(KoiID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
      SELECT 
        COUNT(*) AS ActiveConsignments,
        SUM(CASE WHEN Status = 'For Sale' THEN 1 ELSE 0 END) AS ForSale
      FROM KoiConsignment
      WHERE Status IN ('In Care', 'For Sale')


	select * from KoiConsignment where UserID = 3 And ApprovedStatus = 'Pending'

	--UPDATE KoiConsignment
     --           SET ApprovedStatus = 'Pending'
     --           WHERE ConsignmentID = 1

--use KoiFarmShop
--SELECT * FROM KoiConsignment
--select * from Orders	
--select * from Users;
--select * from OrderDetails


--SELECT kc.* 
--        FROM KoiConsignment kc
--       JOIN Users u ON kc.UserID = u.userId
--        WHERE u.userId = 3 AND u.Role = 'Staff'

CREATE TABLE Promotions (
    PromotionID INT IDENTITY(1,1) PRIMARY KEY,
    PromotionCode VARCHAR(255) UNIQUE,
    Description NVARCHAR(255),
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
    TotalAmount DECIMAL(10, 2) DEFAULT 0.00,
    ShippingAddress NVARCHAR(MAX),
    OrderStatus VARCHAR(50) CHECK (OrderStatus IN ('Pending', 'Processing', 'Delivering', 'Delivered', 'Cancelled')) DEFAULT 'Pending',
    PaymentMethod VARCHAR(50) CHECK (PaymentMethod IN ('Credit Card', 'Bank Transfer', 'Cash on Delivery')),
    PaymentStatus VARCHAR(50) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Refunded', 'Failed')) DEFAULT 'Pending',
    TrackingNumber VARCHAR(255),
    Discount DECIMAL(10, 2) DEFAULT 0.00,
    ShippingCost DECIMAL(10, 2) DEFAULT 0.00,
    ConsignmentID INT,
    PromotionID INT DEFAULT NULL,
    UserID INT DEFAULT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ConsignmentID) REFERENCES KoiConsignment(ConsignmentID),
    FOREIGN KEY (PromotionID) REFERENCES Promotions(PromotionID)
);
--select * from KoiFish
select * from Orders
--select * from Customers
      SELECT 
        CONVERT(VARCHAR, OrderDate, 23) AS Date,  -- Định dạng ngày theo "YYYY-MM-DD"
        SUM(TotalAmount) AS DailyRevenue
      FROM Orders
      WHERE MONTH(OrderDate) = MONTH(GETDATE())
      AND YEAR(OrderDate) = YEAR(GETDATE())
      AND OrderStatus = 'Delivered'
      GROUP BY CONVERT(VARCHAR, OrderDate, 23)
      ORDER BY Date
--SELECT * FROM OrderDetails WHERE OrderID = 14


CREATE TABLE OrderDetails (
    OrderDetailID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT,
    ProductID INT NULL,      
	Quantity INT,
    UnitPrice DECIMAL(10, 2),
    TotalPrice AS (Quantity * UnitPrice) PERSISTED, -- Công thức tự động
    ProductType VARCHAR(50) CHECK (ProductType IN ('Single Fish', 'Package', 'All')),
    CertificateStatus VARCHAR(50) CHECK (CertificateStatus IN ('Issued', 'Not Issued', 'Pending')) DEFAULT 'Not Issued',
	KoiID INT NULL,
    PackageID INT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES KoiFish(KoiID),
    FOREIGN KEY (PackageID) REFERENCES KoiPackage(PackageID)
);

--SELECT od.OrderDetailID, kp.PackageName, kp.PackageID
--FROM OrderDetails od
--JOIN KoiPackage kp ON od.PackageID = kp.PackageID
--WHERE od.OrderID = 14;

--select * from Orders

--select * from OrderDetails

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
    CareDetails NVARCHAR(MAX),
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
    Comment NVARCHAR(MAX),
    ReviewDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) CHECK (Status IN ('Visible', 'Hidden')) DEFAULT 'Visible',
    FOREIGN KEY (ProductID) REFERENCES KoiFish(KoiID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE BlogPosts (
    PostID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    Title NVARCHAR(255),
    Content NVARCHAR(MAX),
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedDate DATETIME,
    Status VARCHAR(50) CHECK (Status IN ('Draft', 'Published', 'Archived')) DEFAULT 'Draft',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(255) NOT NULL
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
    CommentText NVARCHAR(MAX),
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
('SWP391', '$2b$10$2Awqt5Ew/5.A0R0il68nuOj6ReVssi/GKyCPp.8CfnP3FA2zhEjjO', 'Manager', 'Active'),
('tranganh', '$2b$10$2Awqt5Ew/5.A0R0il68nuOj6ReVssi/GKyCPp.8CfnP3FA2zhEjjO', 'Staff', 'Active'),
('thanhdat', '$2b$10$2Awqt5Ew/5.A0R0il68nuOj6ReVssi/GKyCPp.8CfnP3FA2zhEjjO', 'Staff', 'Active'),
('dangkhoa', '$2b$10$2Awqt5Ew/5.A0R0il68nuOj6ReVssi/GKyCPp.8CfnP3FA2zhEjjO', 'Staff', 'Active'),
('huunam', '$2b$10$2Awqt5Ew/5.A0R0il68nuOj6ReVssi/GKyCPp.8CfnP3FA2zhEjjO', 'Staff', 'Active'),
('quangthuan', '$2b$10$2Awqt5Ew/5.A0R0il68nuOj6ReVssi/GKyCPp.8CfnP3FA2zhEjjO', 'Staff', 'Active'),
('TuyetHuong', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('PhuNinh', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('TuongHuy', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Inactive'),
('VietHan', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('LeDuy', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('QuocTrieu', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('ThanhDien', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('MinhAnh', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active');

INSERT INTO Users (Username, PasswordHash, Role, SubscriptionStatus) VALUES
('ThaiBao', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Inactive'),
('MinhKhoi', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('ManhHung', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('AnhTuan', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('DiemQuynh', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active'),
('MinhKiet', '$2b$10$OTPdR1qte0bX/iwWC2/Aqu8m.xnVPE1jDKmi/7KJpCDq.d2T7mc3O', 'Customer', 'Active');

--delete from Users
--DBCC CHECKIDENT ('Users', RESEED, 0);
select * from Users

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
select * from Customers

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
select * from Varieties

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

--SET IDENTITY_INSERT KoiFish OFF;
INSERT INTO KoiFish (Name, VarietyID, Origin, BreederID, Gender, Born, Size, Weight, Personality, FeedingAmountPerDay, HealthStatus, ScreeningRate, Price, CertificateLink, ImagesLink, Availability) VALUES
('Sakura Beauty', 1, 'Imported', 1, 'Female', 2022, 45, 2.5, 'Friendly and active', 30, 'Excellent', 9.5, 5000000, 'https://cert.onkoi.vn/sakura-beauty', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-80-cm-3-tuoi-010-300x300.jpg', 'Available'),
('Golden Dragon', 8, 'Imported', 2, 'Male', 2021, 60, 4.2, 'Majestic and calm', 50, 'Good', 9.0, 8000000, 'https://cert.onkoi.vn/golden-dragon', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-97-cm-5-tuoi-049-300x300.jpg', 'Available'),
('Azure Dream', 9, 'F1 Hybrid', 4, 'Female', 2023, 35, 1.8, 'Shy but curious', 25, 'Excellent', 8.5, 3500000, 'https://cert.onkoi.vn/azure-dream', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-78-cm-3-tuoi-050-300x300.jpg', 'Available'),
('Crimson Warrior', 3, 'Imported', 6, 'Male', 2020, 70, 5.5, 'Bold and energetic', 60, 'Excellent', 9.8, 12000000, 'https://cert.onkoi.vn/crimson-warrior', 'https://onkoi.vn/wp-content/uploads/2021/03/tancho-kohaku-84-cm-4-tuoi-052-300x300.jpg', 'Available'),
('Moonlight Serenade', 5, 'Pure Vietnamese', 9, 'Female', 2022, 50, 3.0, 'Graceful and gentle', 35, 'Good', 8.7, 4500000, 'https://cert.onkoi.vn/moonlight-serenade', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kohaku-91-cm-7-tuoi-056-300x300.jpg', 'Available'),
('Sunset Blaze', 7, 'Imported', 8, 'Male', 2021, 55, 3.8, 'Playful and sociable', 45, 'Excellent', 9.2, 7000000, 'https://cert.onkoi.vn/sunset-blaze', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-chagoi-80-cm-4-tuoi-016-300x300.jpg', 'Available'),
('Pearl Princess', 2, 'F1 Hybrid', 3, 'Female', 2023, 40, 2.2, 'Elegant and calm', 30, 'Good', 8.8, 4000000, 'https://cert.onkoi.vn/pearl-princess', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-80-cm-3-tuoi-010-300x300.jpg', 'Available'),
('Thunder Storm', 6, 'Imported', 5, 'Male', 2020, 65, 4.8, 'Powerful and dominant', 55, 'Excellent', 9.6, 9500000, 'https://cert.onkoi.vn/thunder-storm', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-goshiki-72-cm-3-tuoi-013-300x300.jpg', 'Available'),
('Autumn Whisper', 4, 'Pure Vietnamese', 7, 'Female', 2022, 48, 2.8, 'Peaceful and adaptable', 35, 'Good', 8.9, 5500000, 'https://cert.onkoi.vn/autumn-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-75-cm-3-tuoi-009-300x300.jpg', 'Available'),
('Midnight Samurai', 10, 'Imported', 10, 'Male', 2021, 58, 4.0, 'Mysterious and strong', 50, 'Excellent', 9.4, 8500000, 'https://cert.onkoi.vn/midnight-samurai', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kujaku-85-cm-4-tuoi-006-300x300.jpg', 'Available'),
('Silver Shadow', 1, 'Imported', 1, 'Male', 2020, 45, 2.5, 'Graceful and agile', 30, 'Excellent', 9.0, 5000000, 'https://cert.onkoi.vn/silver-shadow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image1.jpg', 'Available'),
('Coral Queen', 2, 'F1 Hybrid', 2, 'Female', 2021, 50, 3.0, 'Elegant and calm', 35, 'Good', 8.8, 4500000, 'https://cert.onkoi.vn/coral-queen', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image2.jpg', 'Available'),
('Mystic River', 3, 'Pure Vietnamese', 3, 'Male', 2022, 55, 3.5, 'Mysterious and strong', 40, 'Excellent', 9.2, 6000000, 'https://cert.onkoi.vn/mystic-river', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image3.jpg', 'Available'),
('Emerald Flame', 4, 'Imported', 4, 'Female', 2023, 40, 2.2, 'Bright and energetic', 28, 'Good', 8.9, 4000000, 'https://cert.onkoi.vn/emerald-flame', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image4.jpg', 'Available'),
('Sapphire Wave', 5, 'F1 Hybrid', 5, 'Male', 2020, 60, 4.0, 'Calm and majestic', 50, 'Excellent', 9.5, 7500000, 'https://cert.onkoi.vn/sapphire-wave', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image5.jpg', 'Available'),
('Ruby Star', 6, 'Pure Vietnamese', 6, 'Female', 2021, 48, 2.8, 'Sparkling and lively', 32, 'Good', 8.7, 5000000, 'https://cert.onkoi.vn/ruby-star', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image6.jpg', 'Available'),
('Jade Whisper', 7, 'Imported', 7, 'Male', 2022, 52, 3.3, 'Quiet and observant', 38, 'Excellent', 9.1, 6500000, 'https://cert.onkoi.vn/jade-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image7.jpg', 'Available'),
('Crystal Sky', 8, 'F1 Hybrid', 8, 'Female', 2023, 42, 2.4, 'Gentle and graceful', 30, 'Good', 8.6, 4200000, 'https://cert.onkoi.vn/crystal-sky', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image8.jpg', 'Available'),
('Amber Glow', 9, 'Pure Vietnamese', 9, 'Male', 2020, 58, 3.8, 'Warm and friendly', 45, 'Excellent', 9.3, 7000000, 'https://cert.onkoi.vn/amber-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image9.jpg', 'Available'),
('Twilight Dancer', 10, 'Imported', 10, 'Female', 2021, 47, 2.7, 'Active and playful', 34, 'Good', 8.9, 4800000, 'https://cert.onkoi.vn/twilight-dancer', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image10.jpg', 'Available'),
('Golden Sun', 1, 'F1 Hybrid', 1, 'Male', 2022, 54, 3.5, 'Radiant and strong', 42, 'Excellent', 9.4, 6800000, 'https://cert.onkoi.vn/golden-sun', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image11.jpg', 'Available'),
('Ocean Breeze', 2, 'Pure Vietnamese', 2, 'Female', 2023, 38, 2.0, 'Calm and serene', 28, 'Good', 8.7, 3900000, 'https://cert.onkoi.vn/ocean-breeze', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image12.jpg', 'Available'),
('Desert Rose', 3, 'Imported', 3, 'Male', 2020, 60, 4.1, 'Resilient and tough', 50, 'Excellent', 9.6, 7200000, 'https://cert.onkoi.vn/desert-rose', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image13.jpg', 'Available'),
('Thunder Bolt', 4, 'F1 Hybrid', 4, 'Female', 2021, 46, 2.6, 'Energetic and bold', 33, 'Good', 8.8, 4600000, 'https://cert.onkoi.vn/thunder-bolt', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image14.jpg', 'Available'),
('Lightning Flash', 5, 'Pure Vietnamese', 5, 'Male', 2022, 56, 3.7, 'Fast and lively', 44, 'Excellent', 9.2, 6900000, 'https://cert.onkoi.vn/lightning-flash', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image15.jpg', 'Available'),
('Snowflake', 6, 'Imported', 6, 'Female', 2023, 40, 2.3, 'Delicate and beautiful', 29, 'Good', 8.6, 4100000, 'https://cert.onkoi.vn/snowflake', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image16.jpg', 'Available'),
('Midnight Dream', 7, 'F1 Hybrid', 7, 'Male', 2020, 59, 3.9, 'Mysterious and calm', 47, 'Excellent', 9.3, 7100000, 'https://cert.onkoi.vn/midnight-dream', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image17.jpg', 'Available'),
('Autumn Leaf', 8, 'Pure Vietnamese', 8, 'Female', 2021, 48, 2.8, 'Peaceful and gentle', 35, 'Good', 8.8, 4600000, 'https://cert.onkoi.vn/autumn-leaf', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image18.jpg', 'Available'),
('Spring Blossom', 9, 'Imported', 9, 'Male', 2022, 52, 3.4, 'Cheerful and bright', 40, 'Excellent', 9.1, 6500000, 'https://cert.onkoi.vn/spring-blossom', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image19.jpg', 'Available'),
('Winter Frost', 10, 'F1 Hybrid', 10, 'Female', 2023, 42, 2.5, 'Cool and serene', 31, 'Good', 8.7, 4200000, 'https://cert.onkoi.vn/winter-frost', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image20.jpg', 'Available'),
('Summer Rain', 1, 'Pure Vietnamese', 1, 'Male', 2020, 53, 3.2, 'Refreshing and lively', 40, 'Excellent', 9.0, 6400000, 'https://cert.onkoi.vn/summer-rain', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image21.jpg', 'Available'),
('Harmony Echo', 2, 'Imported', 2, 'Female', 2021, 44, 2.6, 'Balanced and peaceful', 33, 'Good', 8.8, 4700000, 'https://cert.onkoi.vn/harmony-echo', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image22.jpg', 'Available'),
('Silent Wind', 3, 'F1 Hybrid', 3, 'Male', 2022, 57, 3.6, 'Quiet and swift', 42, 'Excellent', 9.2, 6800000, 'https://cert.onkoi.vn/silent-wind', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image23.jpg', 'Available'),
('Whispering Willow', 4, 'Pure Vietnamese', 4, 'Female', 2023, 43, 2.4, 'Gentle and nurturing', 30, 'Good', 8.9, 4300000, 'https://cert.onkoi.vn/whispering-willow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image24.jpg', 'Available'),
('Radiant Pearl', 5, 'Imported', 5, 'Male', 2020, 61, 4.2, 'Bright and valuable', 52, 'Excellent', 9.5, 7600000, 'https://cert.onkoi.vn/radiant-pearl', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image25.jpg', 'Available'),
('Mystic Moon', 6, 'F1 Hybrid', 6, 'Female', 2021, 49, 2.9, 'Enigmatic and serene', 35, 'Good', 8.7, 4900000, 'https://cert.onkoi.vn/mystic-moon', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image26.jpg', 'Available'),
('Velvet Thunder', 7, 'Pure Vietnamese', 7, 'Male', 2022, 58, 3.7, 'Smooth and powerful', 45, 'Excellent', 9.1, 7000000, 'https://cert.onkoi.vn/velvet-thunder', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image27.jpg', 'Available'),
('Diamond Dust', 8, 'Imported', 8, 'Female', 2023, 41, 2.5, 'Sparkling and delicate', 31, 'Good', 8.6, 4200000, 'https://cert.onkoi.vn/diamond-dust', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image28.jpg', 'Available'),
('Sunrise Glory', 9, 'F1 Hybrid', 9, 'Male', 2020, 55, 3.4, 'Bright and inspiring', 43, 'Excellent', 9.3, 6700000, 'https://cert.onkoi.vn/sunrise-glory', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image29.jpg', 'Available'),
('Moonbeam', 10, 'Pure Vietnamese', 10, 'Female', 2021, 45, 2.7, 'Soft and luminous', 32, 'Good', 8.8, 4600000, 'https://cert.onkoi.vn/moonbeam', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image30.jpg', 'Available'),
('Starfire', 1, 'Imported', 1, 'Male', 2022, 56, 3.6, 'Fiery and energetic', 44, 'Excellent', 9.4, 6900000, 'https://cert.onkoi.vn/starfire', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image31.jpg', 'Available'),
('Shadow Dancer', 2, 'F1 Hybrid', 2, 'Female', 2023, 39, 2.3, 'Mysterious and agile', 29, 'Good', 8.7, 4100000, 'https://cert.onkoi.vn/shadow-dancer', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image32.jpg', 'Available'),
('Crimson Tide', 3, 'Pure Vietnamese', 3, 'Male', 2020, 62, 4.3, 'Strong and dominant', 53, 'Excellent', 9.6, 7800000, 'https://cert.onkoi.vn/crimson-tide', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image33.jpg', 'Available'),
('Blue Lagoon', 4, 'Imported', 4, 'Female', 2021, 46, 2.8, 'Calm and soothing', 34, 'Good', 8.9, 4500000, 'https://cert.onkoi.vn/blue-lagoon', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image34.jpg', 'Available'),
('Golden Horizon', 5, 'F1 Hybrid', 5, 'Male', 2022, 59, 3.9, 'Bright and expansive', 47, 'Excellent', 9.2, 7200000, 'https://cert.onkoi.vn/golden-horizon', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image35.jpg', 'Available'),
('Silent Echo', 6, 'Pure Vietnamese', 6, 'Female', 2023, 42, 2.5, 'Quiet and reflective', 31, 'Good', 8.8, 4300000, 'https://cert.onkoi.vn/silent-echo', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image36.jpg', 'Available'),
('Misty Mountain', 7, 'Imported', 7, 'Male', 2020, 57, 3.7, 'Steady and strong', 45, 'Excellent', 9.3, 7000000, 'https://cert.onkoi.vn/misty-mountain', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image37.jpg', 'Available'),
('Golden Leaf', 8, 'F1 Hybrid', 8, 'Female', 2021, 44, 2.7, 'Elegant and graceful', 33, 'Good', 8.7, 4500000, 'https://cert.onkoi.vn/golden-leaf', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image38.jpg', 'Available'),
('Silver Stream', 9, 'Pure Vietnamese', 9, 'Male', 2022, 54, 3.5, 'Smooth and swift', 41, 'Excellent', 9.1, 6600000, 'https://cert.onkoi.vn/silver-stream', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image39.jpg', 'Available'),
('Fire Blossom', 10, 'Imported', 10, 'Female', 2023, 43, 2.6, 'Fiery and delicate', 32, 'Good', 8.9, 4400000, 'https://cert.onkoi.vn/fire-blossom', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image40.jpg', 'Available'),
('Twilight Glow', 1, 'F1 Hybrid', 1, 'Male', 2020, 58, 3.8, 'Warm and inviting', 46, 'Excellent', 9.4, 7100000, 'https://cert.onkoi.vn/twilight-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image41.jpg', 'Available'),
('Emerald Mist', 2, 'Pure Vietnamese', 2, 'Female', 2021, 41, 2.4, 'Mystical and serene', 30, 'Good', 8.7, 4200000, 'https://cert.onkoi.vn/emerald-mist', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image42.jpg', 'Available'),
('Ruby Gleam', 3, 'Imported', 3, 'Male', 2022, 60, 4.0, 'Radiant and bold', 50, 'Excellent', 9.5, 7500000, 'https://cert.onkoi.vn/ruby-gleam', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image43.jpg', 'Available'),
('Ocean Whisper', 4, 'F1 Hybrid', 4, 'Female', 2023, 44, 2.7, 'Calm and deep', 33, 'Good', 8.8, 4400000, 'https://cert.onkoi.vn/ocean-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image44.jpg', 'Available'),
('Sunset Glow', 5, 'Pure Vietnamese', 5, 'Male', 2020, 55, 3.4, 'Warm and peaceful', 42, 'Excellent', 9.2, 6800000, 'https://cert.onkoi.vn/sunset-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image45.jpg', 'Available'),
('Whispering Wind', 6, 'Imported', 6, 'Female', 2021, 43, 2.5, 'Gentle and swift', 31, 'Good', 8.6, 4300000, 'https://cert.onkoi.vn/whispering-wind', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image46.jpg', 'Available'),
('Mountain Echo', 7, 'F1 Hybrid', 7, 'Male', 2022, 58, 3.8, 'Strong and resonant', 46, 'Excellent', 9.3, 7200000, 'https://cert.onkoi.vn/mountain-echo', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image47.jpg', 'Available'),
('Golden Ray', 8, 'Pure Vietnamese', 8, 'Female', 2023, 42, 2.6, 'Bright and cheerful', 32, 'Good', 8.7, 4400000, 'https://cert.onkoi.vn/golden-ray', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image48.jpg', 'Available'),
('Crystal Brook', 9, 'Imported', 9, 'Male', 2020, 57, 3.7, 'Clear and flowing', 45, 'Excellent', 9.1, 7000000, 'https://cert.onkoi.vn/crystal-brook', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image49.jpg', 'Available'),
('Amber Dawn', 10, 'F1 Hybrid', 10, 'Female', 2021, 44, 2.7, 'Warm and hopeful', 33, 'Good', 8.9, 4500000, 'https://cert.onkoi.vn/amber-dawn', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image50.jpg', 'Available'),
('Silver Mist', 1, 'Pure Vietnamese', 1, 'Male', 2022, 54, 3.5, 'Elusive and graceful', 41, 'Excellent', 9.0, 6600000, 'https://cert.onkoi.vn/silver-mist', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image51.jpg', 'Available'),
('Radiant Sky', 2, 'Imported', 2, 'Female', 2023, 40, 2.4, 'Bright and uplifting', 30, 'Good', 8.8, 4200000, 'https://cert.onkoi.vn/radiant-sky', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image52.jpg', 'Available'),
('Golden Stream', 3, 'F1 Hybrid', 3, 'Male', 2020, 59, 3.9, 'Flowing and rich', 47, 'Excellent', 9.4, 7000000, 'https://cert.onkoi.vn/golden-stream', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image53.jpg', 'Available'),
('Lunar Glow', 4, 'Pure Vietnamese', 4, 'Female', 2021, 45, 2.6, 'Soft and luminous', 32, 'Good', 8.9, 4400000, 'https://cert.onkoi.vn/lunar-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image54.jpg', 'Available'),
('Blazing Star', 5, 'Imported', 5, 'Male', 2022, 60, 4.1, 'Fiery and bold', 51, 'Excellent', 9.5, 7500000, 'https://cert.onkoi.vn/blazing-star', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image55.jpg', 'Available'),
('Gentle Breeze', 6, 'F1 Hybrid', 6, 'Female', 2023, 41, 2.5, 'Calm and soothing', 31, 'Good', 8.7, 4300000, 'https://cert.onkoi.vn/gentle-breeze', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image56.jpg', 'Available'),
('Ocean Wave', 7, 'Pure Vietnamese', 7, 'Male', 2020, 56, 3.6, 'Strong and steady', 44, 'Excellent', 9.2, 6800000, 'https://cert.onkoi.vn/ocean-wave', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image57.jpg', 'Available'),
('Whispering Meadow', 8, 'Imported', 8, 'Female', 2021, 43, 2.5, 'Peaceful and gentle', 31, 'Good', 8.7, 4300000, 'https://cert.onkoi.vn/whispering-meadow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image58.jpg', 'Available'),
('Radiant Dawn', 9, 'F1 Hybrid', 9, 'Male', 2022, 58, 3.8, 'Bright and hopeful', 46, 'Excellent', 9.3, 7200000, 'https://cert.onkoi.vn/radiant-dawn', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image59.jpg', 'Available'),
('Evening Star', 10, 'Pure Vietnamese', 10, 'Female', 2023, 42, 2.6, 'Calm and radiant', 32, 'Good', 8.9, 4400000, 'https://cert.onkoi.vn/evening-star', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image60.jpg', 'Available'),
('Mystic Shadow', 1, 'Imported', 1, 'Male', 2020, 55, 3.5, 'Enigmatic and swift', 42, 'Excellent', 9.1, 6700000, 'https://cert.onkoi.vn/mystic-shadow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image61.jpg', 'Available'),
('Golden Mist', 2, 'F1 Hybrid', 2, 'Female', 2021, 44, 2.7, 'Bright and elusive', 33, 'Good', 8.8, 4500000, 'https://cert.onkoi.vn/golden-mist', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image62.jpg', 'Available'),
('Silver Dawn', 3, 'Pure Vietnamese', 3, 'Male', 2022, 59, 3.9, 'Radiant and calm', 47, 'Excellent', 9.4, 7100000, 'https://cert.onkoi.vn/silver-dawn', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image63.jpg', 'Available'),
('Amber Glow', 4, 'Imported', 4, 'Female', 2023, 41, 2.5, 'Warm and gentle', 31, 'Good', 8.7, 4300000, 'https://cert.onkoi.vn/amber-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image64.jpg', 'Available'),
('Twilight Whisper', 5, 'F1 Hybrid', 5, 'Male', 2020, 57, 3.7, 'Soft and mysterious', 45, 'Excellent', 9.2, 6900000, 'https://cert.onkoi.vn/twilight-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image65.jpg', 'Available'),
('Sunbeam', 6, 'Pure Vietnamese', 6, 'Female', 2021, 43, 2.6, 'Bright and cheerful', 32, 'Good', 8.9, 4400000, 'https://cert.onkoi.vn/sunbeam', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image66.jpg', 'Available'),
('Moonshadow', 7, 'Imported', 7, 'Male', 2022, 56, 3.6, 'Quiet and strong', 44, 'Excellent', 9.3, 7000000, 'https://cert.onkoi.vn/moonshadow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image67.jpg', 'Available'),
('Emerald Glow', 8, 'F1 Hybrid', 8, 'Female', 2023, 40, 2.4, 'Calm and radiant', 30, 'Good', 8.8, 4200000, 'https://cert.onkoi.vn/emerald-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image68.jpg', 'Available'),
('Crimson Flame', 9, 'Pure Vietnamese', 9, 'Male', 2020, 60, 4.0, 'Fiery and bold', 50, 'Excellent', 9.5, 7500000, 'https://cert.onkoi.vn/crimson-flame', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image69.jpg', 'Available'),
('Azure Sky', 10, 'Imported', 10, 'Female', 2021, 44, 2.7, 'Bright and serene', 33, 'Good', 8.9, 4500000, 'https://cert.onkoi.vn/azure-sky', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image70.jpg', 'Available'),
('Golden Horizon', 1, 'F1 Hybrid', 1, 'Male', 2022, 58, 3.8, 'Expansive and bright', 46, 'Excellent', 9.4, 7200000, 'https://cert.onkoi.vn/golden-horizon', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image71.jpg', 'Available'),
('Whispering Rain', 2, 'Pure Vietnamese', 2, 'Female', 2023, 42, 2.6, 'Gentle and soothing', 32, 'Good', 8.7, 4400000, 'https://cert.onkoi.vn/whispering-rain', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image72.jpg', 'Available'),
('Blazing Sun', 3, 'Imported', 3, 'Male', 2020, 61, 4.1, 'Radiant and powerful', 51, 'Excellent', 9.6, 7600000, 'https://cert.onkoi.vn/blazing-sun', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image73.jpg', 'Available'),
('Silver Lining', 4, 'F1 Hybrid', 4, 'Female', 2021, 45, 2.6, 'Hopeful and calm', 32, 'Good', 8.8, 4400000, 'https://cert.onkoi.vn/silver-lining', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image74.jpg', 'Available'),
('Crimson Moon', 5, 'Pure Vietnamese', 5, 'Male', 2022, 57, 3.7, 'Bold and mysterious', 45, 'Excellent', 9.2, 7000000, 'https://cert.onkoi.vn/crimson-moon', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image75.jpg', 'Available'),
('Gentle Stream', 6, 'Imported', 6, 'Female', 2023, 41, 2.5, 'Calm and flowing', 31, 'Good', 8.7, 4300000, 'https://cert.onkoi.vn/gentle-stream', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image76.jpg', 'Available'),
('Mystic Light', 7, 'F1 Hybrid', 7, 'Male', 2020, 56, 3.6, 'Enigmatic and bright', 44, 'Excellent', 9.3, 7000000, 'https://cert.onkoi.vn/mystic-light', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image77.jpg', 'Available'),
('Whispering Shadows', 8, 'Pure Vietnamese', 8, 'Female', 2021, 43, 2.6, 'Gentle and mysterious', 31, 'Good', 8.8, 4400000, 'https://cert.onkoi.vn/whispering-shadows', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image78.jpg', 'Available'),
('Golden Blaze', 9, 'Imported', 9, 'Male', 2022, 59, 3.9, 'Bright and fierce', 47, 'Excellent', 9.4, 7300000, 'https://cert.onkoi.vn/golden-blaze', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image79.jpg', 'Available'),
('Crystal Clear', 10, 'F1 Hybrid', 10, 'Female', 2023, 40, 2.4, 'Transparent and pure', 30, 'Good', 8.7, 4200000, 'https://cert.onkoi.vn/crystal-clear', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image80.jpg', 'Available'),
('Silver Wave', 1, 'Pure Vietnamese', 1, 'Male', 2020, 55, 3.5, 'Flowing and strong', 42, 'Excellent', 9.0, 6600000, 'https://cert.onkoi.vn/silver-wave', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image81.jpg', 'Available'),
('Emerald Dream', 2, 'Imported', 2, 'Female', 2021, 44, 2.7, 'Peaceful and vibrant', 33, 'Good', 8.8, 4500000, 'https://cert.onkoi.vn/emerald-dream', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image82.jpg', 'Available'),
('Crimson Sky', 3, 'F1 Hybrid', 3, 'Male', 2022, 60, 4.0, 'Bold and expansive', 50, 'Excellent', 9.5, 7600000, 'https://cert.onkoi.vn/crimson-sky', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image83.jpg', 'Available'),
('Golden Whisper', 4, 'Pure Vietnamese', 4, 'Female', 2023, 42, 2.6, 'Soft and radiant', 32, 'Good', 8.9, 4400000, 'https://cert.onkoi.vn/golden-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image84.jpg', 'Available'),
('Sunset Dream', 5, 'Imported', 5, 'Male', 2020, 58, 3.8, 'Warm and calming', 46, 'Excellent', 9.4, 7100000, 'https://cert.onkoi.vn/sunset-dream', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image85.jpg', 'Available'),
('Whispering Tide', 6, 'F1 Hybrid', 6, 'Female', 2021, 41, 2.5, 'Gentle and steady', 31, 'Good', 8.7, 4300000, 'https://cert.onkoi.vn/whispering-tide', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image86.jpg', 'Available'),
('Silver Shadow', 7, 'Pure Vietnamese', 7, 'Male', 2022, 56, 3.6, 'Elusive and swift', 44, 'Excellent', 9.3, 7000000, 'https://cert.onkoi.vn/silver-shadow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image87.jpg', 'Available'),
('Golden Flame', 8, 'Imported', 8, 'Female', 2023, 44, 2.7, 'Radiant and energetic', 33, 'Good', 8.8, 4500000, 'https://cert.onkoi.vn/golden-flame', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image88.jpg', 'Available'),
('Crimson Whisper', 9, 'F1 Hybrid', 9, 'Male', 2020, 59, 3.9, 'Bold and gentle', 47, 'Excellent', 9.4, 7300000, 'https://cert.onkoi.vn/crimson-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image89.jpg', 'Available'),
('Emerald Breeze', 10, 'Pure Vietnamese', 10, 'Female', 2021, 43, 2.6, 'Calm and vibrant', 31, 'Good', 8.9, 4400000, 'https://cert.onkoi.vn/emerald-breeze', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image90.jpg', 'Available'),
('Mystic Flame', 1, 'Imported', 1, 'Male', 2022, 57, 3.7, 'Enigmatic and fiery', 45, 'Excellent', 9.2, 7000000, 'https://cert.onkoi.vn/mystic-flame', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image91.jpg', 'Available'),
('Golden Mist', 2, 'F1 Hybrid', 2, 'Female', 2023, 41, 2.5, 'Bright and elusive', 31, 'Good', 8.7, 4300000, 'https://cert.onkoi.vn/golden-mist', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image92.jpg', 'Available'),
('Silver Dawn', 3, 'Pure Vietnamese', 3, 'Male', 2020, 59, 3.9, 'Radiant and calm', 47, 'Excellent', 9.4, 7100000, 'https://cert.onkoi.vn/silver-dawn', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image93.jpg', 'Available'),
('Amber Glow', 4, 'Imported', 4, 'Female', 2021, 41, 2.5, 'Warm and gentle', 31, 'Good', 8.7, 4300000, 'https://cert.onkoi.vn/amber-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image94.jpg', 'Available'),
('Twilight Whisper', 5, 'F1 Hybrid', 5, 'Male', 2022, 57, 3.7, 'Soft and mysterious', 45, 'Excellent', 9.2, 6900000, 'https://cert.onkoi.vn/twilight-whisper', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image95.jpg', 'Available'),
('Sunbeam', 6, 'Pure Vietnamese', 6, 'Female', 2023, 43, 2.6, 'Bright and cheerful', 32, 'Good', 8.9, 4400000, 'https://cert.onkoi.vn/sunbeam', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image96.jpg', 'Available'),
('Moonshadow', 7, 'Imported', 7, 'Male', 2020, 56, 3.6, 'Quiet and strong', 44, 'Excellent', 9.3, 7000000, 'https://cert.onkoi.vn/moonshadow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image97.jpg', 'Available'),
('Emerald Glow', 8, 'F1 Hybrid', 8, 'Female', 2021, 40, 2.4, 'Calm and radiant', 30, 'Good', 8.8, 4200000, 'https://cert.onkoi.vn/emerald-glow', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image98.jpg', 'Available'),
('Crimson Flame', 9, 'Pure Vietnamese', 9, 'Male', 2022, 60, 4.0, 'Fiery and bold', 50, 'Excellent', 9.5, 7500000, 'https://cert.onkoi.vn/crimson-flame', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image99.jpg', 'Available'),
('Harmony Wave', 10, 'Imported', 10, 'Female', 2023, 43, 2.6, 'Balanced and harmonious', 32, 'Good', 8.8, 4600000, 'https://cert.onkoi.vn/harmony-wave', 'https://onkoi.vn/wp-content/uploads/2021/03/sample-image100.jpg', 'Available');

select * from KoiFish

--SET IDENTITY_INSERT KoiPackage ON;
INSERT INTO KoiPackage (KoiID, PackageName, ImageLink, Price, PackageSize, Availability, Quantity) VALUES
(1, 'Sakura Starter Pack', 'https://onkoi.vn/wp-content/uploads/2021/01/lo-kohaku-38-cm-066-768x768.jpg', 6000000, 1, 'Available', 10),
(2, 'Golden Luxury Set', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-karashi-70-75-cm-3-tuoi-005-768x768.jpg', 10000000, 2, 'Available', 10),
(3, 'Azure Beginner Bundle', 'https://onkoi.vn/wp-content/uploads/2021/03/lo-koi-showa-kohaku-75-80-cm-3-tuoi-051-768x768.jpg', 4500000, 1, 'Available', 10),
(4, 'Crimson Elite Collection', 'https://onkoi.vn/wp-content/uploads/2021/01/lo-koi-kohaku-dainichi-30-cm-063-768x768.jpg', 15000000, 3, 'Available', 10),
(5, 'Moonlight Duo', 'https://onkoi.vn/wp-content/uploads/2020/07/lo-koi-Yagenji-Beni-Kikokuryu-35-cm-004-768x768.jpg', 8000000, 2, 'Available', 10),
(6, 'Sunset Family Pack', 'https://onkoi.vn/wp-content/uploads/2021/03/onkoi-karashi-70-75-cm-3-tuoi-005-768x768.jpg', 12000000, 4, 'Available', 10),
(7, 'Emerald Prestige Pack','https://onkoi.vn/wp-content/uploads/2020/07/emerald-prestige.jpg', 18000000, 3, 'Available', 10),
(8, 'Ocean Serenity Bundle', 'https://onkoi.vn/wp-content/uploads/2021/01/ocean-serenity.jpg', 9500000, 2, 'Available', 10),
(9, 'Scarlet Prime Set', 'https://onkoi.vn/wp-content/uploads/2021/03/scarlet-prime.jpg', 13500000, 4, 'Available', 10),
(10, 'Royal Crown Collection', 'https://onkoi.vn/wp-content/uploads/2021/03/royal-crown.jpg', 20000000, 5, 'Available', 10);
select * from KoiPackage
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

INSERT INTO Orders (CustomerID, OrderDate, ShippingAddress, OrderStatus, PaymentMethod, PaymentStatus, TrackingNumber, Discount, ShippingCost, PromotionID) VALUES
(1, '2024-06-15 10:30:00', '123 Lê Lợi, Quận 1, TP.HCM', 'Pending', 'Credit Card', 'Completed', 'VN123456789', 500000, 200000, 1),
(2, '2024-07-20 14:45:00', '456 Nguyễn Huệ, Quận 1, TP.HCM', 'Pending', 'Bank Transfer', 'Completed', 'VN987654321', 800000, 250000, 3),
(5, '2024-08-05 09:15:00','789 Trần Hưng Đạo, Quận 5, TP.HCM', 'Pending', 'Cash on Delivery', 'Pending', NULL, 300000, 150000, 2),
(6, '2024-09-10 16:20:00', '101 Võ Văn Tần, Quận 3, TP.HCM', 'Pending', 'Credit Card', 'Pending', NULL, 1500000, 300000, 5),
(7, '2024-10-01 11:00:00', '202 Nguyễn Thị Minh Khai, Quận 3, TP.HCM', 'Pending', 'Bank Transfer', 'Completed', 'VN135792468', 700000, 200000, 4),
(9, '2024-11-15 13:30:00', '303 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', 'Pending', 'Credit Card', 'Completed', 'VN246813579', 1000000, 250000, 6),
(10, '2024-12-20 15:45:00', '404 Phan Xích Long, Quận Phú Nhuận, TP.HCM', 'Pending', 'Bank Transfer', 'Completed', NULL, 2000000, 300000, 7),
(11, '2025-01-05 08:30:00', '123 Lê Lợi, Quận 1, TP.HCM', 'Pending', 'Cash on Delivery', 'Pending', NULL, 600000, 200000, 8),
(12, '2025-02-10 10:00:00', '456 Nguyễn Huệ, Quận 1, TP.HCM', 'Pending', 'Credit Card', 'Completed', 'VN369258147', 1200000, 250000, 9),
(14, '2025-03-15 14:15:00', '789 Trần Hưng Đạo, Quận 5, TP.HCM', 'Pending', 'Bank Transfer', 'Completed', 'VN741852963', 450000, 150000, 10);
--Select * from KoiFish
--Delete from Orders
--DBCC CHECKIDENT ('Orders', RESEED, 0);
Select * from Orders
--select * from Orders WHERE OrderID = 1



--select * from Orders
--select * from OrderDetails
INSERT INTO OrderDetails (OrderID, Quantity, UnitPrice, ProductType, CertificateStatus, KoiID, PackageID) VALUES
(1, 1, (SELECT Price FROM KoiFish WHERE KoiID = 1), 'Single Fish', 'Issued', 1, NULL),
(2, 1, (SELECT Price FROM KoiPackage WHERE PackageID = 1), 'Package', 'Issued', NULL, 1),
(3, 1, (SELECT Price FROM KoiFish WHERE KoiID = 2), 'Single Fish', 'Not Issued', 2, NULL),
(4, 2, (SELECT Price FROM KoiPackage WHERE PackageID = 2), 'Package', 'Issued', NULL, 2),
(5, 3, (SELECT Price FROM KoiPackage WHERE PackageID = 3), 'Package', 'Not Issued', NULL, 3),
(5, 1, (SELECT Price FROM KoiFish WHERE KoiID = 3), 'Package', 'Issued', 3, NULL),
(6, 1, (SELECT Price FROM KoiFish WHERE KoiID = 4), 'Single Fish', 'Not Issued', 4, NULL),
(6, 2, (SELECT Price FROM KoiPackage WHERE PackageID = 4), 'Package', 'Not Issued', NULL, 4),
(7, 1, (SELECT Price FROM KoiFish WHERE KoiID = 5), 'Single Fish', 'Issued', 5, NULL),
(7, 1, (SELECT Price FROM KoiFish WHERE KoiID = 6), 'Single Fish', 'Issued', 6, NULL),
(8, 1, (SELECT Price FROM KoiPackage WHERE PackageID = 5), 'Package', 'Pending', NULL, 5),
(8, 2, (SELECT Price FROM KoiPackage WHERE PackageID = 6), 'Package', 'Pending', NULL, 6),
(9, 1, (SELECT Price FROM KoiFish WHERE KoiID = 7), 'Single Fish', 'Issued', 7, NULL),
(9, 1, (SELECT Price FROM KoiFish WHERE KoiID = 8), 'Single Fish', 'Issued', 8, NULL),
(9, 2, (SELECT Price FROM KoiPackage WHERE PackageID = 7), 'Package', 'Not Issued', NULL, 7),
(9, 1, (SELECT Price FROM KoiPackage WHERE PackageID = 8), 'Package', 'Not Issued', NULL, 8);

select * from OrderDetails
SELECT * FROM KoiFish WHERE KoiID = 2;
SELECT * FROM KoiPackage WHERE PackageID = 1;
UPDATE Orders 
SET TotalAmount = (
    SELECT SUM(od.TotalPrice)
    FROM OrderDetails od
    WHERE Orders.OrderID = od.OrderID
);

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
(1, 9), (2, 5);
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
(1, 4), (2, 9);
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
select * from OrderHistory
--select * from OrderHistory



SELECT 
    o.OrderID,
    o.CustomerID,
    o.OrderDate,
    o.TotalAmount,
    o.ShippingAddress,
    o.OrderStatus,
    o.PaymentMethod,
    o.PaymentStatus,
    o.TrackingNumber,
    o.Discount,
    o.ShippingCost,
    o.PromotionID,

    -- Thông tin từ OrderDetails
    STRING_AGG(CAST(od.ProductID AS VARCHAR), ', ') AS ProductIDs,
    STRING_AGG(CAST(od.KoiID AS VARCHAR), ', ') AS KoiIDs,
    STRING_AGG(CAST(od.PackageID AS VARCHAR), ', ') AS PackageIDs,
    STRING_AGG(od.ProductType, ', ') AS ProductTypes,
    STRING_AGG(od.CertificateStatus, ', ') AS CertificateStatuses,
    SUM(od.Quantity) AS TotalQuantity,
    SUM(od.TotalPrice) AS TotalOrderDetailPrice, -- Tổng giá từ OrderDetails

    -- Thông tin từ KoiFish
    STRING_AGG(kf.Name, ', ') AS KoiNames,
    STRING_AGG(CAST(kf.VarietyID AS VARCHAR), ', ') AS VarietyIDs,
    STRING_AGG(kf.Origin, ', ') AS Origins,
    STRING_AGG(kf.Gender, ', ') AS Genders,
    STRING_AGG(CAST(kf.Size AS VARCHAR), ', ') AS KoiSizes,
    STRING_AGG(CAST(kf.Weight AS VARCHAR), ', ') AS KoiWeights,
    STRING_AGG(kf.HealthStatus, ', ') AS KoiHealthStatuses,
    STRING_AGG(CAST(kf.Price AS VARCHAR), ', ') AS KoiPrices,

    -- Thông tin từ KoiPackage
    STRING_AGG(kp.PackageName, ', ') AS PackageNames,
    STRING_AGG(CAST(kp.PackageSize AS VARCHAR), ', ') AS PackageSizes,
    STRING_AGG(CAST(kp.Price AS VARCHAR), ', ') AS PackagePrices,
    STRING_AGG(CAST(kp.Quantity AS VARCHAR), ', ') AS PackageQuantities,
    STRING_AGG(kp.Availability, ', ') AS PackageAvailabilities

FROM 
    Orders o
LEFT JOIN 
    OrderDetails od ON o.OrderID = od.OrderID
LEFT JOIN 
    KoiFish kf ON od.KoiID = kf.KoiID
LEFT JOIN 
    KoiPackage kp ON od.PackageID = kp.PackageID

GROUP BY 
    o.OrderID, o.CustomerID, o.OrderDate, o.TotalAmount, 
    o.ShippingAddress, o.OrderStatus, o.PaymentMethod, 
    o.PaymentStatus, o.TrackingNumber, o.Discount, 
    o.ShippingCost, o.PromotionID

ORDER BY 
    o.OrderID;

INSERT INTO KoiConsignment (CustomerID, KoiID, ConsignmentType, ConsignmentMode, StartDate, EndDate, Status, PriceAgreed, PickupDate, ApprovedStatus, InspectionResult, Notes) VALUES
-- Status: 'Pending', ApprovedStatus: 'Pending'
(1, 1, 'Sale', 'Offline', DEFAULT, '2024-12-31', 'Pending', 50000.00, '2024-10-25', 'Pending', 'Chưa kiểm tra', 'Ghi chú mẫu cho trạng thái Pending'),

-- Status: 'Approved', ApprovedStatus: 'Approved'
(2, 2, 'Sale', 'Online', DEFAULT, '2024-11-30', 'Approved', 80000.00, '2024-10-26', 'Approved', 'Koi đạt tiêu chuẩn', 'Ghi chú mẫu cho trạng thái Approved'),

-- Status: 'In Care', ApprovedStatus: 'Approved'
(3, 3, 'Sale', 'Offline', DEFAULT, '2024-11-15', 'In Care', 60000.00, '2024-10-27', 'Approved', 'Koi cần chăm sóc thêm', 'Ghi chú mẫu cho trạng thái In Care'),

-- Status: 'Listed for Sale', ApprovedStatus: 'Approved'
(4, 4, 'Care', 'Online', DEFAULT, '2024-11-20', 'Listed for Sale', 100000.00, '2024-10-28', 'Approved', 'Koi đã sẵn sàng bán', 'Ghi chú mẫu cho trạng thái Listed for Sale'),

-- Status: 'Sold', ApprovedStatus: 'Approved'
(5, 5, 'Care', 'Offline', DEFAULT, '2024-12-01', 'Sold', 120000.00, '2024-10-29', 'Approved', 'Koi đã bán', 'Ghi chú mẫu cho trạng thái Sold'),

-- Status: 'Withdrawn', ApprovedStatus: 'Rejected'
(6, 6, 'Sale', 'Online', DEFAULT, '2024-11-10', 'Withdrawn', 150000.00, '2024-10-30', 'Rejected', 'Koi không đủ tiêu chuẩn', 'Ghi chú mẫu cho trạng thái Withdrawn');

--select * from KoiConsignment

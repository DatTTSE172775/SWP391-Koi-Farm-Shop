const sql = require('mssql');

// Function to create a new KoiFish entry
const createKoiFish = async (name, varietyId, origin, breederId, gender, born, size, price, weight, personality, feedingAmountPerDay, healthStatus, screeningRate, certificateLink, imagesLink, availability = 'Available') => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Name', sql.VarChar(255), name)
            .input('VarietyID', sql.Int, varietyId)
            .input('Origin', sql.VarChar(50), origin)
            .input('BreederID', sql.Int, breederId)
            .input('Gender', sql.VarChar(50), gender)
            .input('Born', sql.Int, born)
            .input('Size', sql.Float, size)
            .input('Price', sql.Decimal(10, 2), price)
            .input('Weight', sql.Float, weight)
            .input('Personality', sql.VarChar(sql.MAX), personality)
            .input('FeedingAmountPerDay', sql.Float, feedingAmountPerDay)
            .input('HealthStatus', sql.VarChar(255), healthStatus)
            .input('ScreeningRate', sql.Float, screeningRate)
            .input('CertificateLink', sql.VarChar(255), certificateLink)
            .input('ImagesLink', sql.VarChar(255), imagesLink)
            .input('Availability', sql.VarChar(50), availability)
            .query(`
                INSERT INTO KoiFish (Name, VarietyID, Origin, BreederID, Gender, Born, Size, Price, Weight, Personality, FeedingAmountPerDay, HealthStatus, ScreeningRate, CertificateLink, ImagesLink, Availability)
                VALUES (@Name, @VarietyID, @Origin, @BreederID, @Gender, @Born, @Size, @Price, @Weight, @Personality, @FeedingAmountPerDay, @HealthStatus, @ScreeningRate, @CertificateLink, @ImagesLink, @Availability);
            `);
        return result;
    } catch (err) {
        console.error('Error creating KoiFish:', err);
        throw err;
    }
};

// Function to get all koi fish
const getAllKoiFish = async () => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM KoiFish where Availability = \'Available\'');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching KoiFish:', err);
        throw err;
    }
};

// Function to get a koi fish by ID
const getKoiFishById = async (koiId) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query('SELECT * FROM KoiFish WHERE KoiID = @KoiID');
        return result.recordset[0];
    } catch (err) {
        console.error('Error fetching KoiFish:', err);
        throw err;
    }
};

// Cập nhật trạng thái sẵn có của KoiFish
const updateKoiFishAvailability = async (koiId, availability) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('KoiID', sql.Int, koiId)
            .input('Availability', sql.VarChar(50), availability)
            .query(`
                UPDATE KoiFish
                SET Availability = @Availability
                WHERE KoiID = @KoiID
            `);
        return result.rowsAffected[0] > 0; // Trả về true nếu cập nhật thành công
    } catch (err) {
        console.error('Lỗi cập nhật trạng thái sẵn có của KoiFish:', err);
        throw err;
    }
};

// xóa KoiFish
const deleteKoiFish = async (koiId) => {
    try {
        const pool = await sql.connect();
        
        // Xóa các bản ghi liên quan trong bảng KoiCertificates
        await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM KoiCertificates
                WHERE KoiID = @KoiID
            `);

        // Xóa các bản ghi liên quan trong bảng KoiImages
        await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM KoiImages
                WHERE KoiID = @KoiID
            `);

        // Xóa các bản ghi liên quan trong bảng OrderDetails
        await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM OrderDetails
                WHERE ProductID = @KoiID AND ProductType = 'Single Fish'
            `);
            
        // Xóa các bản ghi liên quan trong bảng Reviews
        await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM Reviews
                WHERE ProductID = @KoiID
            `);

        // Xóa các bản ghi liên quan trong bảng KoiPackageVarieties
        await pool.request()
        .input('KoiID', sql.Int, koiId)
        .query(`
            DELETE FROM KoiPackageVarieties
            WHERE PackageID IN (SELECT PackageID FROM KoiPackage WHERE KoiID = @KoiID)
        `);

        // Xóa các bản ghi liên quan trong bảng KoiPackageBreeders
        await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM KoiPackageBreeders
                WHERE PackageID IN (SELECT PackageID FROM KoiPackage WHERE KoiID = @KoiID)
            `);
            
        // Xóa các bản ghi liên quan trong bảng KoiPackage
        await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM KoiPackage
                WHERE KoiID = @KoiID
            `);

        // Xóa các bản ghi liên quan trong bảng KoiConsignment
        await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM KoiConsignment
                WHERE KoiID = @KoiID
            `);

        // Xóa KoiFish
        const result = await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query(`
                DELETE FROM KoiFish
                WHERE KoiID = @KoiID
            `);

        return result.rowsAffected[0] > 0; // Trả về true nếu xóa thành công
    } catch (err) {
        console.error('Lỗi xóa KoiFish:', err);
        throw err;
    }
};

// Function to update a KoiFish entry
const updateKoiFish = async (koiId, updateData) => {
    try {
        const pool = await sql.connect();
        
        // First check if the koi exists
        const checkKoi = await pool.request()
            .input('KoiID', sql.Int, koiId)
            .query('SELECT KoiID FROM KoiFish WHERE KoiID = @KoiID');
            
        if (checkKoi.recordset.length === 0) {
            return false;
        }

        // Remove KoiID from updateData if it exists
        const { KoiID, ...dataToUpdate } = updateData;

        const result = await pool.request()
            .input('KoiID', sql.Int, koiId)
            .input('Name', sql.VarChar(255), dataToUpdate.Name)
            .input('Gender', sql.VarChar(50), dataToUpdate.Gender)
            .input('Origin', sql.VarChar(50), dataToUpdate.Origin)
            .input('Born', sql.Int, dataToUpdate.Born)
            .input('Size', sql.Float, dataToUpdate.Size)
            .input('Price', sql.Decimal(10, 2), dataToUpdate.Price)
            .input('HealthStatus', sql.VarChar(255), dataToUpdate.HealthStatus)
            .input('Availability', sql.VarChar(50), dataToUpdate.Availability)
            .query(`
                UPDATE KoiFish
                SET Name = @Name,
                    Gender = @Gender,
                    Origin = @Origin,
                    Born = @Born,
                    Size = @Size,
                    Price = @Price,
                    HealthStatus = @HealthStatus,
                    Availability = @Availability
                WHERE KoiID = @KoiID
            `);
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error('Error updating KoiFish:', err);
        throw err;
    }
};

const createKoiFishFromConsignment = async (consignmentData) => {
    try {
        const pool = await sql.connect();
        
        // First get the variety name
        const varietyResult = await pool.request()
            .input('VarietyID', sql.Int, consignmentData.KoiType)
            .query('SELECT VarietyName FROM Varieties WHERE VarietyID = @VarietyID');
            
        const varietyName = varietyResult.recordset[0]?.VarietyName || 'Unknown Variety';
        
        const result = await pool.request()
            .input('Name', sql.VarChar(255), `Consigned Koi ${varietyName}`)
            .input('VarietyID', sql.Int, consignmentData.KoiType)
            .input('Origin', sql.VarChar(50), 'Pure Vietnamese')
            .input('Gender', sql.VarChar(50), 'Unknown')
            .input('Born', sql.Int, new Date().getFullYear() - consignmentData.KoiAge)
            .input('Size', sql.Float, consignmentData.KoiSize)
            .input('Price', sql.Decimal(10, 2), consignmentData.PriceAgreed)
            .input('HealthStatus', sql.VarChar(255), consignmentData.InspectionResult || 'Pending Inspection')
            .input('ImagesLink', sql.VarChar(255), consignmentData.ImagePath)
            .input('Availability', sql.VarChar(50), 'Available')
            .query(`
                INSERT INTO KoiFish (
                    Name, VarietyID, Origin, Gender, Born, Size, 
                    Price, HealthStatus, ImagesLink, Availability
                )
                OUTPUT INSERTED.KoiID
                VALUES (
                    @Name, @VarietyID, @Origin, @Gender, @Born, @Size,
                    @Price, @HealthStatus, @ImagesLink, @Availability
                );
            `);
            
        return result.recordset[0].KoiID;
    } catch (err) {
        console.error('Error creating KoiFish from consignment:', err);
        throw err;
    }
};

// Function to update the KoiID in KoiConsignment
const updateConsignmentKoiId = async (consignmentId, koiId) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('ConsignmentID', sql.Int, consignmentId)
            .input('KoiID', sql.Int, koiId)
            .query(`
                UPDATE KoiConsignment 
                SET KoiID = @KoiID
                WHERE ConsignmentID = @ConsignmentID
            `);
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error('Error updating KoiID in KoiConsignment:', err);
        throw err;
    }
};

module.exports = { createKoiFish, getAllKoiFish, getKoiFishById, updateKoiFishAvailability, deleteKoiFish, updateKoiFish, createKoiFishFromConsignment, updateConsignmentKoiId };

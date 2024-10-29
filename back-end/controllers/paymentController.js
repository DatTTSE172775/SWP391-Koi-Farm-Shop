const crypto = require('crypto');
const querystring = require('querystring');

// Thông tin cấu hình VNPay từ biến môi trường
const vnp_TmnCode = process.env.VNP_TMNCODE;
const vnp_HashSecret = process.env.VNP_HASHSECRET;
const vnp_Url = process.env.VNP_URL;
const vnp_ReturnUrl = process.env.VNP_RETURNURL;

exports.createPayment = (req, res) => {
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { amount, orderId, bankCode } = req.body;

    // Lấy ngày giờ hiện tại
    const date = new Date();
    const createDate = date.toISOString().replace(/[-:T]/g, '').slice(0, 14);

    // Tạo các tham số cho VNPay
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
    vnp_Params['vnp_Amount'] = amount * 100; // Số tiền tính bằng VND (x100 để chuyển thành đơn vị VNPay)
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = `Thanh toan don hang ${orderId}`;
    vnp_Params['vnp_OrderType'] = 'billpayment';
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_ReturnUrl'] = vnp_ReturnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    // Sắp xếp các tham số theo thứ tự chữ cái để tạo chữ ký
    vnp_Params = sortObject(vnp_Params);

    // Tạo chữ ký bảo mật
    const signData = querystring.stringify(vnp_Params);
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    // Tạo URL thanh toán
    const paymentUrl = `${vnp_Url}?${querystring.stringify(vnp_Params)}`;

    // Trả về URL thanh toán cho phía frontend
    res.json({ paymentUrl });
};

// Hàm sắp xếp object theo thứ tự chữ cái
function sortObject(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
}

exports.verifyPayment = (req, res) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // Sắp xếp lại các tham số
    const sortedParams = sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams);
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // So sánh chữ ký
    if (secureHash === signed) {
        res.json({ status: 'Thanh toán thành công', details: vnp_Params });
    } else {
        res.json({ status: 'Thanh toán thất bại', details: vnp_Params });
    }
};

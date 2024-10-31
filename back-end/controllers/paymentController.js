const moment = require('moment');

// Thông tin cấu hình VNPay từ biến môi trường

const createPayment = async (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    
    let tmnCode = process.env.VNP_TMNCODE;
    let secretKey = process.env.VNP_HASHSECRET;
    let vnpUrl = process.env.VNP_URL;
    let returnUrl = process.env.VNP_RETURNURL;
    let orderId = req.body.orderId;
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    
    let locale = req.body.language;
    if(locale === null || locale === '' || locale === undefined){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== '' && bankCode !== undefined){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false }); 
    const crypto = require('crypto');
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    // Trả về URL thanh toán cho phía frontend
    res.json({ vnpUrl });
};

// Hàm sắp xếp object theo thứ tự chữ cái
function sortObject(obj) {
    let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

// ... existing code ...

const verifyPayment = async (req, res) => {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];
        
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        const sortedParams = sortObject(vnp_Params);
        const signData = require('qs').stringify(sortedParams, { encode: false });
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            const rspCode = vnp_Params['vnp_ResponseCode'];
            res.json({
                rspCode,
                message: rspCode === '00' ? 'Payment successful' : 'Payment failed'
            });
        } else {
            res.status(400).json({ rspCode: '97', message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ rspCode: '99', message: 'Internal server error' });
    }
};

module.exports = {createPayment, verifyPayment};

const crypto = require('crypto'); // Import thư viện crypto để mã hóa và tạo chữ ký HMAC
const https = require('https'); // Import thư viện https để gửi yêu cầu HTTP

exports.createPayment = async (req, res) => {
    try {
        // Kiểm tra nếu không có amount hoặc amount không phải là số nguyên
        if (!req.body.amount || isNaN(req.body.amount)) {
            return res.status(400).json({ message: 'Số tiền cần thanh toán không hợp lệ.' });
        }

        // Lấy số tiền từ yêu cầu
        var amount = parseInt(req.body.amount); // Chuyển đổi sang số nguyên để đảm bảo đúng định dạng

        var partnerCode = 'MOMO'; // Mã đối tác do MoMo cung cấp
        //accessKey và secretKey khi đky doanh nghiệp vs Momo sẽ đc cấp (tạm thời chưa cần thiết)
        var accessKey = 'F8BBA842ECF85';
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        // Tạo requestId và orderId duy nhất bằng cách kết hợp mã đối tác với thời gian hiện tại
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = `Payment for order #${orderId}`;
        var redirectUrl = 'https://yourwebsite.com/return'; //Web hiện khi thanh toán xong (đã chuyển khoản nhận tiền)
        var ipnUrl = '"https://callback.url/notify'; // URL để nhận thông báo từ MoMo về kết quả thanh toán
        var lang = "vi"; //Ngôn ngữ

        var requestType = 'captureWallet'; // Loại yêu cầu, thanh toán từ ví MoMo
        var extraData = ''; // Extra data cho đơn hàng, để trống nếu không có gì thêm

        // Tạo chuỗi rawSignature để ký HMAC SHA256
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)
        //signature
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
        console.log(rawSignature);

        // Tạo request body gửi đến MoMo
        const requestBody = JSON.stringify({
            partnerCode,       // Mã đối tác
            accessKey,         // Khóa truy cập
            requestId,         // ID yêu cầu duy nhất
            orderId,           // ID đơn hàng duy nhất
            orderInfo,         // Mô tả đơn hàng
            redirectUrl,       // URL sau khi thanh toán thành công
            ipnUrl,            // URL thông báo từ MoMo
            amount,            // Số tiền cần thanh toán
            requestType: 'captureWallet', // Loại yêu cầu thanh toán
            lang: 'vi',
            signature,         // Chữ ký bảo mật
        });

        // Cài đặt các tùy chọn cho yêu cầu HTTPS đến MoMo
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create', // Đường dẫn API để tạo thanh toán
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
        };

        // Tạo yêu cầu HTTPS đến API MoMo
        const momoReq = https.request(options, (momoRes) => {
            let data = ''; // Biến để lưu trữ dữ liệu từ phản hồi

            // Xử lý các phần dữ liệu từ phản hồi
            momoRes.on('data', (chunk) => {
                data += chunk;
            });

            // Khi nhận đủ dữ liệu, phân tích phản hồi và trả về URL thanh toán
            momoRes.on('end', () => {
                const responseBody = JSON.parse(data); // Phân tích phản hồi JSON từ MoMo
                // Kiểm tra nếu có lỗi từ MoMo trả về
                if (!responseBody.payUrl) {
                    // Nếu không có URL, trả về thông báo lỗi chi tiết từ MoMo
                    return res.status(500).json({ message: responseBody.message || 'Error generating payment link' });
                } else {
                    // Trả về URL thanh toán cho người dùng
                    return res.status(200).json({ payUrl: responseBody.payUrl });
                }
            });
        });

        // Xử lý lỗi xảy ra trong quá trình gửi yêu cầu
        momoReq.on('error', (e) => {
            console.error(`Error: ${e.message}`);
            return res.status(500).json({ message: 'Payment creation failed due to network issues' });
        });

        // Ghi request body vào yêu cầu và kết thúc yêu cầu
        momoReq.write(requestBody);
        momoReq.end();
    } catch (error) {
        console.error('Error creating payment:', error);
        return res.status(500).json({ message: 'Unexpected error occurred while creating payment' });
    }
};

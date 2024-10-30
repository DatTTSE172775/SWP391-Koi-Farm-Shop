import React, { useEffect, useState } from 'react';
import { Result, Button, Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../../api/axiosInstance';
import './Payment.scss';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../store/actions/orderActions';

const PaymentResult = () => {
  const [status, setStatus] = useState('processing');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axiosInstance.get(
          `/payment/verify${location.search}`
        );
        
        if (response.data.rspCode === '00') {
          setStatus('success');

          // Get pending order from localStorage
          const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
          if (pendingOrder) {
            // Create order in database
            await dispatch(createOrder(pendingOrder));
            // Clear pending order from localStorage
            localStorage.removeItem('pendingOrder');
          }
        } else {
          setStatus('error');
          //Remove pending order from localStorage
          localStorage.removeItem('pendingOrder');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    if (location.search) {
      verifyPayment();
    }
  }, [location, dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>Đang xử lý thanh toán...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px' }}>
      {status === 'success' ? (
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          status="success"
          title="Thanh toán thành công!"
          subTitle="Cảm ơn bạn đã mua hàng. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất."
          extra={[
            <Button type="primary" key="orders" onClick={() => navigate('/orders')}>
              Xem đơn hàng
            </Button>,
            <Button key="home" onClick={() => navigate('/home')}>
              Về trang chủ
            </Button>,
          ]}
        />
      ) : (
        <Result
          icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          status="error"
          title="Thanh toán thất bại"
          subTitle="Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau."
          extra={[
            <Button type="primary" key="retry" onClick={() => navigate('/checkout')}>
              Thử lại
            </Button>,
            <Button key="home" onClick={() => navigate('/home')}>
              Về trang chủ
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default PaymentResult;
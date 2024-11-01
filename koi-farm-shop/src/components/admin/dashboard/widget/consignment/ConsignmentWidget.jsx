// src/components/admin/dashboard/ConsignmentWidget.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { TagsOutlined } from '@ant-design/icons';
import './ConsignmentWidget.scss';

const ConsignmentWidget = () => {
    const [consignments, setConsignments] = useState(null);

    // Mockup data for demonstration
    useEffect(() => {
        const mockConsignmentData = {
            newConsignments: 5,
            activeConsignments: 15,
            forSaleConsignments: 8,
        };
        setConsignments(mockConsignmentData);
    }, []);

    return (
        <Card className="consignment-widget">
            <div className="consignment-widget__header">
                <h3 className="consignment-widget__title">Ký Gửi Cá Koi</h3>
                <TagsOutlined className="consignment-widget__icon" />
            </div>
            <p className="consignment-widget__value">
                {consignments ? `${consignments.activeConsignments} ký gửi đang hoạt động` : 'Không có dữ liệu'}
            </p>
            <div className="consignment-widget__details">
                {consignments && (
                    <>
                        <p className="consignment-widget__detail">Mới: <span>{consignments.newConsignments}</span></p>
                        <p className="consignment-widget__detail">Đang rao bán: <span>{consignments.forSaleConsignments}</span></p>
                    </>
                )}
            </div>
        </Card>
    );
};

export default ConsignmentWidget;

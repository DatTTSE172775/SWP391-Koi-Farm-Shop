// src/components/admin/dashboard/ConsignmentWidget.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
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
            <div>
                <h3 className="consignment-widget__title">Ký Gửi Cá Koi</h3>
                <p className="consignment-widget__value">
                    {consignments ? `${consignments.activeConsignments} ký gửi đang hoạt động` : 'Không có dữ liệu'}
                </p>
                <p className="consignment-widget__details">
                    {consignments && (
                        <>
                            <span>Mới: {consignments.newConsignments}</span> |{' '}
                            <span>Đang rao bán: {consignments.forSaleConsignments}</span>
                        </>
                    )}
                </p>
            </div>
        </Card>
    );
};

export default ConsignmentWidget;

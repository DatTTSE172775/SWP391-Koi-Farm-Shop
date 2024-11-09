// src/components/WelcomeCard.jsx
import React from 'react';
import { Card, Space } from 'antd';

const WelcomeCard = ({ title, value, description, icon }) => {
    return (
        <Card className="welcome-card hover-card">
            <Space direction="vertical" size="middle" align="center">
                {icon && <div className="welcome-card__icon">{icon}</div>}
                <h3>{title}</h3>
                <p className="welcome-card__value">{value}</p>
                <p className="welcome-card__description">{description}</p>
            </Space>
        </Card>
    );
};

export default WelcomeCard;

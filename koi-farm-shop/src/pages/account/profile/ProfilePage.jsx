import React, { useEffect } from "react";
import { Card, Button, Avatar, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../../../store/actions/accountActions";
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import "./ProfilePage.scss";

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.account.user);
    const error = useSelector((state) => state.account.error);

    useEffect(() => {
        const username = localStorage.getItem("username");
        dispatch(fetchUserByUsername(username));
    }, [dispatch]);

    return (
        <div className="profile-container">
            <Card className="profile-card">
                {error ? (
                    <p className="error">Không thể tải thông tin người dùng: {error}</p>
                ) : user ? (
                    <div className="profile-content">
                        {/* Avatar và Tên */}
                        <div className="header">
                            <Avatar
                                size={120}
                                src={user.Avatar || "https://via.placeholder.com/120"}
                                alt="Avatar"
                                className="avatar"
                            />
                            <h2>{user.FullName}</h2>
                        </div>

                        <Divider />

                        {/* Thông tin cá nhân */}
                        <div className="user-info">
                            <p className="info-item">
                                <UserOutlined className="icon" />
                                <span className="label">Tên tài khoản:</span> {user.Username || "Chưa cập nhật"}
                            </p>
                            <p className="info-item">
                                <MailOutlined className="icon" />
                                <span className="label">Email:</span> {user.Email || "Chưa cập nhật"}
                            </p>
                            <p className="info-item">
                                <PhoneOutlined className="icon" />
                                <span className="label">Số điện thoại:</span> {user.PhoneNumber || "Chưa cập nhật"}
                            </p>
                            <p className="info-item">
                                <EnvironmentOutlined className="icon" />
                                <span className="label">Địa chỉ:</span> {user.Address || "Chưa cập nhật"}
                            </p>
                        </div>

                        <Divider />

                        {/* Button điều hướng */}
                        <div className="profile-actions">
                            <Button
                                type="primary"
                                className="update-btn"
                                onClick={() => navigate("/update-profile")}
                            >
                                Cập nhật thông tin
                            </Button>
                            <Button
                                type="default"
                                className="change-password-btn"
                                onClick={() => navigate("/change-password")}
                            >
                                Thay đổi mật khẩu
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p>Đang tải thông tin...</p>
                )}
            </Card>
        </div>
    );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { Card, Input, Button, Form, Upload, Avatar, notification, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../../../store/actions/accountActions"; // Import action fetchUserByUsername
import "./UpdateProfile.scss";

const UpdateProfile = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.account.user); // Lấy thông tin người dùng từ Redux
    const [avatar, setAvatar] = useState(null); // State để lưu ảnh avatar
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("username"); // Lấy username từ localStorage
        if (username) {
            dispatch(fetchUserByUsername(username)); // Gọi action để lấy thông tin người dùng
        }
    }, [dispatch]);

    useEffect(() => {
        // Khi có thông tin người dùng, set giá trị vào form và avatar
        if (user) {
            form.setFieldsValue({
                fullName: user.FullName,
                email: user.Email,
                phone: user.PhoneNumber,
                address: user.Address,
            });
            setAvatar(user.Avatar || "https://placehold.co/120x120"); // Nếu không có ảnh, dùng ảnh placeholder
        }
    }, [user, form]);

    const handleSaveProfile = (values) => {
        console.log("Thông tin đã chỉnh sửa:", { ...values, avatar });

        // Hiển thị thông báo thành công
        notification.success({
            message: "Cập nhật thành công",
            description: "Thông tin cá nhân của bạn đã được cập nhật.",
        });

        // Điều hướng về trang profile
        navigate("/profile");
    };

    const handleUpload = ({ file }) => {
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarClick = () => {
        setIsModalOpen(true); // Hiển thị modal khi click vào ảnh
    };

    return (
        <div className="update-profile-container">
            <Card title="Cập nhật thông tin cá nhân" className="profile-card">
                {/* Avatar */}
                <div className="avatar-section">
                    <Avatar
                        size={120}
                        src={avatar || "https://placehold.co/120x120"}
                        alt="Avatar"
                        className="avatar"
                        onClick={handleAvatarClick} // Chỉ gắn sự kiện onClick trên ảnh
                    />
                </div>

                {/* Nút thay đổi ảnh đại diện */}
                <div className="avatar-buttons">
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                            handleUpload({ file });
                            return false;
                        }}
                    >
                        <Button icon={<PlusOutlined />} className="upload-btn">
                            Thay đổi ảnh đại diện
                        </Button>
                    </Upload>
                </div>

                {/* Form thông tin */}
                <Form form={form} layout="vertical" onFinish={handleSaveProfile}>
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: "Họ và tên không được để trống" }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Email không được để trống" },
                            { type: "email", message: "Email không đúng định dạng" },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            { required: true, message: "Số điện thoại không được để trống" },
                            { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ" },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block className="save-btn">
                        Lưu thông tin
                    </Button>
                </Form>
            </Card>

            {/* Modal ảnh */}
            <Modal
                title="Ảnh Avatar"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <img src={avatar || "https://placehold.co/120x120"} alt="Avatar Preview" style={{ width: "100%" }} />
            </Modal>
        </div>
    );
};

export default UpdateProfile;

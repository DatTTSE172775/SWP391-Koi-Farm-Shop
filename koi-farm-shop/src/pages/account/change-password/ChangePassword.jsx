import { Button, Form, Input, Typography, notification } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../store/actions/authActions";
import "./ChangePassword.scss";

const { Title, Text } = Typography;

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { oldPassword, newPassword } = values;
    dispatch(changePassword(oldPassword, newPassword));
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Lỗi",
      description: "Vui lòng kiểm tra lại thông tin.",
      duration: 3,
    });
  };

  if (error) {
    notification.error({
      message: "Lỗi",
      description: error,
      duration: 3,
    });
  }

  return (
    <div className="change-password-wrapper">
      <div className="change-password-card">
        <Title level={3} className="title">
          Thay Đổi Mật Khẩu
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark="optional"
        >
          <Form.Item
            label={<Text strong>Mật Khẩu Cũ</Text>}
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu cũ" />
          </Form.Item>

          <Form.Item
            label={<Text strong>Mật Khẩu Mới</Text>}
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            label={<Text strong>Nhập Lại Mật Khẩu Mới</Text>}
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;

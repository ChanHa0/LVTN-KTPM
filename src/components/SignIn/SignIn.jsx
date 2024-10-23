import React from 'react';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const SignIn = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5',
        }}
    >
        <Form
            name="basic"
            style={{
                maxWidth: 400,
                width: '100%',
                padding: '24px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <h2 style={{ marginBottom: '24px' }}>Đăng nhập</h2>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ textAlign: 'left' }}
            >
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ textAlign: 'left' }}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Row justify="space-between" style={{ marginBottom: '16px' }}>
                <Col>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Col>
                <Col>
                    <a href="http://localhost:3000/dangky">Forgot Password</a>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
);

export default SignIn;

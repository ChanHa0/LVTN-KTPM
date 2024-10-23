import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const SignUp = () => (
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
            <h2 style={{ marginBottom: '24px' }}>Đăng ký</h2>

            <Form.Item
                label="Username"
                name="username"
                tooltip="What do you want others to call you?"
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

            <Form.Item
                label="Confirm Password"
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ textAlign: 'left' }}
            >
                <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ textAlign: 'left' }}
            >
                <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                wrapperCol={{ span: 24 }}
                style={{ textAlign: 'left' }}
            >
                <Checkbox>I have read the agreement</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{ span: 24 }}
                style={{ textAlign: 'center' }}
            >
                <Button type="primary" htmlType="submit" block>
                    Register
                </Button>
            </Form.Item>
        </Form>
    </div>
);

export default SignUp;

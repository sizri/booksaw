// src/components/SignUp.js
import React from 'react';
import { Form, Input, Button, Select, InputNumber, message, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Title } = Typography;

const SignUp = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const signupData = {
      username: values.username,
      password: values.password,
      email: values.email,
      role: values.role || 'ROLE_USER',
      balance: parseFloat(values.balance),
    };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      message.success(response.data);
    } catch (error) {
      console.error('회원가입 실패:', error);
      message.error('회원가입에 실패했습니다.');
    }
  };

  return (

    <div style={styles.container}>
<div style={styles.backButtonContainer}>
        <Button type="link" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
          뒤로가기
        </Button>
      </div>
          
      <div style={styles.formWrapper}>
        <Title level={2} style={styles.title}>회원가입</Title>
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ role: 'ROLE_USER' }}
        >
          <Form.Item
            label="사용자 이름"
            name="username"
            rules={[{ required: true, message: '사용자 이름을 입력하세요.' }]}
          >
            <Input placeholder="사용자 이름을 입력하세요" />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력하세요.' }]}
          >
            <Input.Password placeholder="비밀번호를 입력하세요" />
          </Form.Item>

          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: '이메일을 입력하세요.' },
              { type: 'email', message: '유효한 이메일을 입력하세요.' },
            ]}
          >
            <Input placeholder="이메일을 입력하세요" />
          </Form.Item>

          <Form.Item label="역할" name="role">
            <Select>
              <Option value="ROLE_USER">일반 사용자</Option>
              <Option value="ROLE_ADMIN">관리자</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="잔액"
            name="balance"
            rules={[{ required: true, message: '잔액을 입력하세요.' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="잔액을 입력하세요" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
    padding: '20px',
    position: 'relative', // 추가
  },
  backButtonContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#1890ff',
  },
};


export default SignUp;

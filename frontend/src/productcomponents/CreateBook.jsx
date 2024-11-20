// src/components/CreateBook.js
import React, { useState, useContext } from 'react';
import { Form, Input, InputNumber, Button, Upload, message, Typography } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ProductContext } from '../contexts/ProductContext';
const { Title } = Typography;

const CreateBook = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { createProduct } = useContext(ProductContext);

  // 이미지 업로드 핸들러
  const handleUploadChange = info => {
    let newFileList = [...info.fileList];
    // 최신 파일 하나만 유지
    newFileList = newFileList.slice(-1);
    setFileList(newFileList);
    setImageFile(newFileList[0]?.originFileObj || null);
  };

  // 폼 제출 핸들러
  const onFinish = async (values) => {
    setLoading(true);
    const { title, description, price, stockQuantity, author, genre } = values;

    // 책 정보 JSON
    const book = {
      title,
      description,
      price,
      stockQuantity,
      author,
      genre
    };

    try {
      await createProduct(book, imageFile);
      message.success('책이 성공적으로 등록되었습니다!');
      form.resetFields();
      setImageFile(null);
      setFileList([]);
      // 추가적인 동작 예: 책 목록 갱신
    } catch (error) {
      console.error('책 등록 실패:', error);
      if (error.response && error.response.data) {
        message.error(`책 등록 실패: ${error.response.data.message || error.response.data}`);
      } else {
        message.error('책을 등록하는 데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backButtonContainer}>
        <Button type="link" onClick={handleBack} icon={<ArrowLeftOutlined />} style={styles.backButton}>
          뒤로가기
        </Button>
      </div>
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <Title level={2} style={styles.title}>책 등록</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="책 이름"
              rules={[{ required: true, message: '책 이름을 입력해주세요!' }]}
            >
              <Input placeholder="책 이름을 입력하세요" />
            </Form.Item>

            <Form.Item
              name="description"
              label="설명"
              rules={[{ required: true, message: '책 설명을 입력해주세요!' }]}
            >
              <Input.TextArea rows={4} placeholder="책 설명을 입력하세요" />
            </Form.Item>

            <Form.Item
              name="price"
              label="가격"
              rules={[{ required: true, message: '가격을 입력해주세요!' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={value => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/₩\s?|(,*)/g, '')}
                placeholder="가격을 입력하세요"
              />
            </Form.Item>

            <Form.Item
              name="stockQuantity"
              label="재고 수량"
              rules={[{ required: true, message: '재고 수량을 입력해주세요!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} placeholder="재고 수량을 입력하세요" />
            </Form.Item>

            <Form.Item
              name="author"
              label="작가"
              rules={[{ required: true, message: '작가 이름을 입력해주세요!' }]}
            >
              <Input placeholder="작가 이름을 입력하세요" />
            </Form.Item>

            <Form.Item
              name="genre"
              label="장르"
              rules={[{ required: true, message: '장르를 입력해주세요!' }]}
            >
              <Input placeholder="장르를 입력하세요" />
            </Form.Item>

            <Form.Item
              label="이미지"
              required
              rules={[{ required: true, message: '이미지를 업로드해주세요!' }]}
            >
              <Upload
                beforeUpload={() => false} // 자동 업로드 방지
                onChange={handleUploadChange}
                fileList={fileList}
                maxCount={1}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>이미지 업로드</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                책 등록
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: '10px',
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  backButtonContainer: {
    marginBottom: '10px',
    textAlign: 'left',
  },
  backButton: {
    fontSize: '14px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '10px',
    overflowY: 'auto',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '600px',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#1890ff',
  },
};

export default CreateBook;

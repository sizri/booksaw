// src/components/InsertProductLink.jsx


import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';

const { Text } = Typography;

const InsertButton = () => {
  return (
    <Link to="/insert" style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
      <Space>
        <PlusOutlined />
        <Text>책 추가</Text>
      </Space>
    </Link>
  );
};

export default InsertButton;

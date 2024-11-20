// src/components/AdminList.jsx
import { useContext, useState } from 'react';
import {
  List,
  Button,
  message,
  Typography,
  Space,
  Input,
  Row,
  Col,
  Popconfirm,
  Avatar,
} from 'antd';
import { ProductContext } from '../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  BookOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import './AdminList.css'; // CSS 파일 임포트
import {Tooltip} from 'antd';

const { Text } = Typography;

const AdminList = () => {
  const { products, deleteProduct, serverBaseUrl } = useContext(ProductContext);
  const navigate = useNavigate();

  // 검색 및 페이지네이션 상태 관리
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      message.success('제품이 삭제되었습니다.');
    } catch (error) {
      console.error('제품 삭제 실패:', error);
      message.error('제품을 삭제하는 데 실패했습니다.');
    }
  };

  const handleEdit = (productId) => {
    navigate(`/bookedit/${productId}`);
  };

  // 검색 필터링 적용
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // 총 재고 수량 계산
  const totalStockQuantity = filteredProducts.reduce(
    (total, product) => total + product.stockQuantity,
    0
  );

  // 현재 페이지에 표시될 제품 계산
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="admin-list-container">
      <Button type="link" onClick={()=>window.history.back()} icon={<ArrowLeftOutlined />} >
          뒤로가기
        </Button>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '20px',display: 'flex', height: '100px'  }}
      >
        <Col>
          <Text strong style={{ fontSize: '24px' }}>
            제품 관리
          </Text>
          <Text style={{ marginLeft: '16px', fontSize: '16px' }}>
            총 재고 수량: {totalStockQuantity}권
          </Text>
          <Space>

        </Space>
        </Col>
       
        <Col>
  <space>
  <Input
            placeholder="검색어를 입력하세요"
            allowClear
            size="large"
            style={{ height: '40px', width: '200px' }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          // 엔터 키로도 검색 가능하게 추가
          />

          <Tooltip title="search">
            <Button shape="circle" icon={<SearchOutlined />} 
            onClick={() => (value) => {
              setSearchText(value);
              setCurrentPage(1); 
            }}
            />
          </Tooltip>
            


  </space>
       
        </Col>
       
        
      </Row>
      <List
        dataSource={paginatedProducts}
        renderItem={(product) => (
          <List.Item
            className="list-item"
            actions={[
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => handleEdit(product.productId)}
              >
                수정
              </Button>,
              <Popconfirm
                title="정말로 이 제품을 삭제하시겠습니까?"
                onConfirm={() => handleDelete(product.productId)}
                okText="예"
                cancelText="아니오"
              >
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  size="small"
                >
                  삭제
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={
                product.imageUrl ? (
                  <Avatar
                    shape="square"
                    size={60}
                    src={`${serverBaseUrl}${product.imageUrl}`}
                    alt="제품 이미지"
                  />
                ) : (
                  <Avatar
                    shape="square"
                    size={60}
                    style={{ backgroundColor: '#f0f0f0' }}
                    icon={<BookOutlined style={{ color: '#bfbfbf' }} />}
                  />
                )
              }
              title={
                <Text strong>
                  {product.title} (ID: {product.productId})
                </Text>
              }
              description={
                <Space direction="vertical" size={0}>
                  <Text className="product-description">
                    {product.description}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    작가: {product.author} | 장르: {product.genre}
                  </Text>
                  <Text strong style={{ fontSize: '14px' }}>
                    가격: ₩{parseInt(product.price).toLocaleString()} | 재고: {product.stockQuantity}권
                  </Text>
                </Space>
              }
            />
          </List.Item>
        )}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredProducts.length,
          onChange: handlePageChange,
          showSizeChanger: false,
          showTotal: (total) => `총 ${total}개의 제품`,
        }}
        locale={{
          emptyText: '표시할 제품이 없습니다.',
        }}
      />
    </div>
  );
};



export default AdminList;

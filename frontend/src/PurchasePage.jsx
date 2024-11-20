// src/components/PurchasePage.jsx

import { useEffect } from 'react';
import axios from 'axios';
import {
  Layout,
  Typography,
  List,
  Avatar,
  Button,
  InputNumber,
  Divider,
  Space,
  Empty,
  message,
  
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useContext } from 'react';
import { ProductContext } from './contexts/ProductContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Content } = Layout;

const PurchasePage = ({
  shopData,
  deleteShopData,
  incShopData,
  decShopData,
  clearShopData
}) => {

  const navigate = useNavigate()
  const {serverBaseUrl} = useContext(ProductContext)
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(()=>{
    
  })
  // 총 합계 계산 함수
  const calculateTotal = () => {
    if (!shopData || shopData.length === 0) return '0.00';

    const total = shopData.reduce((accumulator, product) => {

      const count = product.count || 1;
      return accumulator + product.price * count;
    }, 0);

    return total.toFixed(2);
  };

  const doShop = async () => {
      shopData.map(data => ({
          productId:data.productId,
          count:data.count,
          userId:data.userId
      }),);
      console.log("mapped shopdata:",shopData)
      try{
      const response = await axios.post(`${serverBaseUrl}/api/shop`,shopData, {headers: {
        'Content-Type': 'application/json'
      }})
      if(response.status===200) {
        message.success(response.data)
        clearShopData()
        // location.reload()
      } else {
        message.error("미확인 응답")
      }
      
      } catch(error){
        if (error.response) {
          if(error.response.status === 400){
            message.error(error.response.data);
          }
          else if (error.response.status === 500) {
            message.error(error.response.data); // "shop 실패"
          } else {
            message.error(`오류 발생: ${error.response.data}`);
          }
          console.log("shop실패",error)
      } else if (error.request){
        message.error("에러 응답받지못함")
      }
  }
  }

  


  // 장바구니가 비어 있을 때
  if (!shopData || shopData.length === 0) {
    return (
      <Layout style={{ minHeight: '100vh', padding: '50px' }}>
        <Content>
        <Button type="link" onClick={()=>navigate(-1)} icon={<ArrowLeftOutlined />} >
          뒤로가기
        </Button>
          <Empty
            description="현재 장바구니에 담긴 제품이 없습니다."
            image={<ShoppingCartOutlined style={{ fontSize: '64px', color: '#ccc' }} />}
          />
        </Content>
      </Layout>
    );
  }

  return (
    
    <Layout style={{ minHeight: '100vh', padding: isMobile ? '20px' : '50px' }}>
      <Content>
      <Button type="link" onClick={()=>navigate(-1)} icon={<ArrowLeftOutlined />} >
          뒤로가기
        </Button>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          장바구니
        </Title>
        {isMobile ? (
          // 모바일 레이아웃 (리스트 형태)
          <List
            itemLayout="vertical"
            dataSource={shopData}
            renderItem={(product) => (
              <List.Item
                key={product.id}
                actions={[
                  <Space>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => decShopData(product)}
                    />
                    <InputNumber
                      min={1}
                      value={product.count || 1}
                      readOnly
                      style={{ width: '60px' }}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => incShopData(product)}
                    />
                  </Space>,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteShopData(product)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={serverBaseUrl+product.imageUrl}
                      shape="square"
                      size={64}
                      style={{ borderRadius: '8px' }}
                    />
                  }
                  title={<Text strong>{product.title}</Text>}
                  description={product.author}
                />
                <div style={{ marginTop: '10px' }}>
                  <Text strong>가격: </Text>
                  <Text>{product.price.toFixed(2)}원</Text>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Text strong>합계: </Text>
                  <Text>{(product.price * (product.count || 1)).toFixed(2)}원</Text>
                </div>
              </List.Item>
            )}
          />
        ) : (
          // 데스크탑 레이아웃 (테이블 형태)
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={shopData}
            renderItem={(product, index) => (
              <List.Item key={product.productId}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                  }}
                >
                  <Avatar
                    src={serverBaseUrl+product.imageUrl}
                    shape="square"
                    size={100}
                    style={{ borderRadius: '8px', marginRight: '20px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <Title level={4}>{product.title}</Title>
                    <Text type="secondary">{product.author}</Text>
                    <div style={{ marginTop: '10px' }}>
                      <Text strong>가격: </Text>
                      <Text>${parseFloat(product.price).toFixed(2)}</Text>
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                      <Text strong>수량: </Text>
                      <Space style={{ marginLeft: '10px' }}>
                        <Button
                          icon={<MinusOutlined />}
                          onClick={() => decShopData(product)}
                        />
                        <InputNumber
                          min={1}
                          value={product.count || 1}
                          readOnly
                          style={{ width: '60px' }}
                        />
                        <Button
                          icon={<PlusOutlined />}
                          onClick={() => incShopData(product)}
                        />
                      </Space>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <Text strong>합계: </Text>
                      <Text>{(parseFloat(product.price) * (product.count || 1)).toFixed(2)}원</Text>
                    </div>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteShopData(product)}
                    style={{ fontSize: '20px' }}
                  />
                </div>
              </List.Item>
            )}
          />
        )}
        <Divider />
        {/* 총 합계 및 체크아웃 */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={4}>총 합계: {calculateTotal()}원</Title>
          <Button
            type="primary"
            size="large"
            onClick={doShop}
            style={{ marginTop: isMobile ? '20px' : '0' }}
          >
            체크아웃
          </Button>
        </div>
      </Content>
    </Layout>
  );
};


export default PurchasePage;

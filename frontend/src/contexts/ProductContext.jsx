// src/contexts/ProductContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { TryTwoTone } from '@mui/icons-material';

export const ProductContext = createContext();

const serverBaseUrl = 'http://localhost:8080';
const apiBaseUrl = `${serverBaseUrl}/api/products`;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { currentUserRole,jwtToken } = useContext(AuthContext);

  useEffect(() => {
    loadAllProducts();
  }, [currentUserRole]);

  const loadAllProducts = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      setProducts(response.data);
    } catch (error) {
      console.error('제품 로드 실패:', error);
      alert('제품을 로드하는 데 실패했습니다.');
    }
  };

  const createProduct = async (productData, imageFile) => {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(productData)], { type: 'application/json' })
    );
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.post(apiBaseUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('제품 생성 성공');
      loadAllProducts();
    } catch (error) {
      console.error('제품 생성 실패:', error);
      alert('제품을 생성하는 데 실패했습니다.');
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('정말로 이 제품을 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`${apiBaseUrl}/${productId}`);
      alert('제품 삭제 성공');
      loadAllProducts();
    } catch (error) {
      console.error('제품 삭제 실패:', error);
      alert('제품을 삭제하는 데 실패했습니다.');
    }
  };

  const editProduct = async (bookid,productData, imageFile) => {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(productData)], { type: 'application/json' })
    );
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`${apiBaseUrl}/${bookid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization':`Bearer ${jwtToken}`
        },
      });
      alert('제품 수정 성공');
      loadAllProducts();
    } catch (error) {
      console.error('제품 수정 실패:', error);
      alert('제품을 수정하는 데 실패했습니다.');
    }
  };
  
  const getOneProduct = async (productId) => {
    try{
      const response = await axios.get(`${apiBaseUrl}/${productId}`)
      return response.data
    } catch(error){
      console.error('get 실패',error)

    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loadAllProducts,
        createProduct,
        deleteProduct,
        serverBaseUrl,
        editProduct,
        getOneProduct

      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

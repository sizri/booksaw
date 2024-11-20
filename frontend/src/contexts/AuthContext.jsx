// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const serverurl="http://localhost:8080"
// Context 생성
export const AuthContext = createContext();

// Provider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
  // const [jwtToken, setJwtToken] = useState(() => localStorage.getItem('jwtToken') || '');
  const [jwtToken, setJwtToken] =useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('jwtToken'));
  const [User, setUser]=useState('') 
  const [Role, setRole]=useState('') 

  // Axios 기본 헤더에 토큰 설정
  useEffect(() => {
    
    setJwtToken(localStorage.getItem('jwtToken') || '');

    console.log("authuseeffect")
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      console.log("토큰없음1")
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [jwtToken]);

  // 로그인 함수
  const login = async (username, password) => {
    console.log("authlogin")
   
      const response = await axios.post(`${serverurl}/api/auth/login`, { username, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const token = response.data.token;
      setJwtToken(token);
      localStorage.setItem('jwtToken', token);
      setIsLoggedIn(true);
      // 사용자 정보 가져오기
      await fetchCurrentUser();

  
  };

  // 로그아웃 함수
  const logout = () => {
    setJwtToken('');
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setRole('');
    setUser('');
  };

  // 현재 사용자 정보 가져오기
  const fetchCurrentUser = async () => {
    console.log("fetchCurrentUser")
    
      const response = await axios.get(`${serverurl}/api/auth/me`);
      if(response.data === null){
        console.log("사용자정보 실패")
        return
      }
      const userInfo = response.data;
      console.log(userInfo)
      setRole(userInfo.role);
      setUser(userInfo.username)
      localStorage.setItem('role', userInfo.role);
      localStorage.setItem('username', userInfo.username);
 
    
  };

  // 초기 사용자 정보 로드
  useEffect(() => {
    console.log("useef 2")
    console.log(jwtToken)
    if (jwtToken) {
      
      const role = localStorage.getItem('role')
      const username = localStorage.getItem('username')
      setRole(role)
      setUser(username)
      console.log("fetch:role",role,"username:",username)
      fetchCurrentUser();
    } else {console.log("토큰없음2")}
  }, [jwtToken]);

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken, Role, isLoggedIn, login, logout,User }}>
      {children}
    </AuthContext.Provider>
  );
};

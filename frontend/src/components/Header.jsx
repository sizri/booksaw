// src/components/Header.jsx

import React, { useState, useEffect, useRef, useContext } from 'react';
import "./Header.css";
import { Button, TextField, Box, Popover, IconButton, Typography} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../contexts/AuthContext';

import { Link } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {
  const {  Role, isLoggedIn, login, logout,User} = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [List, setList] = useState(false);
  const searchToggleRef = useRef(null);
  const searchInputRef = useRef(null);
  const headerWrapRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);




  const open = Boolean(anchorEl);
  const popover = open ? 'login-popover' : undefined;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop >= 200) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      setId('');
      setPassword('');
      handleClose();
  }},[isLoggedIn])



  const handleClickOutside = (e) => {
    if (
      headerWrapRef.current &&
      !headerWrapRef.current.contains(e.target) &&
      searchToggleRef.current &&
      !searchToggleRef.current.contains(e.target)
    ) {
      setIsActive(false);
      setIsShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleToggleClick = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
    setIsShown(!isShown);
  };

  const handleList = (e) => {
    e.preventDefault();
    setList(!List);
  };

  const handleLogin = async () => {
   await login(id, password);

      alert('로그인');
      setId('');
      setPassword('');
      handleClose();

  };

  return (
    <div id="header-wrap" className={isShown ? "show" : ""} ref={headerWrapRef}>
      <div className="top-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="social-links">
                <ul>
                  <li><a href="#"><i className="icon icon-facebook"></i></a></li>
                  <li><a href="#"><i className="icon icon-twitter"></i></a></li>
                  <li><a href="#"><i className="icon icon-youtube-play"></i></a></li>
                  <li><a href="#"><i className="icon icon-behance-square"></i></a></li>
                </ul>
              </div>
            </div>
      
            <div className="col-md-6">
              <div className="right-element">

     
        
              <Link to="/SignUp" style={{marginRight:'30px'}}>
              회원가입
              </Link>
    
   
              {!isLoggedIn ? (
                <>
        <IconButton
          onClick={handleClick}
          sx={{
            width: '50px',
            height: '21px',
            marginRight: '50px',
            paddingBottom: '12px',
            fontSize: '15px',
          }}
        >
          <LoginIcon />
          <span>로그인</span>
        </IconButton>
        <Popover
                  id={popover}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Box p={2} sx={{
                    display: 'flex',
                    alignContent: 'center',
                    flexDirection: 'column'
                  }}>
                    <div>
                      <Typography variant="body1" gutterBottom>아이디</Typography>
                      <TextField variant="outlined" name="username" onChange={(e) => setId(e.target.value)} />
                    </div>
                    <Typography variant="body1" gutterBottom>비밀번호</Typography>
                    <TextField type="password" variant="outlined" name="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
                      로그인
                    </Button>
                  </Box>
                </Popover>
        
        </>
      ) : (
        <>

{User && (
            <IconButton
              variant="contained"
              size="small"
              sx={{
               
              }}
            >
              <Typography variant="body2">{User}님</Typography>
            </IconButton>
          )}
          <IconButton
            onClick={logout}
            sx={{
              width: '100px',
              height: '21px',
            
           // Adjusted margin for spacing between buttons
           
              fontSize: '15px',
            }}
            aria-label="logout"
          >
            <LogoutIcon />
            <span>로그아웃</span>
          </IconButton>

    
    </>
      )}




           
                <IconButton variant="contained" size="small" >
                
                </IconButton>

                
            
                <div className="action-menu">
                  <div className="search-bar">
                    <button
                      className={`search-button search-toggle  ${isActive ? 'active' : ''}`}
                      style={{ backgroundColor: 'transparent' }}
                      data-selector="#header-wrap"
                      ref={searchToggleRef}
                      onClick={handleToggleClick}
                    >
                      <i className="icon icon-search"></i>
                    </button>
                    <form role="search" method="get" className="search-box">
                      <input
                        className="search-field text search-input"
                        placeholder="Search"
                        ref={searchInputRef}
                        type="search"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header id="header" className={isFixed ? 'fixed-top' : ''}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <div className="main-logo">
                <a href="/"><img src="/assets/images/main-logo.png" alt="logo" /></a>
              </div>
            </div>
            <div className="col-md-10">
              <nav id="navbar">
                <div className="main-menu stellarnav d-flex justify-content-around">
                  <a></a>
                  <ul className='menu-list'>
                    <li className="menu-item active"><a href="#home">Home</a></li>
                    <li className={`menu-item has-sub ${List ? 'open' : ''}`}>
                      <a href="#pages" className="nav-link" onClick={handleList}>
                        Pages
                      </a>
                      <ul className="submenu">
         
                        {Role==='ROLE_ADMIN' ?  <li className="menu-item">
                          <a href="/insert">책 추가</a> </li>:''}
                          {Role==='ROLE_ADMIN' ?  <li className="menu-item">
                            <a href="/bookmanage">책 관리</a> </li>:''}
                            {Role==='ROLE_ADMIN' ?  <li className="menu-item">
                              <a href="/usermanage">유저 관리</a> </li>:''}
                        <li>
                  <a href='/' onClick={(e) => {
                    e.preventDefault();
                    sessionStorage.clear()
                    location.reload()}} >세션 클리어</a></li>
    
                      </ul>
                    </li>
                    <li className="menu-item"><a href="#featured-books" className="nav-link">Featured</a></li>
                    <li className="menu-item"><a href="#popular-books" className="nav-link">Popular</a></li>
                    <li className="menu-item"><a href="#special-offer" className="nav-link">Offer</a></li>

                    <li className="menu-item"> <ShoppingLink></ShoppingLink></li>
             

                 
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};


const ShoppingLink = () => {
  return (
    <IconButton
  
    sx={{
  
    }}
    href="/purchase" // 링크를 걸고 싶다면 href 추가
  >
    <ShoppingCartIcon
      sx={{
   
        width:'10px',
        height:'10px'
      }}
    />
    {/* <Typography
      variant="body2" // 적절한 variant 선택
      sx={{
        fontSize: '20px', // 폰트 크기 조절
     // 아이콘과 텍스트 간격
      }}
    > 
     
    </Typography> */}
  </IconButton>
  );
};


export default Header;

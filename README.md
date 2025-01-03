# 📚 온라인 서점 프로젝트

안녕하세요! 이 프로젝트는 사용자와 관리자 권한에 따라 책을 사고 팔고, 관리할 수 있는 **온라인 서점**입니다. 이 프로젝트는 제이쿼리기반의 부트스트랩 템플릿을 리액트로 마이그레이션하여 백엔드로 구현한 프로젝트입니다. 프론트엔드와 백엔드가 긴밀하게 연동되어 있으며, 최신 기술 스택을 활용하여 구현되었습니다. 
## 🚀 주요 기능

### 사용자 기능
- **책 구매:** 사용자는 원하는 책을 선택하여 구매할 수 있습니다.
- **쇼핑 카트:** 책 이미지를 클릭하여 쇼핑 카트에 추가하며, 장바구니는 세션 스토리지에 저장됩니다.
- **구매 페이지:** 쇼핑 카트에 담긴 책을 한 번에 구매할 수 있습니다.

### 관리자 기능
- **책 관리:** 책의 정보를 추가, 수정, 삭제할 수 있습니다.
- **유저 관리:** 사용자 계정을 추가, 삭제, 수정할 수 있습니다.
- **권한 관리:** 사용자와 관리자 권한에 따라 접근을 제어합니다.

## 🛠 기술 스택

### 프론트엔드
- **React:** UI 라이브러리로 사용자 인터페이스를 구축.
- **Ant Design:** 깔끔하고 직관적인 디자인을 위한 UI 컴포넌트 라이브러리.
- **Axios:** REST API와의 통신을 위한 HTTP 클라이언트.
- **React Hooks:** `useEffect`, `useState`, `useContext` 등을 활용하여 상태 관리 및 사이드 이펙트 처리.
- **React Slick:** 슬라이더 구현을 위한 라이브러리.
- **Bootstrap 5:** 최신 버전의 Bootstrap을 사용하여 반응형 디자인과 스타일링을 구현.

### 백엔드
![ERD](screenshots/ERD.png)
- **Spring Framework:** 견고한 백엔드 로직을 위한 프레임워크.
- **MyBatis:** 데이터베이스 매핑을 위한 ORM 프레임워크.
- **Spring Security:** JWT 토큰 기반 인증 및 권한 관리.
- **Oracle DB:** 안정적인 데이터 저장을 위한 데이터베이스.

## 🔧 주요 구현 사항

- **권한 기반 접근 제어:** Spring Security를 통해 JWT 토큰 인증 방식을 구현하고, 사용자와 관리자 권한에 따라 접근을 제어하였습니다.
- **RESTful API 통신:** Axios를 사용하여 프론트엔드와 백엔드 간의 데이터 통신을 REST 방식으로 구현하였습니다.
- **세션 스토리지 활용:** 사용자가 장바구니에 담은 책은 세션 스토리지에 저장되어, 페이지 이동 시에도 데이터가 유지됩니다.
- **반응형 디자인:** Ant Design과 Bootstrap 5를 활용하여 다양한 디바이스에서 최적화된 사용자 경험을 제공합니다.
- **슬라이더 기능:** React Slick을 이용해 책 추천 슬라이더를 구현하였습니다.

## 📸 스크린샷

### 홈 페이지
<p align="center">
  <img src="screenshots/Homepage.png" alt="홈 페이지" width="500"/>
</p>
<p align="center"><em>홈 페이지입니다. 슬라이더에 React Slick을 이용하였고 REST 방식으로 책 목록을 백엔드로부터 응답받아 표시합니다.</em></p>

<p align="center">
  <img src="screenshots/Homepage2.png" alt="홈 페이지 2" width="500"/>
</p>
<p align="center"><em>추가적인 홈 페이지 레이아웃입니다.</em></p>

<p align="center">
  <img src="screenshots/Homepage3.png" alt="홈 페이지 3" width="500"/>
</p>
<p align="center"><em>추가적인 홈 페이지 레이아웃입니다.</em></p>

### 관리자 대시보드
<p align="center">
  <img src="screenshots/image.png" alt="관리자 대시보드" width="500"/>
</p>
<p align="center"><em>관리자 권한이 있다면 책과 유저의 CRUD 작업이 가능합니다.</em></p>

<p align="center">
  <img src="screenshots/image2.png" alt="관리자 대시보드 2" width="500"/>
</p>
<p align="center"><em>추가적인 관리자 기능 화면입니다.</em></p>

<p align="center">
  <img src="screenshots/image5.png" alt="관리자 대시보드 3" width="500"/>
</p>
<p align="center"><em>유저 관리 기능 화면입니다.</em></p>

### 회원 관리
<p align="center">
  <img src="screenshots/image4.png" alt="회원 관리" width="500"/>
</p>
<p align="center"><em>회원 관리 화면입니다.</em></p>

### 비회원 기능
<p align="center">
  <img src="screenshots/image3.png" alt="비회원 기능" width="500"/>
</p>

<p align="center">
  <img src="screenshots/image7.png" alt="로그인 화면" width="500"/>
</p>
<p align="center"><em>비회원은 회원가입과 로그인만 가능합니다.</em></p>

### 쇼핑 페이지
<p align="center">
  <img src="screenshots/image6.png" alt="쇼핑 페이지" width="500"/>
</p>
<p align="center"><em>User 권한이나 Admin 권한이 있다면 쇼핑 페이지에서 구매가 가능합니다. 구매 시 잔액이 줄어듭니다.</em></p>

## 📝 기타

이 프로젝트는 포트폴리오용으로 제작되었으며, 최신 웹 개발 기술을 학습하고 적용하는 데 중점을 두었습니다. 다양한 기술 스택과 보안 기능을 통해 실제 서비스와 유사한 환경을 구현하였습니다.

- **기반 프로젝트:** 이 프로젝트는 제이쿼리기반의 [Booksaw Free Version](https://github.com/templatesJungle/booksaw-free-version) 오픈소스 프로젝트를 기반으로 React로 마이그레이션되었습니다.

---

감사합니다! 😊

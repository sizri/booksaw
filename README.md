온라인 서점 프로젝트
사용자와 관리자 권한에 따라 책을 사고팔고 수정하거나 유저를 추가, 삭제, 수정할 수 있는 온라인 서점 애플리케이션입니다. React와 Spring Framework, 그리고 OracleDB로 구축되었습니다.

📌 개요
사용자 기능: 책을 구매할 수 있습니다.
관리자 기능: 책의 정보를 추가, 수정, 삭제하고, 사용자 계정을 관리할 수 있습니다.
🎯 주요 기능
권한 기반 접근 제어
Spring Security와 JWT 토큰 인증 방식을 통해 권한에 따른 접근 제어를 구현하였습니다.
쇼핑 카트
책 이미지를 클릭하여 쇼핑 카트에 담을 수 있으며, 카트 내용은 세션 스토리지에 저장되어 쇼핑 페이지에서 구매할 수 있습니다.
🛠 사용 기술
프론트엔드
React
기존에 jQuery로 작성된 오픈소스 부트스트랩을 React로 마이그레이션하였습니다.
React Hooks
useEffect, useState, useContext 등 다양한 훅을 활용하여 상태 관리와 생명주기 관리를 효율적으로 구현하였습니다.
Ant Design
UI 디자인에 Ant Design 라이브러리를 사용하여 일관된 디자인과 반응형 웹을 구현하였습니다.
Axios
백엔드와의 RESTful API 통신을 위해 axios를 사용하였습니다.
백엔드
Spring Framework
전반적인 백엔드 로직과 REST API를 구축하였습니다.
OracleDB
데이터베이스로 OracleDB를 사용하였습니다.
MyBatis
ORM(Object-Relational Mapping) 프레임워크로 MyBatis를 활용하였습니다.
Spring Security
보안 강화를 위해 JWT 토큰을 통한 인증 방식을 구현하였습니다.
🚀 프로젝트 특징
React로의 마이그레이션
기존의 바닐라 자바스크립트 및 jQuery 기반 코드를 React로 변환하여 현대적인 웹 애플리케이션으로 개선하였습니다.
권한에 따른 접근 제어
사용자와 관리자 권한에 따라 접근 가능한 기능을 구분하여 보안성과 편의성을 높였습니다.
세션 관리
쇼핑 카트의 상태를 세션 스토리지에 저장하여 사용자의 구매 경험을 향상시켰습니다.
RESTful API와 클라이언트 통신
프론트엔드와 백엔드 간의 효율적인 데이터 교환을 위해 RESTful API를 구현하였습니다.

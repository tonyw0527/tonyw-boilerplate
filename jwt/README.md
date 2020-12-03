# JWT BoilerPlate
- 빠르게 웹 서비스를 구축하기 위한 JWT 기반의 BoilerPlate 입니다.

## 사용법
- 기본적으로 구현된 사용자 인증 시스템을 사용하면 됨.
- .env 파일에서 환경 설정을 해야함.
- 원하는 컴포넌트들을 추가하고 API 라우팅을 추가하기만 하면됨.
- 기본적으로 /api/user 경로로 접근하는 api 요청에 대해서는 auth 검증이 설정되어있고 다른 경로로 라우팅을 하려는 경우 auth.js 미들웨어를 사용하여 /api/user 예시처럼 auth 검증을 설정해주면됨.

## Token
- token을 이용한 사용자 인증
- cookie에 token 저장하였음(httpOnly)
- 기본 세션쿠키, 토큰만료 1일
- 로그인 유지 선택시, 쿠키만료 1달, 토큰만료 1달
- 토큰 갱신에 대해서는 더 고민해봐야함

## Auth Redirect
- HOC로 auth 처리
- Rediect 이용
# JWT boilerplate

## Token
- token을 이용한 사용자 인증
- cookie에 token 저장하였음(httpOnly)
- 기본 세션쿠키, 토큰만료 1일
- 로그인 유지 선택시, 쿠키만료 1달, 토큰만료 1달
- 토큰 갱신에 대해서는 더 고민해봐야함

## Auth Redirect
- HOC로 auth 처리
- Rediect 이용
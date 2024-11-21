### Nginx의 Proxy를 이용한 설계
* /api로 시작되는 path -> 모든 요청이 백엔드 서버로
* 나머지 path -> 프론트로
* Nginx 2개
  * 프로시 한개
  * 프론트 보여줄 웹서버 한개

### Nginx는 정적파일을 제공만 해주는 설계
* port를 통해 분리
  * 80포트는 프론트
  * 5000포트는 백엔드

### 전체 흐름
* 소스코드 작성 -> Dockerfile작성(개발 / 운영) -> DockerCompose작성
* 깃헙에 push -> Travis CI -> DockerHub -> AWS EB
  * Travis CI
    * 테스트 소스 실행 -> 테스트 성공 -> 각각의 Dockerfile을 이용해 이미지 생성 -> 이미지 생성후 DockerHub로 전달
  * DockerHub
    * Travis CI에서 빌드된 이미 보관
    * AWS ESB에서 가져갈려 할 때 전달
  * AWS EB
    * Travis CI에서 빌드된 이미지를 이용해 배포
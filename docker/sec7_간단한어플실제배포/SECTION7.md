# 간단한 어플 실제 배포
* create-react-app
  * 테스트
    * 테스트 파일: `src/App.test.js`
    * 실행 명령어: `npm run test`
    * 배포단계 빌드 명령어: `npm run build`
# 도커를 이용하여 개발단계에서 리액트 실행하기
* 개발환경을 위한 도커파일 만들기
  * Docerfiler.dev
* 파일이름이 Dcokerfile.dev여서 옵션을 줘야 도커가 파일을 찾음
  * `docker build -f Dokcerfile.dev ./`
* node_modules
  * 도커 환경에서 빌드를 할때 굳이 로컬 머신에 node_modules가 필요하지 않다.
  * COPY ./ ./ 실행될때 중복되서 복사되는데, 불필요함
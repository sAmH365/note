# 간단한 어플 실제 배포(개발 환경 부분)
* create-react-app
  * 테스트
    * 테스트 파일: `src/App.test.js`
    * 실행 명령어: `npm run test`
    * 배포단계 빌드 명령어: `npm run build`
### 도커를 이용하여 개발단계에서 리액트 실행하기
* 개발환경을 위한 도커파일 만들기
  * Docerfiler.dev
* 파일이름이 Dcokerfile.dev여서 옵션을 줘야 도커가 파일을 찾음
  * `docker build -f Dokcerfile.dev ./`
* node_modules
  * 도커 환경에서 빌드를 할때 굳이 로컬 머신에 node_modules가 필요하지 않다.
  * COPY ./ ./ 실행될때 중복되서 복사되는데, 불필요함
* `docker run -it -p 3000:3000 <이미지 이름>`
  * 리액트는 실행할 때 -it를 붙여야 실행가능
* COPY와 Volume차이 복습
  * COPY: 로컬에 있는 파일을 도커 컨테이너에 복사
  * Volume: 로컬에 있는 파일을 도커컨테이너가 참조
  * Volume사용해서 어플리케이션 실행하는 법
    * `docker run -it -p 3000:3000 -v /usr/src/app/node_modules -v ${pwd}:/usr/src/app 도커아이디/docker-react-app`
      * -v /usr/src/app/node_modules: 호스트 디렉토리에 node_modules는 없기에 컨테이너에 매핑하지 말라는 뜻
      * -v $pwd:/usr/src/app: 호스트의 현재경로를 컨테이너의 /usr/src/app에 매핑
  * package.json 스크립트 수정:
    *  `"start": "WATCHPACK_POLLING=true react-scripts start",`
    *  Watchpack polling 옵션이 디폴트 false이고 이걸 true로 하면 리액트 코드의 변경 사항을 실시간 폴링해서 도커 볼륨으로 이벤트
### 리액트 앱 테스트하기
* 로컬에는 node_modules폴더가 없어 테스트 불가
* 도커환경에서 테스트
  * `docker run -it <이미지이름> npm run test`
* 테스트 소스도 추가 하면 바로 반영하는 방법
  * docker-compse.yml
    * Volume이용하기
    * test라는 이름의 컨테이너 추가
### 운영환경을 위한 Nginx
* 개발환경에서 리액트가 실행되는 과정
  * 리액트 컨테이너안에 개발서버가 있고 localhost:3000번의 브라우저와 통신
* 운영환경
  * 개발서버가 존재하지않기때문에 웹서버가 필요함
* 개발환경 서버와 운영환경 서버를 다르게 사용하는 이유
  * 개발서버
    * 소스 변경시 자동으로 전체 앱을 다시 빌드해서 변경 소스를 반영해주는 것 같이 개발 환경에 특화된 기능들이 있다.
  * 운영환경
    * 소스를 변경할때 다시 반영해줄 필요가 없으며 개발에 필요한 기능들이 필요하지 않기에 더 깔끔하고 빠른 Nginx같은 웹 서버를 사용
### 운영환경 도커 이미지를 위한 Dockerfile작성
* 개발환경 -> Dockerfile.dev
* 운영환경 -> Dockerfile
* `CMD` 부분에서 차이
  * 개발은 npm run start
  * 운영은 npm run build
    * 빌드파일 만든 다음 Nginx 도커 이미지를 이용한 Nginx시작
* 운영환경 단계
  * Builder Stage: 빌드파일 생성
  * Run Stage: Nginx를 가동하고 첫번째 단계에서 생성된 빌드 폴더의 파일들을 웹 브라우저의 요청에 따라 제공하여 준다.
* Dockerfile
  * FROM node:alpine as builder
    * 여기 FROM부터 다음 FOROM전까지는 모두 builder stage라는 것을 명시
  * run stage에서
    * FROM nginx : nginx를 위한 베이스이미지
    * COPY --from=builder /usr/src/app/build /usr/share/nginx/html
      * builder단계의 파일들을 /usr/share/nginx/html에 복사
* 이미지 생성후 앱 실행
  * docker run -p 8080:80 <이미지 이름>
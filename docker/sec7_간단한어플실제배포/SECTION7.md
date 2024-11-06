# 간단한 어플 실제 배포
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
### 도커 컴포즈로 좀 더 간단하게 앱 실행해보기
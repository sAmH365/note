### Package.json이 없다고 나오는 이유
* node베이스 이미지 ---> 임시 컨테이너
  * npm install -> 애플리케이션에 필요한 종속성 다운 -> package.json을 보고 명시된 종속성 설치 -> package.json은 컨테이너 안에 없기때문에 찾을 수 없다는 에러 발생
  * 베이스 이미지로 임시컨테이너로 만들때 베이스이미지 스냅샷 안에 package.json은 없다
* COPY 를 이용해서 package.json을 컨테이너 안에 너어준다.
  * `COPY package.json ./`
    * 로컬에 있는 package.json을 도커 컨테이너의 지정된 장소에 복사
### 생성한 이미지로 애플리케이션 실행시 접근이 안되는 이유(포트 매핑)
* 앞으로 컨테이너를 실행하기 위해 사용 할 명령어
  * `docker run -p 49160:8080 <이미지 이름>` 
### Working Directory명시해주기
* 도커 파일에 `WORKDIR`이라는 부분을 추가해 주어야한다.
* 이미지 안에서 애플리케이션 소스 코드를 갖고있을 디렉토리를 생성하는 것, 그리고 이 디렉토리가 애플리케이션에 working 디렉토리가 된다.
* wokring directory가 따로 있어야하는 이유?
  * 루트디렉토리에 기본 베이스 이미지의 파일들 +  도커파일에서 COPY한 파일도 섞이게된다
  * 원래 이미지에 있던 파일과 겹치면 사라지는 문제가 발생할수도 있다.
### 애플리케이션 소스 변경으로 다시 빌드하는 것에 대한 문제점
* 애플리케이션을 만들다보면 소스 코드를 계속 변경시켜줘야 하고 그에 따라 변경된 부분을 반영해야하는데, 도커를 이용해서 실시간으로 소스가 반영되게 되야한다.
* 현재까지의 방법
  * 도커파일작성 -> 빌드 -> 이미지생성 -> 이미지로 컨테이너생성후 앱 실행
  * `COPY ./ ./` 부분으로 인해서 소스를 변경시킨 부분은 server.js뿐인데 모든 node_module에 있는 종속성들까지 다시 다운받게 됨 + 이미지를 다시 생성하고 다시 컨테이너를 실행시켜주어야한다. --->>  비효율적
### 애플리케이션 소스 변경으로 재빌드시 효율적으로 하는법
* `RUN` 명령어 실행전에 `COPY package.json ./` 추가
  * 소스코드만 수정되었는데 종속성을 다시 받아오는부분을 불필요
  * RUN 명령어 실행전에 COPY package.json을 추가해 줌으로써 package.json에 변경을하지 않는 이상 모듈을 다시 받는 현상이 사라진다.


### Docker Volumes에 대하여
* COPY는 로컬에 있는 파일들을 도커 컨테이너 내부로 복사
* Volume은 도커컨테이너 내부에서 로컬에있는 파일들을 참조(매핑)
* 명령어
  * `docker run -p 9999:8080 -v /usr/src/app/node_modules -v %cd%:/usr/src/app <이미지 아이디>`
    *  `-v /usr/src/app/node_modules`: 호스트 디렉토리에 node_module은 없기에 컨테이너에 매핑하지 말라고 하는것
    *  `-v %cd%:/usr/src/app`: pwd경로에 있는 디렉토리 혹은 파일을 /usr/src/app 경로에서 참조
       *  : 콜론을 기준으로 왼쪽은 로컬머신, 오른쪽은 도커 컨테이너내부 경로
       *  호스트 경로를 지정하지 않으면 해당 볼륨을 데이터 볼륨으로 처리하고, 호스트의 파일 시스템과 독립적으로 데이터를 유지 -> 호스트의 node_modules디렉토리와 매핑하지 않으며, 컨테이너에 이미 존재하는 node_modules를 사용하거나 새로 생성하기만 한다.
*  이렇게 volume을 이용하면 빌드할때 소스를 마꾸더라도 바꾼 코드가 적용이 된다.
---
맥 명령어 : `-v $(pwd):/usr/src/app`
윈도우 명령어 : `-v ${pwd}:/usr/src/app` -> 파워쉘에서 실행
---
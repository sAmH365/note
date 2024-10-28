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
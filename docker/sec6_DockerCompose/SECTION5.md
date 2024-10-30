### Docker Compose
* 다중 컨테이너 도커 애플리케이션을 정의하고 실행하기 위한 도구
* node.js 환경에서 Redis 사용 방법
  * 먼저 redis-server 작동
  * redis 모듈 다운
  * 레디스 모듈을 받은 후 레디스 클라이언트를 생성하기 위해서 Redis에서 제공하는 createClient()함수를 이용해 `rdis.createClient()`로 레디스 클라이언트를 생성해준다.
  * 하지만 여기서 redis server가 작동하는 곳과 Node.js앱이 작동하는 곳이 다른 곳이라면 host 인자와 port인자를 명시해주어야한다.
    * 만약 레디스 서버가 작동하는곳이 redis-server.com 이라면 host옵션에 `"http://redis-server.com"`이라고 설정하면 된다.
    * 도커 환경에서 레디스 클라이언트 생성시
      * Docker Compose를 사용할 때 host옵션은 docker-compose.yml파일에 명시한 컨테이너 이름으로 설정하면 된다.
    * 레디스 기본 포트: 6379
### Docker Containers간 통신할때 나타나는 에러
* 우선 컨테이너를 하나하나씩 실행
* 레디스 클라이언트가 작동하려면 레디스 서버가 켜져있어야 하기 때문에 1.레디스 서버를 위한 컨테이너를 실행하고, 2.nodejs를 위한 컨테이너를 실행
* 이렇게 실행하면 Redis connection to redis-server:6379 failed - .... 에러 발생
  * 서로 다른 컨테이너에 있는데(node  ----   redis) 이렇게 컨테이너 사이에 아무런 설정없이 접근할 수 없기에 nodejs 앱에서 레디스 서버에 접근 할 수 없다.
  * 컨테이너 사이에 통신을 할수있게 해야함
  * 멀티 컨테이너 상황에서 쉽게 네트워크 연결을 시켜주기 위해서 `Docker Compose`를 사용하면 된다!
* `docker-compose up` : 도커 컴포즈 실행 명령어, 이미지가 없을때 이미지를 빌드하고 컨테이너 시작
  * `docker-compose up --build` : build옵션을 주면 처음부터 다시 빌드
* `docker-compose up -d` : 앱을 백그라운드에서 시작
### Docker compose 컨테이너 멈추기
* `docker-compose down`
* `docker-compose`
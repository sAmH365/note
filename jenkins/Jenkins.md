## 젠킨스 기본 개념
* Java Runtime 환경에서 동작
* AWS 배포, 테스트, 도커 빌드 등 할게 너무 많으니 각각의 컴포넌트들을 하나의 플러그인으로 모듈화를 해놓았는데 이를 활용하여 사용하면 된다.
* 가장 핵심적인 파이프라인, 시크릿 키마저도 플러그인으로 동작시킬 수 있다.
* 즉 일련의 자동화 작업의 순서들의 집합인 Pipeline을 통해 CI/CD 파이프라인을 구축한다.
## 젠킨스 대표 플러그인
* Credentials Plugin
  * 중요한 정보들을 저장해주는 플러그인
  * Jenkins는 그냥 단지 서버이기 때문에 배포에 필요한 각종 리소스에 접근하기 위해서는 여러 가지 중요 정보들을 저장하고 있어야 한다.
  * 리소스에는 클라우드 리소스 혹은 베어메탈에 대한 ssh 접근 등을 의미한다.
  * 베어메탈이란 어떠한 소프트웨어도 담겨 있지 않은 하드웨어를 가리킨다.
  * AWS token, Git access token, secret key, ssh(username, password)등의 정보들을 저장할 때 사용한다.
  * 젠킨스는 Private Network에 떠있기 때문에 보안상 너무 걱정하지 않아도 된다.
  * Git Plugin => jenkins에서 git에 대한 소스코드를 긁어와서 빌드할 수 있도록 도와줌
  * Pipeline => 핵심 기능인 파이프라인마저도 플러그인이다.
  * Docker plugin and Docker Pipeline => Docker agent를 사용하고 jenkins에서 도커를 사용하기 위한 플러그인
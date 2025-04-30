## 카프카
* 이벤트 브로커
* 카프카 서버(=카프카 브로커가 실행되고 있는 서버)
  * server.properties = 설정파일
<details>
<summary>토픽</summary>

  * 메시지들이 저장되는 이름 붙은 공간
    * 예시
      * 'logs': 로그 메시지 저장
      * 'order-created': 주문 생성 이벤트 저장
  * 카프카에서 모든 메시지는 토픽 단위로 발행/구독
</details>


<details>
<summary>파티션</summary>

  * 토픽의 물리적 분할 단위
  * 각 파티션은 메시지를 순서대로 저장
  * 파티션을 나누는 이유
    * 병렬 처리
    * 성능 향상
    * 확장성 확보
</details>


### 카프카 도커 컴포즈파일
<details>
<summary>docker-compose.yml</summary>

```docker
version: '2'

networks:
  app-tier:
    driver: bridge

services:
  kafka:
    image: 'bitnami/kafka:latest'
    networks:
      - app-tier
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
  kafka-producer:
    image: 'udada-kafka-service'
    networks:
      - app-tier
```

* 카프카 브로커용으로 작성됨
* `KAFKA_CFG_LISTENERS` : 카프카 브로커가 메시지를 받는 포트를 설정함
* `CONTROLLER`: 카프카 클러스터에서 컨트롤러 역할을 맡는 리스너를 설정
  * 컨드롤러
    * 클러스터 내에서 하나만 존재
    * 파티션 리더 할당
    * 클러스터 상태 관리하는 역할
    * 각 브로커가 컨트롤러를 참조
  ### 전체 흐름
  1. 도커 컴포즈 파일 실행
  2. 카프카 브로커 실행(메시지 큐 역할, 9092 포트 리스닝)
  3. 프로듀서와 컨슈머 모두 9092 포트를 사용해 메시지를 주고받음
  * 컨트롤러는 9093 포트를 사용해서 카프카 크러스터 관리
</details>

## 카프카 명령어
* 토픽만들기
  * `kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092`
* 토픽 목록 확인
  * `kafka-topics.sh --bootstrap-server localhost:9092 --list`
* 토픽 삭제
  * `kafka-topics.sh --delete --bootstrap-server 127.0.0.1:9094 --topic app-logs`
* 특정 토픽 상세 정보 조회
  * `kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic <토픽명>`
* 메시지 생성
  * `kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092`
* 현재 컨슈머 그룹 확인
  * `kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list`
* 컨슈머 그룹 이름 지정하기
  * `kafka-console-consumer.sh --topic quickstart-events --bootstrap-server localhost:9092 --group my-consumer-group`
* 컨슈머 그룹의 오프셋 확인
  * `kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group <consumer-group-name>`

  <details>
  <summary>컨슈머 오프셋 초기화</summary>

  ```
  kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
    --group my-consumer-group \
    --reset-offsets --to-earliest --execute 
    
    
    // 오프셋 초기화전 미리 확인 명령어
  kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-consumer-group \
  --reset-offsets --to-earliest --dry-run


  kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
    --group my-consumer-group \
    --topic quickstart-events \
    --reset-offsets --to-earliest --dry-run
  ```
  </details>

* 카프카 스프링부트 실행 명령어 (LOG PATH환경변수 주입)
  * `java -DLOG_FILE_PATH=/mnt/nas/before-filter -jar udada-logconsumer-service-0.0.1-SNAPSHOT.jar --spring.profiles.active=production`


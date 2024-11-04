* Producer --Pulish--> Broker  --Consume--> Consumer
  * 비동기 작업에 있어 큐를 사용하려면 중간에 메시지 브로커 개념이 존재
  * 메시지 브로커에 RabbitMQ, Kafka등이 대표적
* 대부분의 메시지큐는 프로듀서가 있고, 해당 프로듀서가 브로커로 메시지를 발행하면, 적절한 컨슈머가 해당 메시지를 구독하는 구조
* RabbitMQ는 프로듀싱하는 과정에서 추가 개념 존재
  * Producer는 Message를 Exchange에게 보낸다
    * Exchange를 생성할때 Exchange의 Type을 정해야 함
  * Exchange는 Routing Key를 사용하여 적절한 Queue로 Routing을 진행
    * Routing은 Exchange Type에 따라 전략이 바뀐다
  * Exchange - Queue와 Binding이 완료
    * Message 속성에 따라 적절한 Queue로 Routing이 된다
  * Message는 Consumer가 소비할때까지 Queue에 대기
    * Consumer는 Message를 소비
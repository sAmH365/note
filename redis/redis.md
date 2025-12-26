# Redis

* [redis 수업자료](https://picturesque-staircase-f6e.notion.site/redis-773bcaf9230047fdb12a874d216f1345)
* 레디스는 싱글스레드 기반
* 레디스를 구현한 라이브러리의 사용법을 실무에서는 사용하게 됨, 여기서는 이런 기능이 있구나 정도만
* 레디스는 16개의 DB를 가짐 (0 ~ 15)
  * select index
  * `select 3`

<br>

# String 자료구조
* set을 통해 key:value 세팅
  * `set user:email:1 hong1@naver.com`
* db내 모든 키 조회
  * keys *
* 키 중복이 있다면 값 저장 안하기 (nx : not exist)
  * `set user:email:2 hong2@naver.com nx`
* 만료시간 설정 (ex : expration, 초단위)
  * `set user:email:3 hong3@naver.com ex 10`
* 삭제
  * `del user:email:3`
<details>
<summary>redis 활용</summary>

## redis 활용 : 사용자 인증정보 저장(ex - refresh token)
  * `set user:email:1 hong33@naver.com ex 10000` 
## redis 활용 : 좋아요기능 구현
* RDB에서 관리할 경우 동시성 이슈 발생 할 수도
* `set likes:posting:1 0`
* `incr likes:posting:1` -> 특정 key값의 value를 1만큼 증가
* `decr likes:posting:1` -> 특정 key값의 value를 1만큼 감소 
* `get likes:posting:1`

## redis 활용 : 재고관리
* `set stocks:product:1 100`
* `decr stocks:product:1 100`
* `get stocks:product:1`

## redis 활용 : 캐시 기능 구현
`set posting:1 "{\"title\": \"hello java\", \"contents\": \"hello java is ...\", \"author_email\": \"hong1@naver.com\"}" ex 1000`
</details>

<br>

# LIST 자료구조
* deque 자료구조
  * 맨 앞 or 맨 뒤 데이터 삽입 가능
* 데이터 삽입
  * 명령어
    * lpush: 데이터를 왼쪽 끝에 삽입
    * rpush: 데이터를 오른쪽 끝에 삽입
    * lpop: 데이터를 왼쪽에서 꺼내기
    * rpop: 데이터를 오른쪽에서 꺼내기
    * `lpush honglist hong1`
    * `lpush honglist hong2`
    * `rpush honglist hong3`
* list 조회
  * -1 은 리스트의 끝자리를 의미, -2는 끝에서 2번째를 의미
  * lrange: 데이터 구간 조회
    * `lrange honglist 0 0` : 처음 값만 조회
    * `lrange honglist -1 -1`: 마지막 값만 조회
    * `lrange honglist 0 -1` : 처음부터 마지막 까지
* 데이터 개수 조회
  * `llen honglist`
* ttl 적용
  * `expire hongs 20`
* ttl 조회
  * `ttl hongs`
<details>
<summary>redis 활용</summary>

## redis 활용 : 최근 방문한 페이지, 최근 조회한 상품목록
  * `rpush mypages www.naver.com` 
  * `rpush mypages www.google.com` 
  * `rpush mypages www.daum.net` 
  * `rpush mypages www.chatgpt.com` 
  * 최근 방문한 페이지 3개만 보여주기
    * `lrange mypages -3 -1`
</details>

<br>

# SET 자료구조
* 중복없음, 순서없음
* 데이터 삽입
  * `sadd memberlist member1`
  * `sadd memberlist member2`
  * `sadd memberlist member1`
* set 조회
  * `smembers memberlist`
* set 요소 개수 조회
  * `scard memberlist`
* set 요소 제거
  * `srem memberlist member2`
* 특정 요소가 set안에 들어있는지 확인
  * `sismember memberlist member1`
<details>
<summary>redis 활용</summary>

## redis 활용 : 좋아요 기능, 매일 방문자수 계산
  * `sadd likes:posting:1 member1`
  * `sadd likes:posting:1 member2`
  * `sadd likes:posting:1 member1`
  * 좋아요 개수
    * `scard likes:posting:1`
  * 좋아요 눌렀는지 안눌렀는지 확인
    * `sismember likes:posting:1 member1`
</details>

<br>

# ZSET(정렬된 SET)

# hashes
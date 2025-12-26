# Redis

* [redis 수업자료](https://picturesque-staircase-f6e.notion.site/redis-773bcaf9230047fdb12a874d216f1345)
* 레디스는 싱글스레드 기반
* 레디스를 구현한 라이브러리의 사용법을 실무에서는 사용하게 됨, 여기서는 이런 기능이 있구나 정도만

<br>

## 명령어
* 레디스는 16개의 DB를 가짐 (0 ~ 15)
  * select index
  * `select 3`
* 일반적인 String 구조
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
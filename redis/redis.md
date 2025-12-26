* [redis 수업자료](https://picturesque-staircase-f6e.notion.site/redis-773bcaf9230047fdb12a874d216f1345)

<br>

# 명령어
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

# redis 활용 : 사용자 인증정보 저장(ex - refresh token)
  * `set user:email:1 hong33@naver.com ex 10000` 
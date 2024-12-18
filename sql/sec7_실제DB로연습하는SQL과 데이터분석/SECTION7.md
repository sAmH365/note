* Sakila database sql
  * 개인정보는 제외된 회사가 사용하던 실제 데이터
  * 연습하기에 좋음

# SQL SELECT 문법1: LIMIT
* 결과중 일부만 데이터 가져오기
  * 예) 결과중 처음부터 10개만 가져오기
      * `SELECT * FROM 테이블이름 LIMIT 10` (테이블 데이터 중 최상위에 있는 10개의 데이터만 가져오기)
      * SELECT * FROM 테이블이름 WHERE 조건문 LIMIT 1 (특정 조건에 맞는 데이터 중 최상위에 있는 1개의 데이터만 가져오기
* 특정 테이블의 컬럼과 컬럼값 확인을 위해 `LIMIT 1`을 많이 사용함
  * `SELECT * FROM film LIMIT 1;`

# SQL SELECT 문법2: COUNT
* 결과 수 세기(데이터 행의 수 세기)
  * `SELECT COUNT(*) FROM 테이블 이름`: 테이블 전체 데이터 수 세기
  * `SELECT COUNT(*) FROM 테이블 이름 where 조건문`: 조건에 맞는 테이블 데이터 수 세기

# SQL SELECT 문법3: DISTINCT
* 특정 컬럼값 출력시 중복값을 없앰
  * `SELECT DISTINCT 컬럼명 FROM 테이블이름`: 특정 컬럼에 들어가 있는 컬럼값 종류 확인하기
  * * `SELECT DISTINCT 컬럼명 FROM 테이블이름 WHERE 조건문`: 특정 조건에 맞는, 특정 컬럼에 들어가 있는 컬럼값 종류 확인하기

#### 참고
* 각 컬럼값 이해를 위한 배경 지식이 필요할 때가 있음(이것을 도메인이라고 이야기함)
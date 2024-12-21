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

# SQL SELECT 문법4: SUM, AVG, MAX, MIN
* 수치형 데이터에 한해서 유의미한 결과 출력 가능
* 컬럼값 분석하기
  * `SELECT SUM(컬럼명) FROM 테이블이름` (특정 컬럼에 들어가 있는 컬럼값의 합계 구하기)
  * `SELECT AVG(컬럼명) FROM 테이블이름 WHERE 조건문` (특정 조건에 맞는, 특정 컬럼에 들어가 있는 컬럼값의 평균 구하기)

#### 참고
* 조회할때 단계별로 진행
  1. 테이블 컬럼 확인하기
  2. 테이블의 컬럼에서 필요한 정보 추출

# SQL SELECT 문법5: GROUP BY
* 특정 컬럼값을 기반으로 그룹핑하기
  * `SELECT rating FROM film GROUP BY rating` : film테이블의 rating값을 그룹핑해라 -> rating값별로 출력하므로, rating값 종류를 확인할 수 있음
  * `SELECT COUNT(*) FROM film GROUP BY rating` : 각 rating값 종류별로, 몇 개의 데이터가 있는지 확인
  * `SELECT COUNT(*) FROM film WHERE 조건문 GROUP BY rating` : 특정 조건에 맞는 데이터중 rating 값 종류별로, 몇 개의 데이터가 있는지 확인

# SQL SELECT 문법6: ORDER BY
* 특정 컬럼값을 기준으로 데이터 정렬
  * `SELECT * FROM film ORDER BY rating DESC;`

#### SQL 조건 순서
1. WHERE
2. GROUP BY
3. ORDER BY
4. LIMIT

# SQL SELECT 문법7: AS
* 표시할 컬럼명도 다르게 하기
  * `SELECT COUNT(*) AS total FROM film`: (film의 전체 데이터 갯수를 COUNT(*) 로 표시하지 말고, total 로표시하기)
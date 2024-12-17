# MySQL
* mysql은 자기 설정정보도 db로 관리 -> 처음 실행하면 디비 하나는 만들어져 있음

# 테이블 선언을 위한 숫자 타입 이해하기
* 숫자형 데이터 타입
  * TINYINT
  * SMALLINT
  * MEDIUMINT
  * INT
  * BIGDECIMAL
* UNSIGEND
  * 양수 부분만 사용
* AUTO_INCREMENT
  * 해당 테이블은 자동으로 숫자가 1씩 증가
  * 하나만 지정 가능

# 테이블 선언을 위한 문자/시간 타입 이해하기
* 문자형 데이터 타입
  * CHAR(n)
    * 고정 길이 데이터 타입 (n <= 255)
  * VARCHAR(n)
    * 가변 길이 데이터 타입 (n <= 65535)
    * 수정할 경우 저장된 데이터 공간을 밀어야되서 비효율 발생할 수 있음
  * TINYTEXT(n) 
    * (n <= 255)
  * TEXT(n)
    * (n <= 65535)
  * MEDIUMTEXT(n) 
    * (n <= 16777215)
  * LONGTEXT(n)
    * (n <= 4294967295)
* 시간 타입 컬럼
  * DATE
    * 날짜(YYYY-MM-DD) 형태의 기간 표현 데이터 타입(3byte)
  * TIME
    * 시간 (hh:mm:ss) 형태의 기간 표현 데이터 타입(3byte)
  * DATETIME
    * 날짜와 시간 (YYYY-MM-DD hh:mm:ss) 형태
    * 10001-01-01 00:00:00 ~ 9999-12-31 23:59:59 까지 값 표현
  * TIMESTAMP
    * 1970-01-01 00:00:00 이후부터 시스템 현재 시간까지의 지난 시간을 초로 환산하여 숫자로 표현
  * YEAR
    * YEAR(n)과 같은 형식으로 사용
    * n은 2와 4 지정 가능
    * 2인 경우 70에서 69까지
    * 4인경우는 1970 에서 2069까지 표시
# SQL로 테이블 조회/수정/삭제 문법 이해하기
* 데이터 베이스 사용
  * `use 테이블명`
* 테이블 조회
  * `show tables;`
  * `desc mytable;`
* 테이블 구조 수정
  * 테이블 컬럼 추가
    * `ALTER TABLE [테이블명] ADD COLUMN [추가할 컬럼명] [추가할 컬럼 데이터형]`
      * `ALTER TABLE mytable ADD COLUMN col1 int not null`
  * 테이블 컬럼 타입 변경
    * `ALTER TABLE [테이블명] MODIFY COLUMN [변경할 컬럼명] [변경할 컬럼 타입]`
      * `ALTER TABLE mytable MODIFIY COLUMN col1 varchar(20);`
  * 테이블 컬럼 이름 변경
    * `ALTER TABLE [테이블명] CHANGE COLUMN [기존 컬럼명] [변경할 컬럼명] [변경할 컬럼 타입]`
      * `ALTER TABLE mytable CHANGE COLUMN col1 col2 varchar(50) not null;`
  * 테이블 컬럼 삭제
    * `ALTER TABLE [테이블명] DROP COLUMN [삭제할 컬럼명]`
      * `ALTER TABLE mytable DROP COLUMN col1;`


# 실습
실습 - 테이블 생성, 조회 <br>
다음과 같이 데이터베이스 및 테이블을 생성한 후, 연습문제를 풀어보세요.

```sql
mysql> CREATE DATABASE dave;
mysql> USE dave;

mysql> SHOW TABLES;
+----------------+
| Tables_in_dave |
+----------------+
| mytable        |
+----------------+

mysql> desc mytable;<br>

+-------------+------------------+------+-----+---------+----------------+
| Field       | Type             | Null | Key | Default | Extra          |
+-------------+------------------+------+-----+---------+----------------+
| id          | int unsigned     | NO   | PRI | NULL    | auto_increment |
| name        | varchar(50)      | NO   |     | NULL    |                |
| modelnumber | varchar(15)      | NO   |     | NULL    |                |
| series      | varchar(30)      | NO   |     | NULL    |                |
+-------------+------------------+------+-----+---------+----------------+

## 연습문제1: 다음과 같이 보이도록 테이블 컬럼을 수정하시오
mysql> desc mytable;<br>
+------------+------------------+------+-----+---------+----------------+
| Field      | Type             | Null | Key | Default | Extra          |
+------------+------------------+------+-----+---------+----------------+
| id         | int     unsigned | NO   | PRI | NULL    | auto_increment |
| name       | varchar(20)      | NO   |     | NULL    |                |
| model_num  | varchar(10)      | NO   |     | NULL    |                |
| model_type | varchar(10)      | NO   |     | NULL    |                |
+------------+------------------+------+-----+---------+----------------+

## 연습문제2 - 위 테이블을 삭제한 후, 연습문제1과 같은 컬럼을 가진 테이블을 생성하시오 (테이블명은 model_info 로 하시오)
```
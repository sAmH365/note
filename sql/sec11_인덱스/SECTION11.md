# MySqL Index
## 인덱스
* 데이터베이스 분야에 있어서 테이블에 대한 동작속도를 높여주는 자료구조
* 어떤 데이터를 인덱스로 만드느냐에 따라 방대한 데이터의 경우 성능에 큰 영향을 미칠 수 있음

## 인덱스의 종류
* 클러스터형 인덱스: 영어 사전과 같은 형태로 데이터를 재정렬하여 저장한다고 생각하면 됨
  * 테이블의 데이터를 실제로 재정렬하여 디스크에 저장
  * 테이블에 PRIMARY KEY로 정의한 컬럼이 있을경우, 자동생성
  * 한 테이블당 하나의 클러스터형 인덱스만 가질 수 있음
* 보조 인덱스: 데이터는 그대로 두고, 일반 책 뒤에 있는 <찾아보기>와 같은 형태가 만들어진다고 생각하면 됨
  * 클러스터형 인덱스와는 달리 데이터를 디스크에 재정렬하지 않고, 각 데이터의 위치만 빠르게 찾을 수 있는 구조로 구성
  * 보조 인덱스를 저장하는데 필요한 디스크 공간은 보통 테이블을 저장하는 데 필요한 디스크 공간보다 작음
    * 인덱스는 키-필드만 가지고 있고, 나머지 세부 테이블 컬럼 정보는 가지고 있지 않기 때문
  

#### userTbl 테이블 생성
```sql
CREATE TABLE userTbl (
  userID CHAR(8) NOT NULL PRIMARY KEY,
  name  
VARCHAR(10) NOT NULL,
  birthYear INT NOT NULL,
  addr  
CHAR(2) NOT NULL,
  mobile1 CHAR(3),
  mobile2 CHAR(8),
  height SMALLINT,
  mDate  
);

CREATE TABLE buyTbl (
  num INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  userID CHAR(8) NOT NULL,
  prodName CHAR(4),
  groupName CHAR(4),
  price INT NOT NULL,
  amount  SMALLINT NOT NULL,
  FOREIGN KEY (userID) REFERENCES userTbl(userID)
);
```

#### 인덱스 확인
* `SHOW INDEX FROM 테이블명;`
* Key_name이 PRIMARY로 된 것은 클러스터형 인덱스를 의미
* (참고) 주요 인덱스 컬럼
  * Table: 테이블명
  * Non_unique: 1이면 중복 허용, 0이면 중복 x
  * Key_name: 인덱스명, PK라면 항상 인덱스명은 PRIMARY
  * Seq_in_index: 인덱스에서 컬럼의 시퀀스 번호, 1부터 시작

#### 참고: 테이블변경(제약조건 추가하기)
* `ALTER TABLE 테이블명 ADD [CONSTAINT 제약조건명] UNIQUE(컬럼명);`

#### 참고: UNIQUE 제약을 넣으면, 보조테이블이 만들어짐
* `SHOW IDEX FROM userTbl`


## 인덱스 생성 및 삭제
### 1. 생성된 테이블에 인덱스 추가 하기
#### 기본 문법
* `CREATE INDEX 인덱스명 ON 테이블명 (col1, col2, ...);`
* `ALTER TABLE 테이블명 ADD INDEX 인덱스명 (col1, col2, ...);`
#### 예제 (CREATE INDEX 사용)
* `CREATE INDEX idx_name ON userTbl (name);`

#### 연습문제1: groupName 으로 인덱스 추가하고 확인해보기
#### 연습문제2: prodName 으로 인덱스 추가하고 확인해보기

### 2. 테이블 생성하며 인덱스도 함께 만들기
#### 기본 문법
```sql
DROP DATABASE IF EXISTS sqlDB;
 CREATE DATABASE sqlDB;
 USE sqlDB;
 DROP TABLE IF EXISTS userTbl;
 CREATE TABLE userTbl (
  userID CHAR(8) NOT NULL PRIMARY KEY,
  name VARCHAR(10) UNIQUE NOT NULL,
  birthYear INT NOT NULL,
  addr CHAR(2) NOT NULL,
  mobile1 CHAR(3),
  mobile2 CHAR(8),
  height SMALLINT,
  mDate  
DATE,
 UNIQUE INDEX idx_userTbl_name (userID),
 INDEX idx_userTbl_addr (addr)
 );
```
* `UNIQUE INDEX idx_uerTbl_name(col_name)`
  * col_name에대해 idx_uerTbl_name으로 새로운 인덱스를 만듦
  * col_name은 중복값을 허용하지 않는 설정이 되어있어야함
* `INDEX idx_userTbl_addr(addr)`
  * addr컬럼에 대해 idx_userTbl_addr이름으로 인덱스 생성

### 인덱스 삭제
#### 기본문법
* `ALTER TABLE 테이블명 DROP INDEX 인덱스명;`

#### 연습문제1: PRIMARY KEY 놔두고 모든 인덱스 삭제하기

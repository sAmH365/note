<details>
  <summary>FOREIGN KEY 생성해보기</summary>

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
    mDate DATE,
    UNIQUE INDEX idx_userTbl_name (name),
    INDEX idx_userTbl_addr (addr)
    );

    DROP TABLE IF EXISTS buyTbl;
    CREATE TABLE buyTbl (
    num INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userID CHAR(8) NOT NULL,
    prodName CHAR(4),
    groupName CHAR(4),
    price INT NOT NULL,
    amount SMALLINT NOT NULL,
    FOREIGN KEY (userID) REFERENCES userTbl(userID)
    );
  ```
</details>

# FOREIGN KEY
* 데이터의 정합성을 위해 제약사항을 건다.

# GROUP BY와 HAVING
* HAVING절은 집계함수를 가지고 조건비교를 할 때 사용단다.
* HAVING절은 GROUP BY와 함께 사용
  * WHERE 절에 집계합수 사용하면 문법
* 예시
  * `SELECT provider FROM items GROUP BY provider HAVING COUNT(*) >=100;`

### HAVING 절을 포함한 복합 검색
```sql
SELECT provider, COUNT(*)
FROM items
WHERE provider != '스마일배송'  -- 스마일배송은 제외
GROUP BY provider  -- 판매처별로 그룹
HAVING COUNT(*) > 100
ORDER BY COUNT(*) DESC;
```
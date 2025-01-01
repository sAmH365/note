# 데이터 생성
1. 테이블 전체 컬럼에 대응하는 값을 모두 넣기
   * `INSERT INTO 테이블명 VALUES(값1, 값2, ...)`
2. 테이블 특정 컬럼에 대응하는 값만 넣기(지정되지 않은 컬럼은 디폴트값 또는 Null값이 들어감) 

# 실습 - 데이터 생성(입력)
```sql
1. 학생 정보를 저장하는 students 테이블을 생성
mysql> CREATE DATABASE school;
mysql> USE school;
mysql> CREATE TABLE students (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT UNSIGNED,
    grade VARCHAR(10)
)
2. 데이터 삽입 예시:
mysql> INSERT INTO students VALUES(1, '홍길동', 15, '9학년');
mysql> INSERT INTO students (name, age, grade) VALUES('김철수', 16, '10학년')
3. 데이터 확인: 데이터 읽기(검색) 문법 참고
mysql> SELECT * FROM students;
+----+----------+------+--------+
| id | name     | age  | grade  |
+----+----------+------+--------+
|  1 | 홍길동     |   15 | 9학년   |
|  2 | 김철수     |   16 | 10학년  |
+----+----------+------+--------+
4. students 테이블에 아래의 학생 데이터를 추가하세요
이름: 이영희, 나이: 14, 학년: 8학년
이름: 박민수, 나이: 17, 학년: 11학년
mysql> INSERT INTO students (name, age, grade) VALUES('이영희', 14, '8학년');
mysql> INSERT INTO students (name, age, grade) VALUES('박민수', 17, '11학년')
5. 모든 학생의 정보를 조회하세요.
mysql> SELECT * FROM students;
```

# 데이터 읽기(검색)
* `SELECT * FROM 테이블명`;
* `SELECT col1, col2 FROM 테이블명`;
* 이름이 두 글자인 학생 조회
  * `SELECT * FROM students WHERE name LIKE '__'`
* 이름이 '수'로 끝나는 학생 조회
  * `SELECT * FROM students WHERE name like '__수';`

# 데이터 수정
* 수정
  * `UPDATE 테이블명 SET 컬럼명1='값1', 컬럼명2='값2'.... WHERE 조건식`
    * `UPDATE students SET age = 18 WHERE name = '박민수';`
    * `UPDATE students SET name='DAVE', age = 18 WHERE name = '박민수';`
* 삭제
  * `DELETE FROM 테이블명 WHERE 조건`
    * `DELETE FROM students WHERE name = '김철수';`
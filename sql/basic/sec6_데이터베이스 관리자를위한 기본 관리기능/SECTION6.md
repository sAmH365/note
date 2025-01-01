# SQL DCL(Data Control Language) 이해 및 참고
* SQL DCL 명령은 MySQL관리자(데이터베이스 관리자)를 위한 명령

# MySQL접속하기
* `mysql -u 사용자이름 -p`
  
# MySQL 사용자 관리
* MySQL에서 사용자 계정을 관리하는 기본 명령어
### 사용자 확인
* 현재 MySQL에 등록된 사용자 목록을 확인
  * `use mysql` -> `SELECT host, user FROM user`
  
### 사용자 추가
* 로컬에서만 접속 가능한 사용자 생성
  * `CREATE USER '사용자아이디'@'localhost' IDENTIFIED BY '비밀번호';`
* 모든 호스트에서 접속 가능한 사용자 생성
  * `CREATE USER '사용자아이디'@% IDENTIFIED BY '비밀번호';`

### 사용자 비밀번호 변경
* `SET PASSWORD FOR '사용자아이디'@'호스트' = '신규비밀번호';`

### 사용자 삭제
* `DROP USER '유저아이디'@'호스트';`

# MySQL 접속권한 설정

### 권한확인
* `SHOW GRANTS FOR '유저아이디'@'호스트';`
  * 결과로 `GRANT USAGE ON *.* TO '사용자아이디'@'호스트'`
    * *.*: 첫번째 * -> 데이터베이스, 두번째 * -> 테이블
    * 모든 데이터베이스에 모든 테이블의권한을 가지고 있음

### 접속 허용 설정
* 로컬에서만 접속허용
  * `GRANT ALL ON 데이터베이스.테이블 TO '사용자아이디'@'localhost';`
* 특정권한만 허용
  * `GRANT SELECT, UPDATE ON 데이터베이스.테이블 TO '사용자아이디'@'호스트';`

## 권한 변경후 변경사항 적용
* `FLUSH PRIVILEGES;`
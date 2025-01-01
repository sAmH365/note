# SQL 함수
* SQL함수는 값을 반환하는 내장메소드
  * 문자열 조작, 날짜, 시간 처리 등

## 1. 문자열 함수
* `LENGTH(string)`: 문자열 길이 반환
* `UPPER(string)`: 문자열 대문자 반환
* `LOWER(string)`: 문자열 소문자 반환
* `CONCAT(string1, string2, ...)`: 문자열 합치기
* `SUBSTRING(string, start, lenget)`: 문자열에서 부분문자열 추출
```sql
SELECT SUBSTRING(description, 2, 10) AS short_description
FROM film
LIMIT 10;

-> description 컬럼의 두번째에서 10개를 추출
```

```sql
# 연습문제
-- 1. film 테이블에서 영화 제목( title )의 길이가 15자인 영화들을 찾아주세요.
  SELECT f.title FROM film f WHERE LENGTH(f.title) = 15;

-- 2. actor 테이블에서 첫 번째 이름( first_name )이 소문자로 'john'인 배우들의 전체 이름을 대문자로 출력해주세요.
  SELECT concat(a.first_name, ' ', a.last_name) FROM actor a
  WHERE LOWER(a.first_name) = 'john';

-- 3. film 테이블에서 description 의 3번째 글자부터 6글자가 'Action'인 영화의 제목을 찾아주세요.
  SELECT f.title, f.description FROM film f 
  WHERE SUBSTRING(description, 3, 6) = 'Action'; 

4. rental 테이블에서 대여 시작 날짜( rental_date )가 2006년 1월 1일 이후인 모든 대여에 대해, 예상 반납 날짜를
대여 날짜로부터 5일 뒤로 설정해주세요.
5. payment 테이블에서 결제 금액( amount )이 5 이하인 모든 결제에 대해, 절대값을 계산하여 출력해주세요.
6. film 테이블에서 영화 길이( length )가 120분 이상인 모든 영화에 대해, 영화 길이의 제곱근을 계산해주세요.
7. payment 테이블에서 결제 금액( amount )을 소수점 첫 번째 자리에서 반올림하여 출력해주세요.
```
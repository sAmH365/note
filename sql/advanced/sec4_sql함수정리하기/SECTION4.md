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

## 2. 날짜/시간관련 함수
* `NOT()` : 현재 날짜와 시간 반환
* `CURDATE(), CURTIME()` : 현재 날짜, 현재시간 반환
* `DATE_ADD(date, INTERVAL unit)` : 날짜에 간격을 추가
  * `SELECT rental_date, DATE_ADD(rental_date,, INTERVAL 3 DAY) from rental`:rental_date에 3일추가
    * YEAR, MONTH, DAY, HOUR, MINUTE, SECOND 적용 가능
* `DATE_SUB(date, INTERVAL unit)` : 날짜에서 간격을 뺀다
  * `SELECT rental_date, DATE_SUB(rental_date,, INTERVAL 3 DAY) from rental` : rental_date에 3일 뺌
* `EXTRACT(MONTH, FROM payment_date) .... ` : 월 추출, (연도, 일 , 시, 분, 초 추출도 가능)
* `YEAR(), MONTH(), DAY(), HOUR(), MINUTE(), SECOND()`: 연도, 월, 일, 시, 분, 초 추출
* `DAYOFWEEK(payment_date)`: 주어진날짜가 일요일부터 시작하여 몇 번째 요일인지 반환
  * 일요일 = 1, 월요일 = 2, 화요일 = 3, 수요일 = 4, 목요일 = 5... 토요일 = 7
* `TIMESTAMPDIFF(unit, start_datetime, end_datetime)`
  * unit: 반환할 시간 단위,
    * `SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR`
* `SELECT TIMESTAMPDIFF(DAY, rental_date, return_date) AS rental_days FROM rental LIMIT 5`
  * 대여일(rental_date)과 반납일(return_date)사이의 차이를 일(`DAY`) 단위로 계산
* `DATE_FORMAT(date, format)`
  * date: 날짜, 시간 컬럼 또는 값
  * format: 변환할 형식
    * `%Y`: 4자리연도 (2024)
    * `%y`: 연도의 마지막 두자리 (24)
    * `%M`: 영문 월 이름(January)
    * `%m`: 월 두자리 숫자(01 ~ 12)
    * `%c`: 월 한자리 숫자(1 ~ 12)
    * `%D`: 일을 2자리숫자+영문접미사로 표시(1st, 25th)
    * `%d`: 일을 두 자리 숫자로 표시(01 ~ 31)
    * `%H`: 시간 24시간 형식의 두 자리 숫자로 표시 (00 ~ 23)
    * `%h`: 시간을 12시간 형식의 두 자리 숫자로 표시(01 ~ 12) 
    * `%l`: 시간을 12시간 형식의 한 자리 또는 두자리 (1 ~ 12) 
    * `%i`: 분을 두 자리 숫자로 표현(00 ~ 59) 
    * `%s`: 초를 두 자리 숫자로 표현(00 ~ 59)
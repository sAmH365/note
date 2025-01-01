# JOIN
* JOIN을 하면 두개의 테이블을 합쳐서 새로운 테이블을 만든다는 개념 -> 새로만들어진 테이블을 기반으로 조건문등과같은 추가 처리를 할 수 있다.
* 종류
  1. INNER JOIN (default -> inner 생략가능)
    * 두 테이블에 해당 필드값이 매칭되는 레코드만 가져옴
  2. OUTER JOIN
    * LEFT OUTER JOIN
      * 왼쪽 테이블에서 모든 레코드와 함께, 오른쪽 테이블에 왼쪽 테이블 레코드와 매칭되는 레코드를 붙여서 가져옴
    * RIGHT OUTER JOIN
      * 오른쪽 테이블에서 모든 레코드와 함께, 왼쪽 테이블에 오른쪽 레코드와 매칭되는 레코드를 붙여서 가져옴

### INNER JOIN 연습문제
<details>
<summary>연습문제</summary>

```sql
-- 1. 전체 베스트상품(ALL 메인 카테고리)에서 판매자별 베스트상품 갯수 출력해보기
select provider, count(*) from items I
inner join ranking R 
on I.item_code = R.item_code
where R.main_category = 'ALL'
group by provider;

-- 2. 메인 카테고리가 패션의류인 서브 카테고리 포함, 패션의류 전체 베스트상품에서 판매자별 베스트 상품 갯수가 5이상인 판매자와 베스트상품 갯수 출력해보기
select provider, count(*) as 'item_count' from items I
inner join ranking R 
on I.item_code = R.item_code
where R.main_category = '패션의류'
group by provider
HAVING item_count >= 5;

-- 3. 메인 카테고리가 신발/잡화인 서브 카테고리 포함, 전체 베스트상품에서 판매자별 베스트상품 갯
-- 수가 10이상인 판매자와 베스트상품 갯수를 베스트상품 갯수 순으로 출력해보기
SELECT provider, COUNT(*) as item_count FROM items I
INNER JOIN ranking R 
ON I.item_code = R.item_code
WHERE R.main_category = '신발/잡화'
GROUP BY provider
HAVING item_count >=10
ORDER BY item_count DESC;

-- 4. 메인 카테고리가 화장품/헤어인 서브 카테고리 포함, 전체 베스트상품의 평균, 최대, 최소 할인 가격 출력해보기
SELECT AVG(dis_price), MAX(dis_price), MIN(dis_price) FROM items I
INNER JOIN ranking R ON I.item_code = R.item_code
WHERE R.main_category = '화장품/헤어';
```
</details>



### OUTER JOIN 연습문제
<details>
<summary>연습문제</summary>

```sql
-- 연습문제
-- sakila 데이터베이스에서 address 테이블에는 address_id 가 있지만, customer 테이블에는 없는 데이터의 갯수 출력하기
SELECT COUNT(*)
FROM address A 
LEFT OUTER JOIN customer C 
ON A.address_id = C.address_id
WHERE C.address_id is null; 
```
</details>

### SUBQUERY 이해
* SQL문 안에 포함되어 있는 SQL문
  * SQL문 안에서 괄호()를 사요해 서브쿼리문을 추가할 수 있음
* 테이블과 테이블간의 검색시, 검색 범위(테이블 중 필요한 부분만 먼저 가져오도록)를 좁히는 기능에 주로 사용
#### 서브쿼리 사용법
* `JOIN`은 출력 결과에 여러 테이블의 열이 필요한 경우 유용
* 대부분의 서브쿼리는 JOIN문으로 처리가 가능
##### 예1: 서브쿼리 카테고리가 '여성신발'인 상품타이틀만 가져오기
* bestproducts 테이블 사용
* JOIN SQL 사용하는 방법
* 서브쿼리를 사용해서 작성하는 방법

##### 예2: 서브카테코리가 '여성신발'인 상품중 할인가격이 가장 높은 상품의 할인가격 가져오기
* bestproducts 테이블 사용
* JOIN SQL 사용하는 방법
* 서브쿼리를 사용해서 작성하는 방법
<details>
<summary>sql</summary>

```sql
SELECT MAX(I.dis_price) FROM items I
INNER JOIN ranking R 
ON I.item_code = R.item_code
WHERE R.sub_category = '여성신발'
;

SELECT MAX(I.dis_price) FROM items I
WHERE I.item_code IN (
	SELECT R.item_code
	FROM ranking R
    WHERE R.sub_category = '여성신발'
);
```
</details>

### 실제 문제 풀어보며 SUBQUERY 익숙해지기

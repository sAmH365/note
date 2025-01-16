# 서브 쿼리 중급
## 1. 간단한 서브쿼리 
평균 결제 금액보다 많은 결제를 한 고객을 찾기
<details>
<summary>answer</summary>

```sql
 SELECT first_name, last_name
 FROM customer
 WHERE customer_id IN (
 SELECT customer_id
 FROM payment
 WHERE amount > (SELECT AVG(amount) FROM payment)
 );
```
</details>

## 2. GROUP BY가 있는 서브쿼리
평균 결제 횟수보다 많은 결제를 한 고객을 찾기
<details>
<summary>answer</summary>

```sql
SELECT first_name, last_name
 FROM customer
 WHERE customer_id IN (
 SELECT customer_id
 FROM payment
 GROUP BY customer_id
 HAVING COUNT(*) > (
 SELECT AVG(payment_count) 
FROM (
 SELECT COUNT(*) AS payment_count
 FROM payment
 GROUP BY customer_id
 ) AS payment_counts
 )
 );
```
</details>

## 3. 최대값을 가진 행 찾기
가장 많은 결제를 한 고객을 찾기
<details>
<summary>answer</summary>

```sql
 SELECT first_name, last_name
 FROM customer
 WHERE customer_id = (
 SELECT customer_id
 FROM (
 SELECT customer_id, COUNT(*) AS payment_count
 FROM payment
 GROUP BY customer_id
 ) AS payment_counts
 ORDER BY payment_count DESC
 LIMIT 1
 );

 이 쿼리에서는 가장 안쪽 쿼리가 각 고객의 결제 횟수를 계산하고, 중간 쿼리가 결제 횟수를 내림차순으로 정렬하여 가장 많은 
 결제를 한 고객의 
 customer_id 를 찾습니다. 그리고 가장 바깥 쿼리가 해당 고객의 이름을 가져옵니다.
```
</details>

## 4. 상관 서브쿼리
각 고객에 대해 자신이 결제한 평균 금액보다 큰 결제를 한 경우의 결제 정보를 찾기
<details>
<summary>answer</summary>

```sql
 SELECT P.customer_id, P.amount, P.payment_date
 FROM payment P
 WHERE P.amount > (
 SELECT AVG(amount)
 FROM payment
 WHERE customer_id = P.customer_id
 );

이 쿼리에서는 각 결제에 대해 해당 결제를 한 고객의 평균 결제 금액을 계산하고, 그 평균보다 큰 결제를 찾습니다. 이런 종류
의 서브쿼리를 상관 서브쿼리(Correlated Subquery)라고 합니다. 왜냐하면 서브쿼리가 외부 쿼리의 변수를 참조하기 때문
입니다.

payment P 한줄씩 평가할때 WHERE 문 조건(서브쿼리)에 맞는지 확인
```
</details>

# 기본 연습문제
```md
1. film 테이블에서 평균 영화 길이(`length`)보다 긴 영화들의 제목(`title`) 찾기
2. `rental` 테이블에서 고객별 평균 대여 횟수보다 많은 대여를 한 고객들의 이름(`first_name` ,`last_name`) 찾기
3. 가장 많은 영화를 대여한 고객의 이름 (`first_name` ,`last_name`) 찾기
4. 각 고객에 대해 자신이 대여한 평균 영화 길이(`length`)보다 긴 영화들의 제목(`title`)을 찾기
```

# 복합 연습문제
```md
1. `rental` 과`inventory` 테이블을 JOIN하고,`film` 테이블에 있는 
`replacement_cost` 가 $20 이상인 영화를 대여한 고객의 이름을 찾기. 고객 이름은 소문자로 출력.
 2. `film` 테이블에서 `rating` 이 'PG-13'인 영화들에서,평균 `description` 길이보다 긴 영화의 제목을 찾기.
 3. `customer` 와 `rental`, `inventory`, `film` 테이블을 JOIN하여, 2005년 8월에 대여된 모든 'R' 등급 영화의 제목
과 해당 영화를 대여한 고객의 이메일을 찾기.
 4. `payment` 테이블에서 가장 마지막에 결재된 일시에서 30일 이전까지의 모든 결제 내역을 찾고, 해당 결재 내역에 대해서, 각 고객별 총 결제 금액과 평균 결제 금액을 소수점 둘째 자리에서 반올림하여 출력
5. `actor`와 `film_actor` 테이블을 JOIN하고, 'Sci-Fi' 카테고리에 속한 영화에 출연한 배우의 이름을 찾기. 배우의 이름은 성과 이름을 연결하여 대문자로 출력.
```
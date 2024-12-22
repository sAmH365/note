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
### 연습문제1: 메인 카테고리, 서브 카테고리에 대해, 평균할인가격과 평균할인율을 출력해보기
```sql
SELECT R.main_category, R.sub_category, AVG(I.dis_price), AVG(I.discount_percent) FROM items I
INNER JOIN ranking R ON I.item_code = R.item_code
GROUP BY R.main_category, R.sub_category;
```

### 연습문제2: 판매자별, 베스트상품 갯수, 평균할인가격, 평균할인율을 베스트상품 갯수가 높은 순으로 출력해보기
```sql
SELECT I.provider, COUNT(*), AVG(dis_price), AVG(discount_percent) FROM items I
INNER JOIN ranking R ON I.item_code = R.item_code
GROUP BY I.provider
ORDER BY COUNT(*) DESC;
```

### 연습문제3: 각 메인 카테고리별로(서브카테고리포함) 베스트 상품 갯수가 20개 이상인 판매자의 판매자별 평균할인가격, 평균할인율, 베스트 상품 갯수 출력해보기
```sql
SELECT I.provider, AVG(I.dis_price), AVG(discount_percent), COUNT(*)
FROM items I INNER JOIN ranking R ON I.item_code = R.item_code
GROUP BY R.main_category, I.provider HAVING COUNT(*) >= 20;
```

### 연습문제4: 'items' 테이블에서 'dis_price'가 50000 이상인 상품들 중, 각 'main_category'별 평균'dis_price'와 'discount_percent' 출력해보기
```sql
SELECT R.main_category, AVG(I.dis_price), AVG(I.discount_percent)
FROM items I INNER JOIN ranking R ON I.item_code = R.item_code
WHERE I.dis_price >= 50000
GROUP BY R.main_category;
```
## 자료링크
https://www.inflearn.com/courses/lecture?courseId=334916&type=LECTURE&unitId=243377&tab=curriculum

## mysql 도커 실행 명령어
### mysql 이미지 다운
`docker pull mysql:8.4.6`
### mysql 이미지로 컨테이너 생성 및 실행
`docker run --name mysql-study -e MYSQL_ROOT_PASSWORD=secret -d -p 3356:3306 mysql:8.4.6`

```bash
docker run \
  --name mysql-study \
  -p 3356:3306 \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_USER=user1 \
  -e MYSQL_PASSWORD=pass \
  mysql:8.4.6
```
### mysql 컨테이너 실행
`docker start mysql-study`

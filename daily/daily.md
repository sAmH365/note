### 2025.05.12
* 내부망 대비 자바스크립트,css 내재화
* 로그필터(프라이버시 i) 테스트
  * 로컬에서는 테스트 불가
  * 라이센스를 host로 발급(운영서버에서만 동작가능)
  * prd-log-agent-01 우분투 서버 생성후 테스트 스크립트 동작완료

### 2025.05.13
* 로그 필터 개발
  * xml파싱
  * gradle 로컬 라이브러리 포함방법(privacyi jar필요)
* 카프카서버 logagent서버에 실행해야함 (현재 logsavoer 서버에서 실행중)
  * /mnt/nas/before-filter 에 로그파일 떨구기
  * 로그 필터가 하루전 로그파일 스케쥴링돌면서 검사
  * 검사완료된 후 /mnt/nas/logsaver/app/mybrown backend.log파일로 이동

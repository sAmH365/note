# 주요 구성 요소
  ## Job
  * 스프링 배치의 최상위 개념
  * 배치 작업 단위
  * 하나의 배치 작업은 여러 단계를 포함 할 수 있으며, 각 단계는 개별적인 작업을 수행
  ## Step
  * Job의 하위 개념으로, 배치 작업내의 개별 작업단위
  * `ItemReader`, `ItemProcessor`, `ItemWriter`의 작업단위로 구성
  ## JobInstance
  * Job의 특정 실행을 나타내는 개념
  * 같은 Job이 여러번 실행될 경우 각 실행에 대한 정보관리
  ## StepExecution
  * Step의 실행단위, Step의 실행 상태와 메타데이터 관리
# 주요 인터페이스 및 클래스
  * `ItemReader`
    * 데이터를 읽어오는 인터페이스
    * 데이터를 읽어와 `ItemProcessor`에게 전달
  * `ItemProcessor`
    * 데이터 가공 인터페이스
    * 비즈니스 로직을 수행한뒤 `ItemWriter`에게 전달
  * `ItemWriter`
    * 데이터를 최종적으로 저장하거나 출력하는 인터페이스
  * `JobLauncher`
    * Job을 실행시키는 인터페이스, Job과 JobParameberes를 받아 Job을 실행
    * 주로 스케줄러와 연동해 사용
# 흐름 제어
* `JobParameters`
  * Job을 실행할 때 전달되는 파라미터, Job의 유일성을 보장
  * ex) 특정 날짜에만 배치실행하거나, 매일 다른 파일을 읽을 때 사용 할 수 있다.
* `ExitStatus`
  * Step또는 Job의 실행결과를 나타내는 객체
  * 성공 여부나 실패 원인을 나타낸다
  * 후속작업 제어할 때 활용
* `ExecutionContext`
  * Step이나 Job이 실행되는 동안 상태를 저장하는 곳
  * 공유 데이터나 상태를 저장하여 다음 Step에서 사용가능
# 에러 처리와 리트라이
* `Skip`
  * 특정 예외가 발생했을 때 해당 아이템을 건너뛰고 다음 아이템으로 진행할 수 있도록 한다.
* `Retry`
  * 실패한 아이템을 재시도하는 설정
  * 특정 예외에 대해서 재시도 횟수 지정 가능
* `Fault Tolerance`
  * 에러를 허용하는 기능
  * 전체 Job실패를 막고, 지정된 범위 내에서 에러를 무시하거나 건너뛸 수 있다. 
# `UserJobConfig` 클래스
* 스프링 배치와 JPA를 사용하여 데이터를 읽고 가공한 뒤 데이터 베이스에 저장하는 배치 작업을 구성하는 설정파일
* Job, Step을 정의하고, Reader, Processor, Writer 단계를 설정
<details>
<summary>코드 예시</summary>

```java
@Configuration
@EnableBatchProcessing
public class UserJobConfig {
    
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final UserRepository userRepository;
    private final EntityManagerFactory entityManagerFactory;

    public UserJobConfig(JobBuilderFactory jobBuilderFactory, 
                         StepBuilderFactory stepBuilderFactory, 
                         UserRepository userRepository,
                         EntityManagerFactory entityManagerFactory) {
        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
        this.userRepository = userRepository;
        this.entityManagerFactory = entityManagerFactory;
    }

// Job 설정
    @Bean
public Job userJob() {
    return jobBuilderFactory.get("userJob")
            .start(processUserStep())
            .build();
}


// Step 설정
@Bean
public Step processUserStep() {
    return stepBuilderFactory.get("processUserStep")
            .<User, ProcessedUser>chunk(10)
            .reader(userReader())
            .processor(userProcessor())
            .writer(userWriter())
            .build();
}

// RepositoryItemReader 설정
@Bean
public RepositoryItemReader<User> userReader() {
    RepositoryItemReader<User> reader = new RepositoryItemReader<>();
    reader.setRepository(userRepository);
    reader.setMethodName("findAll");
    reader.setSort(Collections.singletonMap("id", Sort.Direction.ASC));
    return reader;
}

// ItemProcessor 설정
@Bean
public ItemProcessor<User, ProcessedUser> userProcessor() {
    return user -> {
        // 특정 조건을 만족하는 사용자만 상태를 업데이트
        if ("ACTIVE".equals(user.getStatus())) {
            ProcessedUser processedUser = new ProcessedUser();
            processedUser.setName(user.getName());
            processedUser.setEmail(user.getEmail());
            processedUser.setProcessedStatus("PROCESSED");
            return processedUser;
        }
        return null; // null을 리턴하면 해당 데이터는 건너뛰게 됨
    };
}

// JpaItemWriter 설정
@Bean
public ItemWriter<ProcessedUser> userWriter() {
    return new JpaItemWriterBuilder<ProcessedUser>()
            .entityManagerFactory(entityManagerFactory)
            .build();
}
}
```
</details>
<br>

# 트랜잭션 경계
## Step 단위 트랜잭션
* 각 Step은 하나의 트랜잭션 범위를 가진다.
* Step이 시작될때 트랜잭션이 열리고 Step이 끝날때 트랜잭션이 커밋
* Step내에서 오류가 발생하면 해당 Step의 트랜잭션이 롤백되고, 이후에 정의된 다음 Step으로 넘어가지 않는다.
## Chunk 단위 트랜잭션
* 각 Step내에서도 Chunk 단위로 트랜잭션을 나누어 처리
* `chunk(10)` 으로 설정하면 10개의 아이템을 처리할 때마다 하나의 트랜잭션 생성
* 청크가 완료될 때마다 커밋
* 오류가 발생하면 해당 청크는 롤백되고 이후 배치 잡은 롤백된 청크부터 다시 시작

# 참고사항
* Reader를 사용할 때 순수 JPQL을 사용해야함
* QueryDsl 사용하고 싶으면 -> QuerydslPagingItemReader
* QuerydslNoOffsetPagingItemReader
  * 읽기 시작한 부분을 지정해 매번 첫 페이지만 읽도록 하는 방식입니다. 이는 쿼리가 매번 이전 페이지의 행을 건너 뛸 수 있음을 의미합니다. 즉, 아무리 페이지가 뒤로 가더라도 처음 페이지를 읽은 것과 같은 효과를 가지게 됩니다. 

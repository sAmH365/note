# 설치
- Ollama
  - 모델
    - deepseek (강의시점 핫했음)
    - tools 태그 붙어있으면 api호출이라던지 tool calling가능
  - 가상환경
    - mac: venv
      - `pyenv local langchain-basics`
    - window: [conda](https://www.anaconda.com/docs/getting-started/miniconda/install/windows-cli-install#powershel)
    - 환경변수 등록
      - Anaconda prompt 실행 -> `conda init`
    - conda 명령어
      - 'ai-agent'라는 이름으로 3.11 버전 환경 생성
        - `conda create -n ai-agent python=3.11`
      - 만들어진 환경으로 들어가기
        - `conda activate ai-agent`
      - 활성화된 상태에서 필요한 도구들 설치
        - `pip install langchain openai`
      ```
      🛠 환경 관리 꿀팁
        내 가상환경 목록 보기: conda env list
        가상환경 밖으로 나가기: conda deactivate
        환경 삭제하기 (망했을 때): conda remove -n ai-agent --all
      ```
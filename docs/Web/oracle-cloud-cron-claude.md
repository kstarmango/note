---
title: Oracle Cloud + Cron으로 Claude Code 자동 실행
tags: [oracle-cloud, cron, claude-code, linux, 자동화]
date: 2026-04-03
---

# Oracle Cloud + Cron으로 Claude Code 자동 실행

## 개요

Oracle Cloud Free Tier 서버에 Claude Code를 설치하고, cron으로 특정 시간마다 자동 실행하는 방법.

---

## 1. Oracle Cloud 인스턴스 생성

- **Image**: Ubuntu 22.04
- **Shape**: VM.Standard.E2.1.Micro (Always Free)
  - A1.Flex는 용량 부족 오류가 많아 E2.1.Micro 권장
- **Public IP**: Reserved(고정 IP)로 설정
- **서버 시간**: UTC 기준 (한국 시간과 9시간 차이)

---

## 2. SSH 접속

```bash
ssh -i "키파일경로.key" ubuntu@<PUBLIC_IP>
```

---

## 3. Claude Code 설치

```bash
# Node.js 20 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs

# Claude Code 설치
sudo npm install -g @anthropic-ai/claude-code
```

---

## 4. 로그인 및 동작 확인

```bash
claude        # 브라우저 인증 링크 출력 → 복사해서 로그인
claude -p "안녕"  # 응답 오면 정상
```

> `claude -p "메시지"` : 비대화형 모드, 응답 후 즉시 종료

---

## 5. Cron 자동 실행 설정

### KST → UTC 변환표

| 한국 시간 (KST) | UTC      |
|----------------|----------|
| 05:00          | 전날 20:00 |
| 10:00          | 01:00    |
| 15:00          | 06:00    |

### Cron 등록

```bash
crontab -e
```

아래 내용 추가 (KST 05:00 / 10:00 / 15:00 기준):

```
0 20 * * * claude -p "세션 시작"
0 1  * * * claude -p "세션 시작"
0 6  * * * claude -p "세션 시작"
```

저장: `Ctrl+X` → `Y` → `Enter`

### 등록 확인

```bash
crontab -l
```

---

## 참고

- Oracle Free Tier는 항상 켜져 있어서 cron이 끊기지 않음
- 서버가 UTC 기준이므로 한국 시간으로 계산해서 등록할 것

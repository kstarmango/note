---
title: Git 핵심 명령어 정리
tags: [CS, git, 버전관리]
date: 2026-03-10
---

# Git 핵심 명령어 정리

## 기본 흐름

```
작업 디렉토리 → (git add) → 스테이징 → (git commit) → 로컬 저장소 → (git push) → 원격 저장소
```

## 자주 쓰는 명령어

### 브랜치

```bash
git branch                  # 브랜치 목록
git branch feature/login    # 브랜치 생성
git checkout feature/login  # 브랜치 이동
git checkout -b feature/login  # 생성 + 이동
git branch -d feature/login  # 브랜치 삭제
```

### 커밋

```bash
git add .
git commit -m "feat: 로그인 기능 추가"
git log --oneline  # 커밋 히스토리 간략히
```

### 되돌리기

```bash
git restore file.txt       # 작업 디렉토리 변경사항 취소
git reset HEAD file.txt    # 스테이징 취소
git revert abc1234         # 커밋 되돌리기 (히스토리 유지)
```

## 커밋 메시지 컨벤션

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 포맷팅 |
| `refactor` | 리팩토링 |
| `chore` | 빌드, 설정 변경 |

```
feat: 사용자 로그인 기능 추가
fix: 토큰 만료 시 빈 화면 버그 수정
docs: README 설치 방법 업데이트
```

## .gitignore

```
node_modules/
.env
build/
*.log
.DS_Store
```

---
title: Claude Code 스킬로 문서화 워크플로 자동화하기
tags: [claude-code, skill, automation, obsidian]
date: 2026-04-02
---

# Claude Code 스킬로 문서화 워크플로 자동화하기

Claude Code의 스킬(Skill) 기능을 활용해서 반복적인 문서화 작업을 자동화한 방법을 정리합니다.

## 스킬이란?

Claude Code에서 `/스킬명`으로 호출할 수 있는 **작업 절차서**. 반복되는 워크플로를 파일로 저장해두고, 필요할 때 불러서 실행하는 SOP(Standard Operating Procedure)라고 보면 된다.

**메모리와의 차이:**
| | 메모리 | 스킬 |
|--|--------|------|
| 역할 | Claude의 기본 세팅 | 특정 작업의 절차서 |
| 로드 시점 | 항상 | 호출할 때만 |
| 용도 | 행동 방식 기억 | 반복 워크플로 저장 |

---

## 만든 스킬 목록

### 1. `/document-note` — 문서화 워크플로

노트 작성을 요청할 때 자동으로 저장 위치와 공개 여부를 결정해주는 스킬.

**흐름:**
```
"이거 문서화해줘"
    ↓
Obsidian에 저장할까요?
    ↓ (예)
공부용인가요?
    ↓ (예)              ↓ (아니오)
공개/ 폴더 저장        개인 폴더 저장
git push → 배포
```

**SKILL.md 핵심 내용:**
```markdown
## 순서
1. Obsidian 저장 여부 확인
2. 공부용 여부 확인
3. 공부용이면 공개/ 폴더 저장 + git push
4. 개인 메모면 draft 처리
```

### 2. `/quartz` — Quartz 로컬 서버 실행

> 현재는 VitePress로 전환해서 사용 안 함. 기록용으로 남김.

Node 22로 전환 → Quartz 서버 실행 → 종료 후 Node 20 복귀를 자동화한 스킬이었다.

---

## 스킬 파일 구조

```
project/skill/
├── document-note/
│   └── SKILL.md
├── document-note.skill   ← zip으로 패키징한 파일
├── quartz/
│   └── SKILL.md
└── quartz.skill
```

스킬은 `SKILL.md`를 포함한 폴더를 zip으로 묶어서 `.skill` 확장자로 저장한다.

**SKILL.md 기본 형식:**
```markdown
---
name: 스킬이름
description: >
  이 스킬이 언제 호출되어야 하는지 설명.
  "문서화해줘", "정리해줘" 같은 말을 하면 이 스킬을 사용.
---

# 스킬 제목

## 실행 순서
1. 첫 번째 단계
2. 두 번째 단계
...
```

---

## 실제 사용 예시

```
나: 오늘 공부한 TypeScript 제네릭 정리해줘

Claude: Obsidian에 저장할까요?

나: ㅇㅇ

Claude: 공부용 내용인가요? (GitHub Pages에 공개 배포됩니다)

나: ㅇㅇ

Claude: [공개/ 폴더에 저장 후 git push → 자동 배포]
```

---

## 팁

- 스킬 description에 **트리거 문구**를 명시적으로 적어두면 Claude가 자동으로 인식한다
- 스킬은 절차서이기 때문에 너무 세세하게 쓰기보다 **흐름 중심**으로 작성하는 게 낫다
- 반복되는 작업이 3번 이상이면 스킬로 만들 가치가 있다

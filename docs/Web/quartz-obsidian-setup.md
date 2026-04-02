---
title: Quartz + Obsidian 블로그 세팅
tags: [quartz, obsidian, github-pages]
date: 2026-04-02
---

# Quartz + Obsidian 블로그 세팅

Obsidian으로 노트를 쓰고, Quartz로 GitHub Pages에 자동 배포하는 세팅 방법을 정리합니다.

## 구조

```
Obsidian 볼트/
└── 공개/          ← Quartz content와 연결 (junction)
    ├── index.md
    ├── Flutter/
    ├── Web/
    └── CS/
```

공개 폴더에 넣은 노트만 GitHub Pages에 배포됩니다.

## 흐름

```
Obsidian에서 노트 작성
       ↓
공개/ 폴더에 저장
       ↓
git push
       ↓
GitHub Actions 자동 빌드
       ↓
GitHub Pages 배포
```

## 주요 설정

### Node 버전 관리 (fnm)

Quartz는 Node 22 이상 필요. fnm으로 관리.

```cmd
fnm use 22.22.1
cd C:\Users\gurwl\kstar\mango\quartz
npx quartz build --serve --port 4040
```

### GitHub Actions (deploy.yml)

`v4` 브랜치에 push되면 자동으로 빌드 후 GitHub Pages에 배포.

## 배포 URL

[https://kstarmango.github.io/note](https://kstarmango.github.io/note)

---
title: Obsidian → VitePress 자동 배포 세팅기
tags: [obsidian, vitepress, github-pages, fnm, claude-code]
date: 2026-04-02
---

# Obsidian → VitePress 자동 배포 세팅기

Obsidian으로 노트를 쓰면 자동으로 블로그에 올라가는 파이프라인을 만든 과정을 정리합니다.

## 목표

```
Obsidian 노트 작성 → git push → GitHub Actions → GitHub Pages 자동 배포
```

- 공부용 노트는 공개 블로그에 자동 배포
- 개인 메모는 Obsidian에만 남김
- 어디서든 URL로 접근 가능 (모바일 포함)

---

## 1. 도구 선택

### 왜 VitePress?

처음엔 **Quartz**로 시작했다. Obsidian 연동에 특화된 정적 사이트 생성기인데, 막상 써보니 디자인이 마음에 안 들었고 커스터마이징 한계가 있었다.

**VitePress**로 갈아탄 이유:
- Node 20으로도 동작 (Quartz는 Node 22 필요)
- 깔끔한 기본 테마
- 문서화 도구로 검증된 생태계
- 마크다운 파일 그대로 사용 가능

### 왜 fnm?

Node 버전 관리를 위해 기존 `nvm-windows`를 쓰고 있었는데, 버전 전환할 때마다 **관리자 권한**이 필요했다. `fnm`은 관리자 권한 없이 전환 가능하다.

```cmd
winget install Schniz.fnm
fnm install 20.13.0
fnm default 20.13.0
```

---

## 2. 폴더 구조

```
Obsidian 볼트/
├── 공개/              ← VitePress가 바라보는 폴더 (공개 노트)
│   ├── index.md
│   ├── Flutter/
│   ├── Web/
│   └── CS/
├── 업무관련 정보/      ← 개인 메모 (배포 안 됨)
└── 일별 업무 기록/     ← 개인 메모 (배포 안 됨)

C:\kstar\mango\devnote\
├── .vitepress/
│   └── config.mts
├── docs/              ← junction → Obsidian 볼트/공개/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── package.json
```

핵심은 `docs/` 폴더를 **Windows Junction**으로 Obsidian 볼트의 `공개/` 폴더에 연결한 것.

```powershell
New-Item -ItemType Junction -Path 'devnote\docs' -Target 'Obsidian Vault\공개'
```

이렇게 하면 Obsidian에서 `공개/` 폴더에 글을 쓰는 순간 VitePress 소스에도 바로 반영된다.

---

## 3. VitePress 설정

```ts
// .vitepress/config.mts
export default defineConfig({
  title: 'DevNote',
  lang: 'ko-KR',
  base: '/note/',
  srcDir: './docs',
  outDir: './.vitepress/dist',
  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: 'Flutter', link: '/Flutter/' },
      { text: 'Web', link: '/Web/' },
      { text: 'CS', link: '/CS/' },
    ],
    search: { provider: 'local' },
  },
})
```

`srcDir: './docs'`로 junction 폴더를 소스로 지정하고, `base: '/note/'`는 GitHub Pages 저장소 이름에 맞춘다.

---

## 4. GitHub Actions 배포

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist
      - uses: actions/deploy-pages@v4
```

`main` 브랜치에 push하면 자동으로 빌드 → GitHub Pages 배포.

---

## 5. 문서화 워크플로 자동화 (Claude Code 스킬)

Claude Code에서 `/document-note` 스킬을 호출하면:

1. Obsidian에 저장할지 묻는다
2. 공부용인지 묻는다
3. 공부용이면 `공개/` 폴더에 저장 후 `git push`까지 자동 실행

덕분에 "이거 문서화해줘" 한 마디면 Obsidian 저장 + 블로그 배포가 끝난다.

---

## 6. 삽질 기록

**nvm AutoRun 문제**  
fnm을 cmd에서 자동 초기화하려고 레지스트리 AutoRun에 추가했더니 cmd 자체가 먹통이 됐다. fnm이 PATH에 잡히기 전에 AutoRun이 실행돼서 생긴 문제. 결국 AutoRun 방식 포기.

**GitHub Pages 브랜치 vs GitHub Actions**  
Pages 설정을 "GitHub Actions"로 바꿨는데 계속 옛날 버전이 보였다. 알고 보니 Settings에서 바꿔도 내부 `build_type`이 `legacy`로 남아 있었고, 브랜치 기반 배포(`pages-build-deployment`)가 우리 배포를 계속 덮어쓰고 있었다. Settings → Pages에서 Source를 명시적으로 "GitHub Actions"로 재설정해서 해결.

**VitePress srcDir 위치**  
`vitepress dev docs`로 실행하면 config를 `docs/.vitepress/`에서 찾는다. 하지만 config를 루트에 두고 싶어서 `vitepress dev`로 바꾸고 config에 `srcDir: './docs'`를 추가했다.

---

## 결과

- Obsidian 글쓰기 → git push 한 번으로 블로그 자동 배포
- 공개/비공개 노트 폴더로 깔끔하게 분리
- 배포 URL: [https://kstarmango.github.io/note](https://kstarmango.github.io/note)

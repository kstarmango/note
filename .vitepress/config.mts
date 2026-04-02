import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DevNote',
  description: 'DevNote',
  lang: 'ko-KR',
  base: '/note/',
  srcDir: './docs',
  outDir: './.vitepress/dist',

  themeConfig: {
    logo: null,
    siteTitle: 'DevNote',

    nav: [
      { text: '홈', link: '/' },
      { text: 'Flutter', link: '/Flutter/' },
      { text: 'Web', link: '/Web/' },
      { text: 'CS', link: '/CS/' },
    ],

    sidebar: {
      '/Flutter/': [
        {
          text: 'Flutter',
          items: [
            { text: 'Riverpod 상태관리', link: '/Flutter/riverpod-상태관리' },
            { text: '앱 아키텍처 패턴', link: '/Flutter/flutter-architecture' },
            { text: 'Dart 비동기 프로그래밍', link: '/Flutter/dart-async' },
          ]
        }
      ],
      '/Web/': [
        {
          text: 'Web',
          items: [
            { text: '왜 Obsidian인가', link: '/Web/why-obsidian' },
            { text: 'Claude Code 스킬로 문서화 자동화', link: '/Web/claude-code-skills' },
            { text: 'Obsidian → VitePress 자동 배포 세팅기', link: '/Web/obsidian-to-blog' },
            { text: 'TypeScript 기초', link: '/Web/typescript-기초' },
            { text: 'Quartz + Obsidian 세팅', link: '/Web/quartz-obsidian-setup' },
          ]
        }
      ],
      '/CS/': [
        {
          text: 'CS',
          items: [
            { text: 'HTTP 기초', link: '/CS/http-기초' },
            { text: 'REST API 설계 원칙', link: '/CS/rest-api' },
            { text: 'Git 핵심 명령어', link: '/CS/git-기초' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kstarmango' }
    ],

    footer: {
      message: 'DevNote',
      copyright: 'Copyright © 2026'
    },

    search: {
      provider: 'local'
    },

    outline: {
      label: '목차',
      level: [2, 3]
    },

    docFooter: {
      prev: '이전',
      next: '다음'
    },

    lastUpdated: {
      text: '최종 수정일',
    },
  },

  markdown: {
    lineNumbers: true,
  },
})

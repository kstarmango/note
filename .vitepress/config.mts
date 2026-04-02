import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DevNote',
  description: '개발 공부 노트',
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
          ]
        }
      ],
      '/Web/': [
        {
          text: 'Web',
          items: [
            { text: 'Quartz + Obsidian 세팅', link: '/Web/quartz-obsidian-setup' },
          ]
        }
      ],
      '/CS/': [
        {
          text: 'CS',
          items: [
            { text: 'HTTP 기초', link: '/CS/http-기초' },
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

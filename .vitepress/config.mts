import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

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

    sidebar: generateSidebar({
      documentRootPath: 'docs',
      useTitleFromFrontmatter: true,
      useFolderTitleFromIndexFile: true,
      sortMenusByFrontmatterDate: true,
      sortMenusOrderByDescending: true,
      excludeFiles: ['index.md'],
      excludeFilesByFrontmatterFieldName: 'draft',
    }),

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

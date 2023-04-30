---
title: 'Next.js×TailwindCSSで技術ブログを作る'
date: '2023-04-29'
description: 'テスト用の記事1でーすw'
image: nextjs.png
topics: '["Next.js","TailwindCSS"]'
emoji: '🙆'
---

## やりたいこと

## 参考
- [Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog)

## インストール
### Next.js
- インストール
```sh
% npx create-next-app@latest nextjs_portfolio_blog
Need to install the following packages:
  create-next-app@latest
Ok to proceed? (y) y
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use Tailwind CSS with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ Would you like to use experimental `app/` directory with this project? … No / Yes
✔ What import alias would you like configured? … @/*
```

- 実行

```sh
% npm run dev
```

### TailwindCSS
- Next.jsのインストール時に`Would you like to use Tailwind CSS ...?`で`yes`したので、すでに`tailwindcss postcss autoprefixer`はインストールされている。

### markdown関係
- 記事はmarkdownファイルとして配置して、HTMLに変換して表示したい
- markdown => HTML 変換ライブラリの一覧
  
|    aaa       | marked   | markdown-it | react-remark      | remark                   |
| --------- | -------- | ----------- | ----------------- | ------------------------ |
| 特徴        |          |             |                   |                          |
| 変換方法      |          |             |                   |                          |
| プラグイン使用可能 | ?        | ○           | ?                 | ○                        |
| 長所        | APIが最も単純 | 単純          | コンポーネントを利用して変換できる | APIで変換後のHTMLにアクセスできる、HTML => markdown の変換もできる |
| 短所        |    プラグインがない      |     プラグインがない?        |                   | ライブラリが4つほど必要、APIが複雑          |

- => 将来的にどんどん見た目のカスタマイズしていきたいので、remarkにする

```sh
% npm install unified remark-parse remark-rehype rehype-stringify
```

- あと、マークダウンファイルに記載するメタ情報(frontMatter)を取得のために、`gray-matter`をインストールする

```sh
% npm install gray-matter
```

- ディレクトリ構成

```
.
├── README.md
├── components
│   ├── CardBlog.tsx
│   ├── CardProfile.tsx
│   ├── CardSkills.tsx
│   ├── CardWorks.tsx
│   └── layouts
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Layout.tsx
│       ├── Nav.tsx
│       └── PostHeader.tsx
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Works.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── api
│   │   └── hello.ts
│   ├── index.tsx
│   └── posts
│       ├── [slug].tsx
│       ├── files
│       │   ├── post1.md
│       │   └── post2.md
│       └── images
│           ├── img1.png
│           └── img2.png
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── next.svg
│   ├── nino.png
│   └── vercel.svg
├── styles
│   └── globals.css
├── tailwind.config.js
├── temp.txt
├── tsconfig.json
└── utils
    └── util.ts
```

- markdownの見た目整え
  - typograph をいい感じに整えてくれる `@tailwindcss/typegraphy`を使う

  ```sh
  % npm install -D @tailwindcss/typography
  ```

## レイアウト作り
- 使ったツール
  - figma
  - pinterest

- レイアウトのアイディア
  - インターネッツ上のみなさまのポートフォリオサイトを参考に
  - pinterestに、ヘッダー・フッター・ボタン,,,の単位で、それぞれ参考になった部分のキャプチャのピンを作成した

<img src="../images/20230427225701.jpeg">

## 記事を投稿する
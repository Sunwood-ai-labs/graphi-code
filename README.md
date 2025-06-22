<div align="center">

![](header.png)

# 🎨 Graphi Code

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.10-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![CodeMirror](https://img.shields.io/badge/CodeMirror-6-D30707?style=for-the-badge&logo=codemirror&logoColor=white)](https://codemirror.net/)
[![PostCSS](https://img.shields.io/badge/PostCSS-10.4.21-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)](https://postcss.org/)
[![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deploy-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**リアルタイムプレビュー機能付きHTML エディター**

和モダンデザインを採用した、直感的で美しいコーディング体験を提供します

[🚀 **デモを試す**](https://sunwood-ai-labs.github.io/graphi-code/) | [📖 **機能紹介**](#-機能) | [⚡ **クイックスタート**](#-クイックスタート)

![Demo](demo.png)

</div>

---

## ✨ 機能

### 🔥 **リアルタイムプレビュー**
- コード変更が即座にプレビューに反映
- 遅延なしの滑らかな更新

### ✏️ **インライン編集**
- プレビュー画面で直接テキスト編集
- WYSIWYG感覚でHTMLを編集

### 🌙 **テーマ切り替え**
- **涼雅テーマ（ライト）**: 清涼感のある青緑基調
- **夜涼テーマ（ダーク）**: 落ち着いた夜の雰囲気

### 📱 **レスポンシブデザイン**
- デスクトップ・タブレット・モバイル対応
- 画面サイズに応じた最適なレイアウト

### 🎨 **和モダンデザイン**
- 日本の美意識を取り入れたUI
- 青海波パターンや星空エフェクト
- 美しいアニメーションとトランジション

---

## ⚡ クイックスタート

### 📋 前提条件
- Node.js 18以上
- npm または yarn

### 🚀 インストール

```bash
# リポジトリをクローン
git clone https://github.com/Sunwood-ai-labs/graphi-code.git

# ディレクトリに移動
cd graphi-code

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

### 📦 ビルド・デプロイ

```bash
# 本番用ビルド
npm run build

# 静的ファイル生成（GitHub Pages用）
npm run export
```

---

## 📖 使用方法

### 基本操作

1. **📝 コード編集**: 左側のエディターでHTMLコードを編集
2. **👀 プレビュー確認**: 右側でリアルタイムプレビューを確認
3. **✏️ 直接編集**: プレビュー画面の要素をクリックして直接編集
4. **🌙 テーマ変更**: ナビゲーションのテーマボタンで切り替え
5. **📂 ファイル読み込み**: インポートボタンでHTMLファイルを読み込み

### エディター機能

- **シンタックスハイライト**: HTML構文の色分け表示
- **自動補完**: タグの自動クローズ
- **行番号表示**: コードの行数表示
- **フォールディング**: コードブロックの折りたたみ

### プレビュー機能

- **編集可能要素**: `p`, `h1-h6`, `li`, `span`, `strong`, `em` などが直接編集可能
- **リアルタイム同期**: プレビューでの編集がエディターに即座に反映
- **スタイル適用**: CSS変数による美しいスタイリング

---

## 🏗️ プロジェクト構造

```
graphi-code/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📄 layout.tsx          # ルートレイアウト
│   │   ├── 📄 page.tsx            # メインページ
│   │   └── 📄 globals.css         # グローバルスタイル
│   └── 📂 components/             # Reactコンポーネント
│       ├── 📄 HtmlEditor.tsx      # CodeMirrorエディター
│       ├── 📄 LivePreview.tsx     # プレビュー画面
│       └── 📄 Navbar.tsx          # ナビゲーション
├── 📂 .github/workflows/          # GitHub Actions
├── 📄 next.config.js              # Next.js設定
├── 📄 tailwind.config.js          # TailwindCSS設定
└── 📄 package.json                # 依存関係定義
```

---

## 🎨 デザインコンセプト

### 涼雅（りょうが）テーマ
- **基調色**: 深い青緑 (#025E73)
- **アクセント**: 明るい青緑 (#04BFAD)
- **背景**: 清涼感のある白基調
- **パターン**: 青海波（せいがいは）模様

### 夜涼（やりょう）テーマ
- **基調色**: 明るいシアン (#66D9EF)
- **アクセント**: 金色 (#F2C166)
- **背景**: 深い夜空の青
- **エフェクト**: 星空パターン

---

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### 開発ガイドライン

1. **🔱 フォーク**: このリポジトリをフォーク
2. **🌟 ブランチ作成**: `git checkout -b feature/amazing-feature`
3. **💾 コミット**: `git commit -m '✨ feat: Add amazing feature'`
4. **📤 プッシュ**: `git push origin feature/amazing-feature`
5. **🔄 プルリクエスト**: Pull Requestを作成

### コーディング規約
- **言語ポリシー**: 変数名・関数名は英語、コメント・ドキュメントは日本語
- **命名規則**: camelCase for variables, PascalCase for components
- **型定義**: TypeScriptで厳密な型定義を実装

---

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

---

## 👥 作成者

**Sunwood AI Labs**
- 🌐 Website: [Sunwood AI Labs](https://github.com/Sunwood-ai-labs)
- 📧 Contact: [Contact Form](https://github.com/Sunwood-ai-labs)

---

<div align="center">

**⭐ このプロジェクトが気に入ったら、スターをお願いします！ ⭐**

[🚀 **今すぐデモを試す**](https://sunwood-ai-labs.github.io/graphi-code/)

</div>

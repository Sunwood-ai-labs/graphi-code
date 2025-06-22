# 🔧 開発者向けドキュメント

このディレクトリには Graphi Code の主要なソースコードが含まれています。

## 📁 ディレクトリ構造

- [`app/`](app/) - Next.js App Router関連ファイル（レイアウト、ページ、グローバルスタイル）
- [`components/`](components/) - 再利用可能なReactコンポーネント

## 🎯 開発ガイドライン

### コーディング規約
- **言語ポリシー:** 変数名・関数名は英語、コメントは日本語
- **命名規則:** camelCase for variables, PascalCase for components
- **型定義:** TypeScriptで厳密な型定義を実装

### コンポーネント設計原則
- **単一責任の原則:** 各コンポーネントは一つの明確な責務を持つ
- **Props型定義:** 全てのPropsに適切なTypeScript型を定義
- **パフォーマンス最適化:** useCallback, useMemo を適切に使用
- **再利用性:** 汎用的で再利用可能な設計を心がける

### スタイリング方針
- **CSS Variables:** テーマ切り替えに対応したCSS変数を使用
- **TailwindCSS:** ユーティリティクラスを基本とする
- **和モダンデザイン:** 日本の美意識を取り入れた配色とレイアウト

## 🏗️ アーキテクチャ

### 状態管理
- React Hooks（useState, useEffect, useCallback, useMemo）を使用
- 親子間でのpropsによるデータ受け渡し
- リアルタイム同期のための効率的な状態更新

### テーマシステム
- CSS Variables による動的テーマ切り替え
- ライトテーマ「涼雅」とダークテーマ「夜涼」
- localStorage による設定永続化

## 📖 詳細ドキュメント

各ディレクトリの詳細については、それぞれのREADMEを参照してください：

- [App Router 設定](app/) - Next.js App Routerの設定とレイアウト
- [Components](components/) - 各コンポーネントの仕様と使用方法

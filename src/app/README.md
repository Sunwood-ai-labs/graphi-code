# 📱 App Router ディレクトリ

Next.js 14 の App Router を使用したアプリケーションの設定とレイアウトファイルが含まれています。

## 📄 ファイル構成

### [`layout.tsx`](layout.tsx)
- **役割:** アプリケーション全体の共通レイアウト
- **機能:**
  - HTMLの基本構造定義
  - 外部フォント（Google Fonts）の読み込み
  - Font Awesome アイコンの設定
  - メタデータ設定

### [`page.tsx`](page.tsx)
- **役割:** メインページコンポーネント
- **機能:**
  - HTMLエディターとライブプレビューの統合
  - ファイルインポート機能
  - 状態管理（HTMLコンテンツの管理）
  - レスポンシブレイアウト

### [`globals.css`](globals.css)
- **役割:** グローバルスタイル定義
- **機能:**
  - CSS変数によるテーマシステム
  - 涼雅・夜涼テーマの色定義
  - 和モダンデザインのスタイリング
  - アニメーション・エフェクト定義
  - CodeMirrorエディターのカスタムテーマ

## 🎨 テーマシステム

### CSS Variables 構造
```css
:root {
  /* 涼雅テーマ（ライト） */
  --primary-color: #025E73;
  --secondary-color: #038C8C;
  --accent-color: #04BFAD;
  --neon-gold: #F2C166;
  /* ... */
}

[data-theme="dark"] {
  /* 夜涼テーマ（ダーク） */
  --primary-color: #04BFAD;
  --secondary-color: #F2C166;
  /* ... */
}
```

### フォントシステム
- **和文フォント:** Noto Sans JP, M PLUS Rounded 1c
- **和文セリフ:** Shippori Mincho, Kaisei Decol
- **欧文モノスペース:** Source Code Pro（エディター用）

## 🌊 デザインエフェクト

### 青海波パターン（ライトテーマ）
```css
background-image: url("data:image/svg+xml,...")
```

### 星空エフェクト（ダークテーマ）
```css
background-image: url("data:image/svg+xml,...")
```

## 📱 レスポンシブ対応

- **デスクトップ:** 横並びレイアウト（エディター | プレビュー）
- **モバイル:** 縦積みレイアウト
- **ブレークポイント:** 768px以下でモバイル表示

## 🔄 状態管理

### HTMLコンテンツ管理
- エディターからの変更: `handleEditorChange`
- プレビューからの変更: `handlePreviewChange`
- ファイルインポート: `handleFileImport`

### テーマ切り替え
- localStorage での設定保存
- data-theme属性による動的切り替え
- CSS Variables の自動更新

## 🚀 パフォーマンス最適化

- `useCallback` によるコールバック関数の最適化
- コンポーネントの適切な分割
- CSS-in-JS を避けたCSS Variables の活用

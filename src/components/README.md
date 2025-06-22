# 🧩 Components ディレクトリ

Graphi Code アプリケーションの主要なReactコンポーネントが含まれています。

## 📄 コンポーネント一覧

### [`HtmlEditor.tsx`](HtmlEditor.tsx)
**HTMLコードエディターコンポーネント**

#### 機能
- CodeMirror 6 ベースの高性能エディター
- HTML構文のシンタックスハイライト
- 自動タグクローズ機能
- 行番号表示とアクティブライン強調
- テーマ切り替え対応

#### Props
```typescript
interface HtmlEditorProps {
  value: string;           // 表示するHTMLコンテンツ
  onChange: (value: string) => void;  // 変更時のコールバック
}
```

#### 特徴
- CSS Variables による動的テーマ適用
- カスタムエディターテーマ（涼雅・夜涼対応）
- レスポンシブ対応の高さ設定

---

### [`LivePreview.tsx`](LivePreview.tsx)
**リアルタイムプレビューコンポーネント**

#### 機能
- HTMLコンテンツのリアルタイム表示
- インライン編集機能（contentEditable）
- DOM変更の監視と同期
- 編集可能要素の視覚的フィードバック

#### Props
```typescript
interface LivePreviewProps {
  htmlContent: string;     // 表示するHTMLコンテンツ
  onHtmlChange: (newHtml: string) => void;  // HTML変更時のコールバック
}
```

#### 編集可能要素
- `P`, `H1-H6`, `LI`, `SPAN`, `STRONG`, `EM`, `TD`, `TH`, `FIGCAPTION`, `BLOCKQUOTE`, `PRE`

#### 技術的特徴
- MutationObserver による効率的なDOM監視
- プレーンテキストペースト強制
- 内部変更と外部変更の区別管理

---

### [`Navbar.tsx`](Navbar.tsx)
**ナビゲーションバーコンポーネント**

#### 機能
- アプリケーションのブランディング表示
- テーマ切り替えボタン
- 保存ボタン（将来的な機能拡張用）
- 固定ヘッダーレイアウト

#### Props
```typescript
interface NavbarProps {
  onThemeToggle?: () => void;  // テーマ切り替え時のコールバック（オプション）
}
```

#### テーマ管理
- localStorage での設定永続化
- data-theme属性による即座の切り替え
- 涼雅/夜涼テーマの日本語表記

## 🎨 共通デザイン原則

### スタイリング
- CSS Variables による統一的なテーマ適用
- TailwindCSS クラスとカスタムCSS の組み合わせ
- 和モダンデザインの美的要素

### アニメーション
- フローティングエフェクト（アイコン）
- フェードインアニメーション（コンテナ）
- スムーズなテーマ切り替えトランジション

### レスポンシブ対応
- モバイルファーストアプローチ
- 768px ブレークポイントでの最適化
- タッチデバイス対応のインタラクション

## 🔄 コンポーネント間通信

### データフロー
```
App (page.tsx)
├── htmlContent (state)
├── HtmlEditor
│   └── onChange → setHtmlContent
├── LivePreview
│   └── onHtmlChange → setHtmlContent
└── Navbar
    └── テーマ状態管理（独立）
```

### 状態管理パターン
- **Props Down:** 親から子へのデータ受け渡し
- **Events Up:** 子から親への変更通知
- **Local State:** コンポーネント固有の状態（テーマなど）

## 🚀 パフォーマンス最適化

### メモ化戦略
- `useCallback` でコールバック関数を最適化
- `useRef` で DOM 参照と状態管理を分離
- 不要な再レンダリングの防止

### DOM操作最適化
- MutationObserver による効率的な監視
- debounce 処理による過度な更新防止
- 最小限のDOM操作での同期実現

## 🔧 カスタマイズガイド

### 新しいエディター機能の追加
1. CodeMirror extensionsの拡張
2. カスタムテーマの適用
3. 追加のキーバインディング

### プレビュー機能の拡張
1. 編集可能要素の追加（`isEditable`関数を更新）
2. カスタム編集UI の実装
3. より高度なDOM操作サポート

### テーマシステムの拡張
1. 新しいCSS Variables の定義
2. 追加テーマの実装
3. アニメーション効果の追加

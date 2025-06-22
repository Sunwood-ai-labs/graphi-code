import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script"; // Import Script component for external scripts

export const metadata: Metadata = {
  title: "Forgejo認証TODOアプリ：高度編集対応サムネイル - 涼雅サムネイル",
  description: "オープンソースGitサーバーと連携したタスク管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* ナビゲーションバー */}
        <nav className="navbar">
          <div className="nav-brand kaisei-decol-bold">
            <i className="fas fa-wave-square"></i>
            涼雅サムネイル
          </div>
          <div className="nav-buttons">
            <button id="themeToggle" className="nav-btn m-plus-rounded-1c-regular">
              <i className="fas fa-sun"></i>
              <span>夜涼</span>
            </button>
            <button id="toggleEdit" className="nav-btn m-plus-rounded-1c-regular">
              <i className="fas fa-edit"></i>
              <span>編集モード</span>
            </button>
          </div>
        </nav>

        {/* メインコンテンツエリア */}
        {/* The main content will be rendered by page.tsx */}
        <main style={{ marginTop: "80px" }}>{children}</main>

        {/* アイコン選択モーダル */}
        <div id="iconModal" className="icon-modal">
          <div className="icon-modal-content">
            <button id="modalCloseButton" className="modal-close">&times;</button>
            <h3 className="modal-header">アイコンを選択してください</h3>
            <div className="icon-grid" id="iconGrid">
              {/* アイコンオプションはJavaScriptで動的生成 */}
            </div>
          </div>
        </div>

        {/* Script for interactivity will be in page.tsx or a separate component */}
      </body>
    </html>
  );
}

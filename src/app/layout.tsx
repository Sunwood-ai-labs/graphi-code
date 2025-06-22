import type { Metadata } from "next";
import "./globals.css"; // We'll create this next

export const metadata: Metadata = {
  title: "Grareco Editor",
  description: "HTML editor with live preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"> {/* lang属性をjaに変更 */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Shippori+Mincho:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

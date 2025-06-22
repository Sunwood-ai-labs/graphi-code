import type { Metadata } from "next";
import "./globals.css";
// Script component is not strictly needed here if theme toggle logic is in page.tsx or a client component in layout
// import Script from "next/script";

export const metadata: Metadata = {
  title: "涼雅エディタ (Ryōga Editor)", // Updated title
  description: "HTML editor with live preview, styled with Ryōga theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang="ja" will be set via useEffect in a client component if needed, or default to "en"
    // data-theme will also be managed by a client component
    <html lang="en">
      <head>
        {/* Charset and viewport are usually handled by Next.js automatically but can be explicit */}
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
          crossOrigin="anonymous" // React expects "anonymous" not empty string for crossOrigin
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Navbar structure from example */}
        <nav className="navbar">
          <div className="nav-brand kaisei-decol-bold">
            <i className="fas fa-wave-square"></i>
            <span>涼雅エディタ</span> {/* App Name */}
          </div>
          <div className="nav-buttons">
            {/* Theme toggle button - ID is important for JS interaction */}
            <button id="themeToggle" className="nav-btn m-plus-rounded-1c-regular">
              <i className="fas fa-sun"></i>
              <span>夜涼</span> {/* Initial text: Toggle to Dark (Yoryo) */}
            </button>
            {/* No "Edit Mode" button from example, as editor is always active */}
          </div>
        </nav>
        {/* main-content-area class added for potential global styling of the content region */}
        <main className="main-content-area">{children}</main>
        {/*
          No icon modal from example, as it's not part of the editor theme.
          Theme toggle script will be in page.tsx or a dedicated client component.
        */}
      </body>
    </html>
  );
}

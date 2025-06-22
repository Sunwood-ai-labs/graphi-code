"use client";

import React, { useState, useCallback, useEffect } from 'react';
import HtmlEditor from '@/components/HtmlEditor';
import LivePreview from '@/components/LivePreview';

export default function EditorPage() {
  const [htmlContent, setHtmlContent] = useState(
    "<h1>Welcome to Ryōga Editor!</h1>\n" + // Updated welcome message
    "<p>Edit the HTML here and see the live preview!</p>\n" +
    "<ul>\n  <li>Themed list item 1</li>\n  <li>Themed list item 2</li>\n</ul>\n" +
    "<div><p>A paragraph inside a div, now themed.</p></div>\n" +
    "<p>Enjoy the <strong>Ryōga</strong> theme with <em>dynamic styling</em>.</p>" +
    "<style>\n" +
    "  /* Example styles that will be in preview */\n" +
    "  body { font-family: sans-serif; padding: 10px; }\n" + // Basic style for preview content
    "  h1 { color: var(--current-primary); margin-bottom: 0.5em; font-family: 'Kaisei Decol', serif; }\n" + // Themed h1 in preview
    "  p { color: var(--current-text-secondary); line-height: 1.6; }\n" +
    "  ul { border-left: 3px solid var(--current-accent); padding-left: 15px; }\n" +
    "</style>"
  );

  const [isDark, setIsDark] = useState(false); // State for theme

  // Theme toggling logic
  const toggleTheme = useCallback(() => {
    setIsDark(prevIsDark => !prevIsDark);
  }, []);

  useEffect(() => {
    // Set initial theme based on user preference or default
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // setIsDark(prefersDark); // Optional: set initial theme based on OS preference
    // For now, default to light unless toggled.
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.lang = 'ja'; // Set lang to Japanese
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      const icon = themeBtn.querySelector('i');
      const text = themeBtn.querySelector('span');
      if (icon && text) {
        if (isDark) {
          icon.className = 'fas fa-moon';
          text.textContent = '涼雅'; // Toggle to Light (Ryōga)
        } else {
          icon.className = 'fas fa-sun';
          text.textContent = '夜涼'; // Toggle to Dark (Yoryo)
        }
      }
      // Ensure button styles update if they depend on CSS variables that change with theme
      // This might require the button style itself to use var(--current-accent) etc.
      // Forcing a style refresh if needed, though CSS variables should handle this:
      // themeBtn.style.backgroundColor = ''; // Clear to re-apply CSS
      // themeBtn.style.color = '';
    }
  }, [isDark]);

  // Add event listener for the theme toggle button in the navbar
  useEffect(() => {
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
    return () => {
      if (themeBtn) {
        themeBtn.removeEventListener('click', toggleTheme);
      }
    };
  }, [toggleTheme]);


  const handleEditorChange = useCallback((value: string) => {
    setHtmlContent(value);
  }, []);

  const handlePreviewChange = useCallback((newHtml: string) => {
    setHtmlContent(newHtml);
  }, []);

  return (
    // Removed h-screen and bg-gray-100, relying on globals.css for body background and layout flex.
    // The main-content-area in layout.tsx is now the flex container.
    // Added editor-preview-pane for potential shared styling if needed.
    // Tailwind classes like w-1/2, border-r, flex, flex-col are kept for structure.
    // These will be themed by the global CSS and variable overrides.
    <div className="flex flex-grow md:flex-row flex-col editor-preview-pane"> {/* flex-grow needed if parent is flex */}
      {/* Left Column: HTML Editor */}
      {/* editor-preview-pane class for border and background theming */}
      <div className="w-full md:w-1/2 h-auto md:h-full border-r flex flex-col editor-preview-pane">
        <h2 className="section-header">HTML Editor</h2>
        <div className="flex-grow overflow-auto"> {/* Ensure this div takes up space */}
          <HtmlEditor value={htmlContent} onChange={handleEditorChange} />
        </div>
      </div>

      {/* Right Column: Live Preview */}
      <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col editor-preview-pane">
        <h2 className="section-header">Live Preview</h2>
        {/* Use the LivePreview component */}
        <div className="flex-grow overflow-auto live-preview-container">
          <LivePreview htmlContent={htmlContent} onHtmlChange={handlePreviewChange} />
        </div>
      </div>
    </div>
  );
}

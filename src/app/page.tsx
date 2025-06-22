"use client";

import React, { useState, useCallback } from 'react';
import HtmlEditor from '@/components/HtmlEditor';
import LivePreview from '@/components/LivePreview'; // Import the new LivePreview component

export default function EditorPage() {
  const [htmlContent, setHtmlContent] = useState(
    "<h1>Welcome to Grareco Editor!</h1>\n" +
    "<p>You can edit this text directly in the preview!</p>\n" +
    "<ul>\n  <li>List item 1 (also editable)</li>\n  <li>List item 2</li>\n</ul>\n" +
    "<div><p>Paragraph inside a div (editable)</p></div>\n" +
    "<p>A <strong>bold</strong> and an <em>italic</em> text.</p>" +
    "<style>\n  /* You can add styles here too! */\n  p {\n    /* color: blue; */ /* Disabled for better visibility of default styles */\n  }\n h1 { margin-bottom: 0.5em;}\n</style>"
  );

  // Called when CodeMirror content changes
  const handleEditorChange = useCallback((value: string) => {
    setHtmlContent(value);
  }, []);

  // Called when LivePreview content changes
  const handlePreviewChange = useCallback((newHtml: string) => {
    setHtmlContent(newHtml);
  }, []);

  return (
    // Use flex-grow to take available space within main-content-area (defined in layout)
    // flex-row ensures side-by-side. Removed h-screen and bg-gray-100.
    <div className="flex flex-row flex-grow">
      {/* Left Column: HTML Editor */}
      {/* Applied .editor-preview-pane for consistent theming (border, bg) from globals.css */}
      <div className="w-1/2 h-full flex flex-col editor-preview-pane">
        {/* section-header will be themed by globals.css */}
        <h2 className="section-header">HTML Editor</h2> {/* Removed Tailwind classes, rely on .section-header */}
        <div className="editor-component-wrapper"> {/* Wrapper for specific editor styling if needed */}
          <HtmlEditor value={htmlContent} onChange={handleEditorChange} />
        </div>
      </div>

      {/* Right Column: Live Preview */}
      <div className="w-1/2 h-full flex flex-col editor-preview-pane">
        <h2 className="section-header">Live Preview</h2> {/* Removed Tailwind classes */}
        <div className="live-preview-wrapper"> {/* Wrapper for specific preview styling */}
          <LivePreview htmlContent={htmlContent} onHtmlChange={handlePreviewChange} />
        </div>
      </div>
    </div>
  );
}

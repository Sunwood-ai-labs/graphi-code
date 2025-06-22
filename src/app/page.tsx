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
    <div className="flex h-screen bg-gray-100">
      {/* Left Column: HTML Editor */}
      <div className="w-1/2 h-full border-r border-gray-300 flex flex-col">
        <h2 className="text-lg font-semibold p-4 bg-white border-b border-gray-300">HTML Editor</h2>
        <div className="flex-grow overflow-auto">
          <HtmlEditor value={htmlContent} onChange={handleEditorChange} />
        </div>
      </div>

      {/* Right Column: Live Preview */}
      <div className="w-1/2 h-full flex flex-col">
        <h2 className="text-lg font-semibold p-4 bg-white border-b border-gray-300">Live Preview</h2>
        {/* Use the LivePreview component */}
        <LivePreview htmlContent={htmlContent} onHtmlChange={handlePreviewChange} />
      </div>
    </div>
  );
}

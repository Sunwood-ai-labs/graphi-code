"use client";

import React, { useState, useCallback } from 'react';
import HtmlEditor from '@/components/HtmlEditor';
import LivePreview from '@/components/LivePreview';
import Navbar from '@/components/Navbar';

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

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result;
        if (typeof fileContent === 'string') {
          setHtmlContent(fileContent); // 読み込んだ内容でstateを更新
          console.log("HTML file imported and content updated.");
        } else {
          alert("Could not read file content.");
        }
      };
      reader.onerror = () => {
        alert("Error reading file.");
      };
      reader.readAsText(file);
    } else if (file) {
      alert("Please select an HTML file.");
    }
    // Reset file input to allow selecting the same file again
    event.target.value = '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="main-content-area flex flex-col md:flex-row flex-grow">
        {/* Left Column: HTML Editor */}
        <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col editor-preview-pane border-r">
          <div className="section-header">
            <div className="flex items-center gap-2">
              <i className="fas fa-code"></i>
              <h2>HTML Editor</h2>
            </div>
            <div className="flex items-center">
              <input
                type="file"
                id="htmlFileInput"
                accept=".html,text/html"
                onChange={handleFileImport}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => document.getElementById('htmlFileInput')?.click()}
                className="nav-btn nav-btn-secondary"
                title="Import HTML file"
              >
                <i className="fas fa-file-import"></i>
                Import
              </button>
            </div>
          </div>
          <div className="editor-component-wrapper flex-grow">
            <HtmlEditor value={htmlContent} onChange={handleEditorChange} />
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col editor-preview-pane">
          <div className="section-header">
            <div className="flex items-center gap-2">
              <i className="fas fa-eye"></i>
              <h2>Live Preview</h2>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-edit" title="Click elements to edit"></i>
            </div>
          </div>
          <div className="live-preview-wrapper flex-grow">
            <LivePreview htmlContent={htmlContent} onHtmlChange={handlePreviewChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

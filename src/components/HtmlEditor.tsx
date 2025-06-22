"use client";

import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { EditorView } from '@codemirror/view'; // To use EditorView.theme

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ value, onChange }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
      setIsDarkTheme(document.documentElement.getAttribute('data-theme') === 'dark');
    }
  }, []);

  return (
    <CodeMirror
      value={value}
      height="100%"
      extensions={[
        html({ autoCloseTags: true, matchClosingTags: true }),
        EditorView.theme({ // Theme object for CodeMirror
          '&': {
            color: 'var(--current-text-primary)',
            backgroundColor: 'var(--current-bg-secondary)', // Editor background
            height: '100%', // Ensure it fills container
            fontSize: '14px',
          },
          '.cm-content': {
            caretColor: 'var(--current-accent)',
            fontFamily: "'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New', monospace", // Monospaced font for code
          },
          '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: 'var(--current-accent)',
          },
          '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
            backgroundColor: 'var(--current-primary-alpha-30, rgba(2, 94, 115, 0.3))', // Use themed selection color
          },
          '.cm-gutters': {
            backgroundColor: 'var(--current-bg-secondary)', // Gutter background
            color: 'var(--current-text-secondary)', // Line numbers color
            borderRight: '1px solid var(--current-border-color)',
          },
          '.cm-activeLineGutter': {
            backgroundColor: 'var(--current-primary-alpha-20, rgba(2, 94, 115, 0.2))', // Active line gutter background
          },
          '.cm-line': {
            // padding: '0 2px 0 4px', // Default padding
          },
          '.cm-activeLine': {
            backgroundColor: 'var(--current-primary-alpha-10, rgba(2, 94, 115, 0.1))', // Active line background
          },
          '.cm-matchingBracket, .cm-nonmatchingBracket': {
            backgroundColor: 'var(--current-accent-alpha-20, rgba(4, 191, 173, 0.2))',
            outline: '1px solid var(--current-accent-alpha-50, rgba(4, 191, 173, 0.5))',
          },
          // Syntax highlighting will be primarily handled by globals.css for now
          // or a more specific CodeMirror language theme if adopted later.
        }, {dark: isDarkTheme}) // Use state variable
      ]}
      onChange={onChange}
      // theme prop can be 'light', 'dark', or a custom theme object.
      // We are applying most base styles directly via EditorView.theme extension.
      // Setting theme to 'light' or 'dark' here might load some default styles we don't want.
      // theme={document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'} // Or keep okaidia and override
      style={{  // General styles for the wrapper div if needed, height is important
        height: '100%',
        border: '1px solid var(--current-border-color)', // Border for the editor component itself
      }}
      basicSetup={{
        foldGutter: true, // Keep this for functionality
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        lineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default HtmlEditor;

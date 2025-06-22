"use client";

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { okaidia } from '@uiw/codemirror-theme-okaidia'; // Using okaidia theme

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height="100%" // Make editor take full height of its container
      extensions={[html({ autoCloseTags: true, matchClosingTags: true })]}
      onChange={onChange}
      theme={okaidia} // Apply the okaidia theme
      style={{ fontSize: '14px' }} // Consistent font size
      basicSetup={{
        foldGutter: true,
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

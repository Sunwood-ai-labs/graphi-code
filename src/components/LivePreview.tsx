"use client";

import React, { useEffect, useRef, useCallback } from 'react';

interface LivePreviewProps {
  htmlContent: string;
  onHtmlChange: (newHtml: string) => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({ htmlContent, onHtmlChange }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const internalChangeRef = useRef(false); // Ref to track internal changes

  const isEditable = (element: HTMLElement): boolean => {
    // Ensure this function only executes expensive DOM/style calculations on the client
    if (typeof window === 'undefined') {
      return false;
    }
    const editableTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'SPAN', 'STRONG', 'EM', 'TD', 'TH', 'FIGCAPTION', 'BLOCKQUOTE', 'PRE'];
    // editableTags に含まれていれば、子要素の型に関わらず編集可能とする
    return editableTags.includes(element.tagName);
  };

  const makeContentEditable = useCallback((rootElement: HTMLElement) => {
    const elementsToProcess: HTMLElement[] = [rootElement, ...Array.from(rootElement.querySelectorAll<HTMLElement>('*'))];
    elementsToProcess.forEach(element => {
      if (isEditable(element)) {
        if (element.contentEditable !== 'true') { // Apply only if not already set
            element.contentEditable = 'true';
        }
        element.dataset.editable = 'true';
        // Visual cues will be handled by CSS for thematic consistency
        // element.style.outline = '1px dashed var(--current-accent)';
        // element.style.cursor = 'text';

        // Prevent rich text pasting, force plain text - attach only once
        if (!element.dataset.pasteListenerAttached) {
            element.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = e.clipboardData?.getData('text/plain');
                if (text) {
                document.execCommand('insertText', false, text);
                }
            });
            element.dataset.pasteListenerAttached = 'true';
        }
      } else {
        // Ensure non-editable elements are not accidentally editable
        if (element.contentEditable === 'true' && !element.dataset.editable) {
            element.contentEditable = 'false';
        }
      }
    });
  }, []);


  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (previewRef.current) {
      if (!internalChangeRef.current) {
        // External change (e.g., from CodeMirror), so update innerHTML
        previewRef.current.innerHTML = htmlContent;
        makeContentEditable(previewRef.current);
      }
      // If it was an internal change, DOM is already up-to-date.
      // Reset the flag after potential update or if no update was needed.
      internalChangeRef.current = false;

      const observer = new MutationObserver((mutationsList) => {
        let changedByEditable = false;
        for (const mutation of mutationsList) {
          if (mutation.type === 'characterData' || mutation.type === 'childList') {
            let targetElement = mutation.target.nodeType === Node.ELEMENT_NODE ? mutation.target as HTMLElement : mutation.target.parentElement;
            while(targetElement && targetElement !== previewRef.current) {
                if (targetElement.isContentEditable) {
                    changedByEditable = true;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
          }
          if (changedByEditable) break;
        }

        if (changedByEditable && previewRef.current) {
          const clonedPreview = previewRef.current.cloneNode(true) as HTMLDivElement;
          clonedPreview.querySelectorAll('[data-editable="true"]').forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.removeAttribute('contentEditable');
            htmlEl.removeAttribute('data-editable');
            htmlEl.removeAttribute('data-paste-listener-attached');
            // CSS will handle visual cues, so no style cleanup needed here for outline/cursor
          });

          const newHtml = clonedPreview.innerHTML;
          if (newHtml !== htmlContent) {
            internalChangeRef.current = true; // Mark that the upcoming change is internal
            onHtmlChange(newHtml);
          }
        }
      });

      observer.observe(previewRef.current, {
        subtree: true,
        childList: true,
        characterData: true,
        // characterDataOldValue: true, // Not strictly needed if just detecting change
      });
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [htmlContent, onHtmlChange, makeContentEditable]);

  // Initial setup for content editable elements, runs once after mount
  useEffect(() => {
    if (previewRef.current) {
        makeContentEditable(previewRef.current);
    }
  }, [makeContentEditable]); // makeContentEditable is stable due to useCallback


  return (
    <div
      ref={previewRef}
      className="flex-grow p-2 overflow-auto" // Removed default border, bg, rounded, m-4. These will come from live-preview-container class in globals.css
      // CSS class for editable visual cues:
      // [contenteditable="true"][data-editable="true"] { outline: 1px dashed var(--current-accent); cursor: text; }
    />
  );
};

export default LivePreview;

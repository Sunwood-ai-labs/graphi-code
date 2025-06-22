"use client";

import React, { useEffect, useRef, useCallback } from 'react';

interface LivePreviewProps {
  htmlContent: string;
  onHtmlChange: (newHtml: string) => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({ htmlContent, onHtmlChange }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const isEditable = (element: HTMLElement): boolean => {
    const editableTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'SPAN', 'STRONG', 'EM', 'TD', 'TH', 'FIGCAPTION', 'BLOCKQUOTE', 'PRE'];
    // Check if the element itself is one of the editable tags
    if (editableTags.includes(element.tagName)) {
        // Further check: ensure it doesn't primarily contain other block elements (e.g., a P tag with a DIV inside)
        // This is a simple check; more robust parsing might be needed for complex cases.
        const hasBlockChildren = Array.from(element.children).some(child => {
            const displayStyle = window.getComputedStyle(child).display;
            return ['block', 'list-item', 'table', 'flex', 'grid'].includes(displayStyle);
        });
        return !hasBlockChildren;
    }
    return false;
  };

  const makeContentEditable = useCallback((element: HTMLElement) => {
    if (isEditable(element)) {
      element.contentEditable = 'true';
      element.dataset.editable = 'true'; // Mark as editable
      element.style.outline = '1px dashed #ccc'; // Visual cue, temporary
      element.style.cursor = 'text';

      // Prevent rich text pasting, force plain text
      element.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        if (text) {
          document.execCommand('insertText', false, text);
        }
      });
    }
    element.childNodes.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        makeContentEditable(child as HTMLElement);
      }
    });
  }, []);


  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (previewRef.current) {
      // Set initial content
      previewRef.current.innerHTML = htmlContent;
      // Make relevant parts editable
      makeContentEditable(previewRef.current);

      // Observe changes to contentEditable elements
      const observer = new MutationObserver((mutationsList) => {
        let changed = false;
        for (const mutation of mutationsList) {
          if (mutation.type === 'characterData' || mutation.type === 'childList') {
            // Check if the change occurred within a contentEditable element or its children
            let targetElement = mutation.target.nodeType === Node.ELEMENT_NODE ? mutation.target as HTMLElement : mutation.target.parentElement;
            while(targetElement && targetElement !== previewRef.current) {
                if (targetElement.isContentEditable) {
                    changed = true;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
          }
          if (changed) break;
        }

        if (changed && previewRef.current) {
          // Create a clone to strip our editing artifacts before getting HTML
          const clonedPreview = previewRef.current.cloneNode(true) as HTMLDivElement;
          clonedPreview.querySelectorAll('[data-editable="true"]').forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.removeAttribute('contentEditable');
            htmlEl.removeAttribute('data-editable');
            htmlEl.style.outline = '';
            htmlEl.style.cursor = '';
            // Remove paste event listeners if they were attached (more complex, skip for now for simplicity)
          });
          // Remove our visual cues from non-editable elements too if any
          clonedPreview.querySelectorAll('[style*="outline:"]').forEach(el => {
            (el as HTMLElement).style.outline = '';
            (el as HTMLElement).style.cursor = '';
          });


          const newHtml = clonedPreview.innerHTML;
          // Avoid feedback loop if htmlContent is already same as newHtml
          // This is a basic check. More sophisticated diffing might be needed.
          if (newHtml !== htmlContent) {
            // Temporarily disconnect observer to prevent loop during programmatic update
            observer.disconnect();
            onHtmlChange(newHtml);
            // Re-observe after the state update cycle (if htmlContent changes and re-renders)
            // This will be handled by the useEffect re-running due to htmlContent change
          }
        }
      });

      observer.observe(previewRef.current, {
        subtree: true,
        childList: true,
        characterData: true,
        characterDataOldValue: true, // Needed for some cases
      });
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  // Re-run when htmlContent changes from editor OR onHtmlChange callback changes (less likely but good practice)
  // IMPORTANT: If onHtmlChange causes htmlContent to update, this useEffect will run again.
  // The observer is disconnected and reconnected to apply changes and re-enable editing.
  // The check `if (newHtml !== htmlContent)` is crucial to prevent infinite loops.
  }, [htmlContent, onHtmlChange, makeContentEditable]);


  return (
    <div
      ref={previewRef}
      className="flex-grow border border-gray-300 rounded m-4 p-2 overflow-auto bg-white"
      // dangerouslySetInnerHTML is no longer used here directly; content is managed via ref
    />
  );
};

export default LivePreview;

"use client";

import React, { useEffect, useState, useCallback } from 'react';

export default function ThumbnailPage() {
  // State for edit mode
  const [editing, setEditing] = useState(false);
  // State for current icon being edited
  const [currentEditingIconElement, setCurrentEditingIconElement] = useState<HTMLElement | null>(null);
  // State for theme (light/dark)
  const [isDark, setIsDark] = useState(false);

  // Icon categories (can be moved to a config file or constants)
  const iconCategories: { [key: string]: string[] } = {
    main: ['fa-code-branch', 'fa-rocket', 'fa-magic', 'fa-star', 'fa-crown', 'fa-fire'],
    subtitle: ['fa-server', 'fa-cloud', 'fa-database', 'fa-cogs', 'fa-network-wired', 'fa-microchip'],
    badge: ['fa-shield-alt', 'fa-tasks', 'fa-code', 'fa-lock', 'fa-key', 'fa-certificate'],
    visual: ['fa-project-diagram', 'fa-sitemap', 'fa-chart-line', 'fa-cube', 'fa-atom', 'fa-brain'],
    secondary: ['fa-database', 'fa-sync-alt', 'fa-mobile-alt', 'fa-desktop', 'fa-tablet', 'fa-laptop'],
    feature: ['fa-lock', 'fa-filter', 'fa-chart-bar', 'fa-palette', 'fa-tools', 'fa-gem'],
    decoration: ['fa-leaf', 'fa-star', 'fa-sparkles', 'fa-sun', 'fa-moon', 'fa-heart']
  };

  const toggleEditMode = () => {
    setEditing(!editing);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const openIconModal = (event: React.MouseEvent<HTMLElement>) => {
    if (!editing) return;
    setCurrentEditingIconElement(event.currentTarget as HTMLElement);
    const modal = document.getElementById('iconModal');
    if (modal) {
      modal.classList.add('show');
    }
  };

  const closeIconModal = useCallback(() => {
    const modal = document.getElementById('iconModal');
    if (modal) {
      modal.classList.remove('show');
    }
    setCurrentEditingIconElement(null);
  }, []);

  const selectIcon = (iconClass: string) => {
    if (currentEditingIconElement) {
      const iconElement = currentEditingIconElement.querySelector('i');
      if (iconElement) {
        iconElement.className = `fas ${iconClass}`;
      }
    }
    closeIconModal();
  };

  // Drag and Drop states and handlers
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
    if (!editing) return;
    setDraggedElement(event.currentTarget as HTMLElement);
    event.currentTarget.classList.add('dragging');
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    if (!editing) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    if (target.classList.contains('editable-icon')) {
      target.classList.add('drop-zone');
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    if (!editing) return;
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drop-zone');
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    if (!editing) return;
    event.preventDefault();
    const dropTarget = (event.currentTarget as HTMLElement).closest('.editable-icon') as HTMLElement;

    if (dropTarget && draggedElement && dropTarget !== draggedElement) {
      const draggedIconTag = draggedElement.querySelector('i');
      const targetIconTag = dropTarget.querySelector('i');

      if (draggedIconTag && targetIconTag) {
        const draggedIconClass = draggedIconTag.className;
        const targetIconClass = targetIconTag.className;

        draggedIconTag.className = targetIconClass;
        targetIconTag.className = draggedIconClass;
      }
    }

    document.querySelectorAll('.dragging, .drop-zone').forEach(el => {
      el.classList.remove('dragging', 'drop-zone');
    });
    setDraggedElement(null);
  };


  // Effect for managing body class and theme attribute
  useEffect(() => {
    document.body.classList.toggle('editing', editing);
    const editBtn = document.getElementById('toggleEdit');
    const editIcon = editBtn?.querySelector('i');
    const editText = editBtn?.querySelector('span');

    if (editBtn && editIcon && editText) {
      if (editing) {
        editIcon.className = 'fas fa-save';
        editText.textContent = '保存';
        editBtn.style.background = 'var(--current-neon)';
        editBtn.style.color = 'var(--current-primary)';
      } else {
        editIcon.className = 'fas fa-edit';
        editText.textContent = '編集モード';
        editBtn.style.background = 'var(--current-primary)';
        editBtn.style.color = 'white';
      }
    }
  }, [editing]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = themeBtn?.querySelector('i');
    const themeText = themeBtn?.querySelector('span');

    if (themeBtn && themeIcon && themeText) {
      if (isDark) {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = '涼雅';
      } else {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = '夜涼';
      }
      // Update button background after theme change
      setTimeout(() => {
          themeBtn.style.background = 'var(--current-accent)';
          const editBtn = document.getElementById('toggleEdit');
          if (editBtn && !editing) {
            editBtn.style.background = 'var(--current-primary)';
          }
      }, 50);
    }
  }, [isDark, editing]);

  // Effect for icon modal population and event listeners
  useEffect(() => {
    const modal = document.getElementById('iconModal');
    const iconGrid = document.getElementById('iconGrid');
    const modalCloseButton = document.getElementById('modalCloseButton');

    if (modal && iconGrid && currentEditingIconElement) {
      const iconType = currentEditingIconElement.dataset.iconType || 'main';
      iconGrid.innerHTML = ''; // Clear previous icons

      const iconsToDisplay = iconCategories[iconType] || iconCategories.main;
      iconsToDisplay.forEach(iconClass => {
        const iconOption = document.createElement('div');
        iconOption.className = 'icon-option';
        iconOption.innerHTML = `<i class="fas ${iconClass}"></i>`;
        iconOption.onclick = () => selectIcon(iconClass);
        iconGrid.appendChild(iconOption);
      });
    }

    const handleModalClickOutside = (event: MouseEvent) => {
      if (event.target === modal) {
        closeIconModal();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modal?.classList.contains('show')) {
        closeIconModal();
      }
    };

    modalCloseButton?.addEventListener('click', closeIconModal);
    modal?.addEventListener('click', handleModalClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      modalCloseButton?.removeEventListener('click', closeIconModal);
      modal?.removeEventListener('click', handleModalClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [currentEditingIconElement, closeIconModal, iconCategories]);

  // Effect for navbar button handlers
  useEffect(() => {
    const themeBtn = document.getElementById('themeToggle');
    const editBtn = document.getElementById('toggleEdit');

    themeBtn?.addEventListener('click', toggleTheme);
    editBtn?.addEventListener('click', toggleEditMode);

    return () => {
      themeBtn?.removeEventListener('click', toggleTheme);
      editBtn?.removeEventListener('click', toggleEditMode);
    };
    // toggleTheme and toggleEditMode are stable due to useState, but include if they change
  }, []);


  return (
    <div className="thumbnail-container">
      <div className="summer-effect editable-icon" data-icon-type="decoration" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
        <i className="fas fa-leaf"></i>
      </div>

      <div className="title-section">
        <h1 className="main-title kaisei-decol-bold">
          <div className="title-icon editable-icon" data-icon-type="main" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
            <i className="fas fa-code-branch"></i>
          </div>
          Forgejo認証TODOアプリ
        </h1>
        <h2 className="sub-title m-plus-rounded-1c-regular">
          <i className="fas fa-server editable-icon" data-icon-type="subtitle" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
          オープンソースGitサーバーと連携した<br/>タスク管理システム
        </h2>

        <div className="tech-badges">
          <div className="badge">
            <i className="fas fa-shield-alt editable-icon" data-icon-type="badge" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
            認証システム
          </div>
          <div className="badge">
            <i className="fas fa-tasks editable-icon" data-icon-type="badge" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
            TODO管理
          </div>
          <div className="badge">
            <i className="fas fa-code editable-icon" data-icon-type="badge" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
            Vanilla JS
          </div>
        </div>
      </div>

      <div className="visual-section">
        <div className="main-graphic editable-icon" data-icon-type="visual" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
          <i className="fas fa-project-diagram"></i>
        </div>

        <div className="secondary-icons">
          <i className="fas fa-database editable-icon" data-icon-type="secondary" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
          <i className="fas fa-sync-alt editable-icon" data-icon-type="secondary" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
          <i className="fas fa-mobile-alt editable-icon" data-icon-type="secondary" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
        </div>
      </div>

      <div className="points-section">
        <div className="feature-point">
          <i className="fas fa-lock editable-icon" data-icon-type="feature" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
          <span>Basic認証 & APIトークン対応</span>
        </div>

        <div className="feature-point">
          <i className="fas fa-filter editable-icon" data-icon-type="feature" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
          <span>優先度別フィルタリング機能</span>
        </div>

        <div className="feature-point">
          <i className="fas fa-chart-bar editable-icon" data-icon-type="feature" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
          <span>リアルタイム統計表示</span>
        </div>

        <div className="feature-point">
          <i className="fas fa-palette editable-icon" data-icon-type="feature" onClick={openIconModal} draggable={editing} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}></i>
          <span>レスポンシブUI/UX</span>
        </div>
      </div>
    </div>
  );
}

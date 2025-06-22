"use client";

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onThemeToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeToggle }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const theme = newTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (onThemeToggle) onThemeToggle();
  };

  return (
    <nav className="navbar">
      <div className="nav-brand kaisei-decol-bold">
        <i className="fas fa-code"></i>
        Graphi Code
      </div>
      
      <div className="nav-buttons">
        <button onClick={toggleTheme} className="nav-btn m-plus-rounded-1c-regular">
          <i className={isDark ? "fas fa-moon" : "fas fa-sun"}></i>
          <span>{isDark ? "涼雅" : "夜涼"}</span>
        </button>
        
        <button className="nav-btn nav-btn-secondary m-plus-rounded-1c-regular">
          <i className="fas fa-save"></i>
          <span>保存</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Tent as Tennis } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/todos') return 'Priority Tasks';
    if (path === '/players') return 'Players Database';
    if (path === '/training') return 'Training Journal';
    if (path === '/statistics') return 'Statistics';
    return 'Tennis Tracker';
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('tennis-tracker-theme', darkMode ? 'light' : 'dark');
  };

  // Initialize theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('tennis-tracker-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
              <span className="sr-only">Open menu</span>
            </button>
            <div className="flex items-center ml-2 lg:ml-0">
              <Tennis className="h-8 w-8 text-primary-500" />
              <h1 className="ml-2 text-xl font-semibold hidden sm:block">Tennis Tracker</h1>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
              {getPageTitle()}
            </h2>
          </div>

          <div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span className="sr-only">Toggle dark mode</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

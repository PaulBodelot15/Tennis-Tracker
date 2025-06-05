import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Users, CalendarRange, BarChart3, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/todos', icon: <CheckSquare size={20} />, label: 'Priority Tasks' },
    { to: '/players', icon: <Users size={20} />, label: 'Players' },
    { to: '/training', icon: <CalendarRange size={20} />, label: 'Training' },
    { to: '/statistics', icon: <BarChart3 size={20} />, label: 'Statistics' },
  ];

  const navClass = `fixed inset-y-0 left-0 transform bg-white dark:bg-gray-800 w-64 z-20 shadow-lg 
    transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;

  const activeClass = "bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400";
  const inactiveClass = "text-gray-600 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-10 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={navClass}>
        <div className="flex justify-end p-4 lg:hidden">
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <X size={20} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            {navItems.map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink 
                  to={to} 
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${isActive ? activeClass : inactiveClass}`
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                >
                  {icon}
                  <span className="font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

import React, { useState, useEffect, useRef } from 'react';
import type { User } from '../types';
import { MenuIcon } from './icons/MenuIcon';
import { Logo } from './icons/Logo';
import { SearchIcon } from './icons/SearchIcon';
import { XIcon } from './icons/XIcon';

interface HeaderProps {
  currentUser: User;
  onLogoClick: () => void;
  onToggleSidebar: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogoClick, onToggleSidebar, onProfileClick, onLogout, searchQuery, onSearchChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Abrir menú"
            >
              <MenuIcon />
            </button>
            <div 
              className={`flex-shrink-0 flex items-center cursor-pointer ml-2 md:ml-0 ${isSearchVisible ? 'hidden' : 'flex'} md:flex`}
              onClick={onLogoClick}
            >
              <Logo className="h-8 w-8 text-blue-500" />
              <span className="hidden sm:block ml-2 font-bold text-xl text-slate-800">RAU</span>
            </div>
          </div>

          <div className={`flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start ${isSearchVisible ? 'flex' : 'hidden'} md:flex`}>
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Buscar</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Buscar posts..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 rounded-md text-slate-500 hover:text-slate-700 md:hidden"
              aria-label="Toggle Search"
            >
              {isSearchVisible ? <XIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
            </button>
            <div className="relative ml-2" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Abrir menú de usuario</span>
                  <img className="h-8 w-8 rounded-full" src={currentUser.avatarUrl} alt="" />
                </button>
              </div>
              {isDropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onProfileClick();
                      setIsDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    role="menuitem"
                  >
                    Ver Perfil
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onLogout();
                    }}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    role="menuitem"
                  >
                    Cerrar Sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

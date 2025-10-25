import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ComboboxProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({ items, value, onChange, placeholder }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = useMemo(() => 
    query === ''
      ? items
      : items.filter(item => item.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  const handleSelect = (item: string) => {
    onChange(item);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
      onChange('');
      setQuery('');
  }

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="w-full rounded-md border border-slate-300 bg-white py-3 pl-10 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder={value || placeholder}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {(value || query) && (
            <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleClear}
            >
                <XCircleIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            </button>
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <li
                key={item}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-slate-900 hover:bg-blue-100 m-1 rounded-md"
                onClick={() => handleSelect(item)}
              >
                <span className="block truncate">{item}</span>
              </li>
            ))
          ) : (
            <li className="relative cursor-default select-none py-2 px-4 text-slate-500">
              No se encontraron resultados.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

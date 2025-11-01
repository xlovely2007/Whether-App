import React, { useState } from 'react';
import { SearchIcon } from './IconComponents';
import { Loader } from './Loader';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isDisabled: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isDisabled }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        disabled={isDisabled}
        className="w-full pl-5 pr-12 py-3 bg-white/10 text-white rounded-full border-2 border-transparent focus:border-white/50 focus:bg-white/20 focus:outline-none transition-all duration-300 placeholder-white/60 backdrop-blur-md"
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white/80 hover:text-white disabled:opacity-50 transition-colors"
        aria-label="Search"
      >
        {isDisabled ? <Loader size="h-6 w-6" /> : <SearchIcon className="h-6 w-6" />}
      </button>
    </form>
  );
};

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const AutocompleteSearch = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const doctorNames = JSON.parse(localStorage.getItem('allDoctorNames') || '[]');

  useEffect(() => {
    if (input.length === 0) {
      setSuggestions([]);
    } else {
      const matches = doctorNames.filter(name =>
        name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 3);
      setSuggestions(matches);
    }
  }, [input]);

  const handleSearch = (name) => {
    setSearchParams({ search: name });
    setInput('');
  };

  return (
    <div>
      <input
        data-testid="autocomplete-input"
        type="text"
        placeholder="Search doctor name"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch(input)}
      />
      {suggestions.map((item, idx) => (
        <div
          key={idx}
          data-testid="suggestion-item"
          onClick={() => handleSearch(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default AutocompleteSearch;
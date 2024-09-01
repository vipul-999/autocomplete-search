// src/Autocomplete.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Autocomplete from './Autocomplete';

const mockData = {
  titles: [
    "Anything You Want",
    "The Richest Man in Babylon",
  ],
  summaries: [
    {
      id: 0,
      summary: "Practicing meditation and mindfulness will make you at least 10 percent happier."
    },
    {
      id: 1,
      summary: "The 10X Rule says that you should set targets for yourself that are 10X greater than what you believe you can achieve."
    },
  ],
  authors: [
    { book_id: 0, author: "Dan Harris" },
    { book_id: 1, author: "Grant Cardone" },
  ]
};

describe('Autocomplete Component', () => {
  test('renders the input element with the correct placeholder', () => {
    render(<Autocomplete data={mockData} onSuggestionSelect={() => {}} />);

    // Check if input placeholder is rendered correctly
    expect(screen.getByPlaceholderText('Search for books...')).toBeInTheDocument();
  });

  test('renders suggestions container', () => {
    render(<Autocomplete data={mockData} onSuggestionSelect={() => {}} />);

    // Check if suggestions container is rendered (assuming it has a class 'suggestions-container')
    expect(screen.getByTestId('autocomplete-container')).toBeInTheDocument();
  });
});

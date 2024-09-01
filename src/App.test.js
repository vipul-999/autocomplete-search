import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./data.json', () => ({
  titles: [
    "Anything You Want",
    "The Richest Man in Babylon",
  ],
  summaries: [
    {
      id: 0,
      summary: "The Book in Three Sentences: Practicing meditation and mindfulness will make you at least 10 percent happier. Mindfulness helps you respond to your problems rather than react to them."
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
}));

describe('App Component', () => {
  test('renders the App component correctly', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText('Search for books...');
    expect(inputElement).toBeInTheDocument();
  });

  test('displays suggestions when typing in the input', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText('Search for books...');
    fireEvent.change(inputElement, { target: { value: 'mindfulness' } });

    const suggestion = screen.getByText(/Anything You Want/i);
    expect(suggestion).toBeInTheDocument();
  });

  test('adds a card when a suggestion is clicked', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText('Search for books...');
    fireEvent.change(inputElement, { target: { value: 'mindfulness' } });
    
    const suggestion = screen.getByText(/Anything You Want/i);
    fireEvent.click(suggestion);

    const cardTitle = screen.getByText(/Anything You Want/i);
    const cardSummary = screen.getByText(/Practicing meditation and mindfulness/i);
    const cardAuthor = screen.getByText(/Dan Harris/i);

    expect(cardTitle).toBeInTheDocument();
    expect(cardSummary).toBeInTheDocument();
    expect(cardAuthor).toBeInTheDocument();
  });

  test('resets input after a suggestion is clicked', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText('Search for books...');
    fireEvent.change(inputElement, { target: { value: 'mindfulness' } });
    
    const suggestion = screen.getByText(/Anything You Want/i);
    fireEvent.click(suggestion);

    expect(inputElement.value).toBe('');
  });

  test('does not add more than one card for the same book', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText('Search for books...');
    fireEvent.change(inputElement, { target: { value: 'mindfulness' } });
    
    const suggestion = screen.getByText(/Anything You Want/i);
    fireEvent.click(suggestion);
    fireEvent.change(inputElement, { target: { value: 'mindfulness' } });
    fireEvent.click(suggestion);

    const cards = screen.getAllByText(/Anything You Want/i);
    expect(cards.length).toBe(2);
  });
});

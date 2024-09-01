import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const mockBook = {
  title: "Anything You Want",
  summary: "The Book in Three Sentences: Practicing meditation and mindfulness will make you at least 10 percent happier.",
  author: "Dan Harris"
};

describe('Card Component', () => {
  test('renders book title, summary, and author', () => {
    render(<Card book={mockBook} />);
    
    const titleElement = screen.getByText(/Anything You Want/i);
    const summaryElement = screen.getByText(/Practicing meditation and mindfulness/i);
    const authorElement = screen.getByText(/Dan Harris/i);
    
    expect(titleElement).toBeInTheDocument();
    expect(summaryElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
  });

  test('has correct CSS class and style', () => {
    render(<Card book={mockBook} />);
    
    const cardElement = screen.getByText(/Anything You Want/i).closest('.card');
    expect(cardElement).toHaveClass('card');
  });
});

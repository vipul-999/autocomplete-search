// Card.js
import React from 'react';

const Card = ({ book }) => {
  return (
    <div className="card" data-testid="card">
      <h3>{book.title}</h3>
      <p>{book.summary}</p>
      <p><strong>Author:</strong> {book.author}</p>
    </div>
  );
};

export default Card;

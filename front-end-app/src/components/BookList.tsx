import React, { useState } from 'react'
import BookCard from './BookCard';
import { Book } from '../types/Book';
import BookListProps from '../types/BookListProps';
import BookForm from './BookForm';

function BookList({ books, onSave }: BookListProps) {
  const [bookBeingEdited, setBookBeingEdited] = useState({});
  const handleEdit = (book: Book) => {
    setBookBeingEdited(book);
  }

  const cancelEditing = () => {
    setBookBeingEdited({});
  }

  return (
    <div className="row">
      {books.map((book) => (
        <div className="cols-sm">
          {book === bookBeingEdited ? (
            <BookForm onCancel={cancelEditing} onSave={onSave} book={book}/>
          ) : (
            <BookCard book={book} onEdit={handleEdit}/>
          )}
        </div>
      ))}
    </div>
  )
}

export default BookList

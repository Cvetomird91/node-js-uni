import { useState } from 'react';
import BookCard from './BookCard';
import { Book } from '../../types/books/Book';
import BookListProps from '../../types/books/BookListProps';
import BookForm from './BookForm';

function BookList({ books }: BookListProps) {
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
            <BookForm onCancel={cancelEditing} book={book}/>
          ) : (
            <BookCard book={book} onEdit={handleEdit}/>
          )}
        </div>
      ))}
    </div>
  )
}

export default BookList

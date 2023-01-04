import Book from '../../types/books/Book';
import BookCardProps from '../../types/books/BookCardProps';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { BookState } from '../../state/books/BookStateTypes';
import { AnyAction } from 'redux';
import { SyntheticEvent } from 'react';
import { addBookCopy } from '../../state/books/BookActions';

function BookCard(props: BookCardProps) {
  const { book, onEdit } = props;

  const handleEditClick = (bookBeingEdited: Book) => {
    onEdit(bookBeingEdited);
  }

  const dispatch = useDispatch<ThunkDispatch<BookState, any, AnyAction>>();
  const addBookClick = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(addBookCopy(book));
  }

  return (
    <div className="card">
      <img src={book.cover} alt={book.title} />
      <section className="section dark">
        <h5 className="strong">
        <strong>{book.title}</strong>
        </h5>
        <div><i>{book.author}</i></div>
        <div><i>{book.ISBN}</i></div>
        <div><i>{book.date}</i></div>
        <div><i>Number of copies: {book.numberOfCopies}</i></div>
        <div>
          <button
            className=" bordered" onClick={() => {
              handleEditClick(book);
            }}
          >
            <span className="icon-edit "></span>
            Edit
          </button>
          <button className="bordered" onClick={addBookClick}>
            Add Book copy
          </button>
        </div>
      </section>
    </div>
  )
}
  
export default BookCard;
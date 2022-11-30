import BookList from './BookList';
import Book from '../types/Book';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../state';
import { ThunkDispatch } from 'redux-thunk';
import { BookState } from '../state/BookStateTypes';
import { AnyAction } from 'redux';
import { loadBooks } from '../state/BookActions';

function BooksPage () {
  const loading = useSelector(
    (appState: AppState) => appState.bookState.loading
  );

  const books = useSelector(
    (appState: AppState) => appState.bookState.books
  );

  const error = useSelector(
    (appState: AppState) => appState.bookState.error
  );

  const dispatch = useDispatch<ThunkDispatch<BookState, any, AnyAction>>();

  useEffect(() => {
    dispatch<any>(loadBooks());
  }, [dispatch]);

  const saveBook = (book: Book) => {
    console.log('Saving book: ', book);
  }

  return (
    <>
        <h1>Books</h1>

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )}

        <BookList books={books} onSave={saveBook}/>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}
    </>
  )
}

export default BooksPage;
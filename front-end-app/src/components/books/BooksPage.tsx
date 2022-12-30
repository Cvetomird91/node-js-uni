import BookList from './BookList';
import BookCreationForm from './BookCreationForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorCard from '../common/ErrorCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../state';
import { ThunkDispatch } from 'redux-thunk';
import { BookState } from '../../state/books/BookStateTypes';
import { AnyAction } from 'redux';
import { loadBooks } from '../../state/books/BookActions';

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

  return (
    <>
        <h1>Books</h1>
        <BookCreationForm/>
        <ErrorCard error={error} />
        <BookList books={books} />
        <LoadingSpinner loading={loading}/>
    </>
  )
}

export default BooksPage;

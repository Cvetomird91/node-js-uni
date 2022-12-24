import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../state';
import { ThunkDispatch } from 'redux-thunk';
import { BorrowState } from '../state/BorrowStateTypes';
import { AnyAction } from 'redux';
import { loadBorrows } from '../state/BorrowActions';
import { loadBooks } from '../state/BookActions';
import { loadReaders } from '../state/ReaderActions';
import ErrorCard from './ErrorCard';
import LoadingSpinner from './LoadingSpinner';
import BorrowList from './BorrowList';
import BorrowCreationForm from './BorrowCreationForm';

function BorrowsPage() {
    const loading = useSelector(
        (appState: AppState) => appState.borrowState.loading
      );
    
    const borrows = useSelector(
        (appState: AppState) => appState.borrowState.borrows
    );

    const readers = useSelector(
        (appState: AppState) => appState.readerState.readers
    );

    const books = useSelector(
        (appState: AppState) => appState.bookState.books
    );

    const error = useSelector(
        (appState: AppState) => appState.borrowState.error
    );

    const dispatch = useDispatch<ThunkDispatch<BorrowState, any, AnyAction>>();

    useEffect(() => {
      dispatch<any>(loadBorrows());
      dispatch<any>(loadBooks());
      dispatch<any>(loadReaders());
    }, [dispatch]);

    return (
        <>
            <h1>Borrows</h1>
            <BorrowCreationForm borrows={borrows} books={books} readers={readers}/>
            <ErrorCard error={error} />
            <BorrowList borrows={borrows} readers={readers}/>
            <LoadingSpinner loading={loading}/>
        </>
    );
}

export default BorrowsPage;
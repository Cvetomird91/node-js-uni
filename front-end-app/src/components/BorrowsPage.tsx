import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../state';
import { ThunkDispatch } from 'redux-thunk';
import { BorrowState } from '../state/BorrowStateTypes';
import { AnyAction } from 'redux';
import { loadBorrows } from '../state/BorrowActions';
import ErrorCard from './ErrorCard';
import LoadingSpinner from './LoadingSpinner';

function BorrowsPage() {
    const loading = useSelector(
        (appState: AppState) => appState.borrowState.loading
      );
    
    const borrows = useSelector(
        (appState: AppState) => appState.borrowState.borrows
    );

    const error = useSelector(
        (appState: AppState) => appState.borrowState.error
    );

    const dispatch = useDispatch<ThunkDispatch<BorrowState, any, AnyAction>>();

    useEffect(() => {
      dispatch<any>(loadBorrows());
    }, [dispatch]);

    return (
        <>
            <h1>Borrows</h1>
            <ErrorCard error={error} />
            <LoadingSpinner loading={loading}/>
        </>
    );
}

export default BorrowsPage;
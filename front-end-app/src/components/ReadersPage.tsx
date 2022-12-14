import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../state';
import { ThunkDispatch } from 'redux-thunk';
import { ReaderState } from '../state/ReaderStateTypes';
import { AnyAction } from 'redux';
import { loadReaders } from '../state/ReaderActions';
import ErrorCard from './ErrorCard';

function ReadersPage() {
    const loading = useSelector(
        (appState: AppState) => appState.readerState.loading
    );

    const books = useSelector(
        (appState: AppState) => appState.readerState.readers
    );

    const error = useSelector(
        (appState: AppState) => appState.readerState.error
    );

    const dispatch = useDispatch<ThunkDispatch<ReaderState, any, AnyAction>>();

    useEffect(() => {
    dispatch<any>(loadReaders());
    }, [dispatch]);

    return (
        <>
            <h1>Readers</h1>

            <ErrorCard error={error} />
        </>
    );
}

export default ReadersPage;
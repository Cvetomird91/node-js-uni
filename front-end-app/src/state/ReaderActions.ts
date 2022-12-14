import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ReadersApi } from '../graphql/ReadersApi';
import { Reader } from '../types/Reader';

import {
    LOAD_READERS_SUCCESS,
    LOAD_READERS_FAILURE,
    LOAD_READERS_REQUEST,
    ReaderState
} from './ReaderStateTypes';

export function loadReaders(): ThunkAction<Promise<Reader[] | Error>, ReaderState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({type: LOAD_READERS_REQUEST});
        return ReadersApi
                .getAllReaders()
                .then((data) => {
                    dispatch({
                        type: LOAD_READERS_SUCCESS,
                        payload: { readers: data}
                    })
                })
                .catch((error) => {
                    dispatch({ type: LOAD_READERS_FAILURE, payload: error });
                    return error;
                })
    }
}
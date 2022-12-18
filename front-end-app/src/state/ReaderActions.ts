import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ReadersApi } from '../graphql/ReadersApi';
import { Reader } from '../types/Reader';

import {
    LOAD_READERS_SUCCESS,
    LOAD_READERS_FAILURE,
    LOAD_READERS_REQUEST,
    UPDATE_READER_REQUEST,
    UPDATE_READER_FAILURE,
    UPDATE_READER_SUCCESS,
    DELETE_READER_REQUEST,
    DELETE_READER_FAILURE,
    DELETE_READER_SUCCESS,
    ADD_READER_SUCCESS,
    ADD_READER_FAILURE,
    ADD_READER_REQUEST,
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

export function updateReader(reader: Reader): ThunkAction<void, ReaderState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: UPDATE_READER_REQUEST });
        try {
            const data = await ReadersApi.updateReader(reader);
            dispatch({ type: UPDATE_READER_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_READER_FAILURE, payload: error })
        }
    }
}

export function addReader(reader: Reader): ThunkAction<void, ReaderState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: ADD_READER_REQUEST });
        try {
            const data = await ReadersApi.addReader(reader);
            dispatch({ type: ADD_READER_SUCCESS, payload: data});
        } catch (error) {
            dispatch({ type: ADD_READER_FAILURE, payload: error });
        }
    }
}

export function deleteReader(readerId: string): ThunkAction<void, ReaderState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: DELETE_READER_REQUEST });
        try {
            const data = await ReadersApi.deleteReader(readerId);
            dispatch({ type: DELETE_READER_SUCCESS, payload: data});
        } catch (error) {
            dispatch({ type: DELETE_READER_FAILURE, payload: error });
        }
    }
}
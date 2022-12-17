import { Reader } from '../types/Reader';

export const LOAD_READERS_REQUEST = 'LOAD_READERS_REQUEST';
export const LOAD_READERS_SUCCESS = 'LOAD_READERS_SUCCESS';
export const LOAD_READERS_FAILURE = 'LOAD_READERS_FAILURE';

export const UPDATE_READER_REQUEST = 'UPDATE_READER_REQUEST';
export const UPDATE_READER_SUCCESS = 'UPDATE_READER_SUCCESS';
export const UPDATE_READER_FAILURE = 'UPDATE_READER_FAILURE';

interface LoadReadersRequest {
    type: typeof LOAD_READERS_REQUEST;
}

interface LoadReadersSuccess {
    type: typeof LOAD_READERS_SUCCESS;
    payload: { readers: Reader[] }
}

interface LoadReadersFailure {
    type: typeof LOAD_READERS_FAILURE;
    payload: { message: string }
}

interface UpdateReaderRequest {
    type: typeof UPDATE_READER_REQUEST;
}

interface UpdateReaderSuccess {
    type: typeof UPDATE_READER_SUCCESS;
    payload: Reader;
}

interface UpdateReaderFailre {
    type: typeof UPDATE_READER_FAILURE;
    payload: { message: string }
}

export type ReaderActionTypes = | LoadReadersRequest | LoadReadersSuccess | LoadReadersFailure
                                | UpdateReaderRequest | UpdateReaderSuccess | UpdateReaderFailre;

export interface ReaderState {
    loading: boolean;
    readers: Reader[];
    error: string | undefined;
}
import { Reader } from '../types/Reader';

export const LOAD_READERS_REQUEST = 'LOAD_READERS_REQUEST';
export const LOAD_READERS_SUCCESS = 'LOAD_READERS_SUCCESS';
export const LOAD_READERS_FAILURE = 'LOAD_READERS_FAILURE';

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

export type ReaderActionTypes = | LoadReadersRequest | LoadReadersSuccess | LoadReadersFailure;

export interface ReaderState {
    loading: boolean;
    readers: Reader[];
    error: string | undefined;
}
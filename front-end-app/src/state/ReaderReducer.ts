import {
    ReaderActionTypes,
    ReaderState,
    LOAD_READERS_FAILURE,
    LOAD_READERS_SUCCESS,
    LOAD_READERS_REQUEST
} from './ReaderStateTypes';
import { Reader } from '../types/Reader';

export const initialReaderState: ReaderState = {
    readers: [],
    loading: false,
    error: undefined
}

export function readerReducer(
    state = initialReaderState,
    action: ReaderActionTypes
) {
    switch(action.type) {
        case LOAD_READERS_REQUEST:
            return { ...state, loading: false, error: ''};
        case LOAD_READERS_SUCCESS:
            let readers: Reader[];
            readers = action.payload.readers;
            return {
                ...state,
                loading: false,
                readers,
                error: ''
            }
        case LOAD_READERS_FAILURE:
            return { ...state, loading: false, error: action.payload.message };
        default:
            return state;
    }
}
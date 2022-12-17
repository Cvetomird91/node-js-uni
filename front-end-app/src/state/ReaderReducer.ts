import {
    ReaderActionTypes,
    ReaderState,
    LOAD_READERS_FAILURE,
    LOAD_READERS_SUCCESS,
    LOAD_READERS_REQUEST,
    UPDATE_READER_REQUEST,
    UPDATE_READER_SUCCESS,
    UPDATE_READER_FAILURE
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
        case UPDATE_READER_REQUEST:
            return { ...state };
        case UPDATE_READER_SUCCESS:
            return {
                ...state,
                readers: state.readers.map((reader: Reader) => {
                    return reader._id === action.payload._id ?
                        Object.assign({}, reader, action.payload)
                        : reader;
                })
            }
        case UPDATE_READER_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
}
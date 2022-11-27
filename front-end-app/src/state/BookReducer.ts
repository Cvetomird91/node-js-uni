import {
    BookActionTypes,
    LOAD_BOOKS_REQUEST,
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_FAILURE,
    BookState
} from './BookStateTypes';
import { Book } from '../types/Book';

export const initialBookState: BookState = {
    books: [],
    loading: false,
    error: undefined
};

export function bookReducer(
    state = initialBookState,
    action: BookActionTypes
) {
    switch(action.type) {
        case LOAD_BOOKS_REQUEST:
            return { ...state, loading: true, error: '' }
        case LOAD_BOOKS_SUCCESS:
            let books: Book[];
            books = action.payload.books;
            return {
                ...state,
                loading: false,
                books,
                error: ''
            };
        case LOAD_BOOKS_FAILURE:
            return {...state, loading: false, error: action.payload.message };
        default:
            return state;
    }
}
import {
    BookActionTypes,
    LOAD_BOOKS_REQUEST,
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_FAILURE,
    BookState,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_FAILURE,
    UPDATE_BOOK_SUCCESS
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
        case UPDATE_BOOK_REQUEST:
            return { ...state };
        case UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.map((book: Book) => {
                    return book._id === action.payload._id ?
                        Object.assign({}, book, action.payload)
                        : book;
                })
            }
        case UPDATE_BOOK_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
}
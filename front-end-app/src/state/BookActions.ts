import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { BookApi } from '../graphql/BooksApi';
import { Book } from '../types/Book';

import {
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_FAILURE,
    LOAD_BOOKS_REQUEST,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAILURE,
    BookState
} from './BookStateTypes';

export function loadBooks(): ThunkAction<Promise<Book[] | Error>, BookState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: LOAD_BOOKS_REQUEST });
        return BookApi
            .getAllBooks()
            .then((data) => {
                dispatch({
                    type: LOAD_BOOKS_SUCCESS,
                    payload: { books: data }
                })
            })
            .catch((error) => {
                dispatch({ type: LOAD_BOOKS_FAILURE, payload: error });
                return error;
            })
    };
}

export function updateBook(book: Book): ThunkAction<void, BookState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: UPDATE_BOOK_REQUEST });
        try {
            const data = await BookApi.editBook(book);
            dispatch({ type: UPDATE_BOOK_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_BOOK_FAILURE, payload: error })
        }
    }
}
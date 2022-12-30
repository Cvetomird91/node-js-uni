import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { BookApi } from '../../graphql/BooksApi';
import { Book } from '../../types/Book';

import {
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_FAILURE,
    LOAD_BOOKS_REQUEST,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAILURE,
    ADD_COPY_REQUEST,
    ADD_COPY_SUCCESS,
    ADD_COPY_FAILURE,
    ADD_TITLE_REQUEST,
    ADD_TITLE_SUCCESS,
    ADD_TITLE_FAILURE,
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

export function addBookCopy(book: Book): ThunkAction<void, BookState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: ADD_COPY_REQUEST });
        try {
            const data = await BookApi.addBookCopy(book);
            dispatch({ type: ADD_COPY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({ type: ADD_COPY_FAILURE, payload: error })
        }
    }
}

export function addBookTitle(book: Book): ThunkAction<void, BookState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: ADD_TITLE_REQUEST });
        try {
            const data = await BookApi.addBookTitle(book);
            dispatch({ type: ADD_TITLE_SUCCESS, payload: data});
        } catch (error) {
            dispatch({ type: ADD_TITLE_FAILURE, payload: error });
        }
    }
}
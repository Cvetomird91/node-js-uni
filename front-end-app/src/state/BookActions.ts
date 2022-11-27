import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { BookApi } from '../graphql/BooksApi';
import { Book } from '../types/Book';

import {
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_FAILURE,
    LOAD_BOOKS_REQUEST,
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

import { Book } from '../types/Book';

//action types
export const LOAD_BOOKS_REQUEST = 'LOAD_BOOKS_REQUEST';
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE';

export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE';

interface LoadBooksRequest {
    type: typeof LOAD_BOOKS_REQUEST;
}
  
interface LoadBooksSuccess {
    type: typeof LOAD_BOOKS_SUCCESS;
    //todo: add paging
    // payload: { books: Book[]; page: number };
    payload: { books: Book[] }
}
  
interface LoadBooksFailure {
    type: typeof LOAD_BOOKS_FAILURE;
    payload: { message: string };
}

interface UpdateBookRequest {
    type: typeof UPDATE_BOOK_REQUEST;
}

interface UpdateBookSuccess {
    type: typeof UPDATE_BOOK_SUCCESS;
    payload: Book;
}

interface UpdateBookFailre {
    type: typeof UPDATE_BOOK_FAILURE;
    payload: { message: string }
}

export type BookActionTypes = | LoadBooksRequest | LoadBooksSuccess | LoadBooksFailure
                              | UpdateBookRequest | UpdateBookSuccess | UpdateBookFailre;

export interface BookState {
    loading: boolean;
    books: Book[];
    error: string | undefined;
    //page: number;
}
import { Book } from '../../types/books/Book';

//action types
export const LOAD_BOOKS_REQUEST = 'LOAD_BOOKS_REQUEST';
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE';

export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE';

export const ADD_COPY_REQUEST = 'ADD_COPY_REQUEST';
export const ADD_COPY_SUCCESS = 'ADD_COPY_SUCCESS';
export const ADD_COPY_FAILURE = 'ADD_COPY_FAILRE';

export const ADD_TITLE_REQUEST = 'ADD_TITLE_REQUEST';
export const ADD_TITLE_SUCCESS = 'ADD_TITLE_SUCCESS';
export const ADD_TITLE_FAILURE = 'ADD_TITLE_FAILURE';

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

interface AddCopyRequest {
    type: typeof ADD_COPY_REQUEST;
}

interface AddCopySuccess {
    type: typeof ADD_COPY_SUCCESS;
    payload: Book;
}

interface AddCopyFailure {
    type: typeof ADD_COPY_FAILURE;
    payload: { message: string }
}

interface AddTitleRequest {
    type: typeof ADD_TITLE_REQUEST;
}

interface AddTitleSuccess {
    type: typeof ADD_TITLE_SUCCESS;
    payload: Book;
}

interface AddTitleFailure {
    type: typeof ADD_TITLE_FAILURE;
    payload: { message: string }
}

export type BookActionTypes = | LoadBooksRequest | LoadBooksSuccess | LoadBooksFailure
                              | UpdateBookRequest | UpdateBookSuccess | UpdateBookFailre
                              | AddCopyRequest | AddCopySuccess | AddCopyFailure
                              | AddTitleRequest | AddTitleSuccess | AddTitleFailure;

export interface BookState {
    loading: boolean;
    books: Book[];
    error: string | undefined;
    //page: number;
}
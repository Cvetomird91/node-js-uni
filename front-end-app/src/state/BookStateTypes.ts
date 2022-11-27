import { Book } from '../types/Book';

//action types
export const LOAD_BOOKS_REQUEST = 'LOAD_BOOKS_REQUEST';
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE';

interface LoadBooksRequest {
    type: typeof LOAD_BOOKS_REQUEST;
}
  
interface LoadProjectsSuccess {
    type: typeof LOAD_BOOKS_SUCCESS;
    //todo: add paging
    // payload: { books: Book[]; page: number };
    payload: { books: Book[] }
}
  
interface LoadProjectsFailure {
    type: typeof LOAD_BOOKS_FAILURE;
    payload: { message: string };
}

export type BookActionTypes = | LoadBooksRequest | LoadProjectsSuccess | LoadProjectsFailure;

export interface BookState {
    loading: boolean;
    books: Book[];
    error: string | undefined;
    //page: number;
}
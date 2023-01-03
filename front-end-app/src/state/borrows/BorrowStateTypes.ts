import { Borrow } from '../../types/Borrow';

//action types
export const LOAD_BORROWS_REQUEST = 'LOAD_BORROWS_REQUEST';
export const LOAD_BORROWS_SUCCESS = 'LOAD_BORROWS_SUCCESS';
export const LOAD_BORROWS_FAILURE = 'LOAD_BORROWS_FAILURE';

export const BORROW_BOOK_REQUEST = 'BORROW_BOOK_REQUEST';
export const BORROW_BOOK_SUCCESS = 'BORROW_BOOK_SUCCESS';
export const BORROW_BOOK_FAILURE = 'BORROW_BOOK_FAILURE';

export const RETURN_BOOK_REQUEST = 'RETURN_BOOK_REQUEST';
export const RETURN_BOOK_SUCCESS = 'RETURN_BOOK_SUCCESS';
export const RETURN_BOOK_FAILURE = 'RETURN_BOOK_FAILURE';

interface LoadBorrowsRequest {
    type: typeof LOAD_BORROWS_REQUEST;
}
  
interface LoadBorrowsSuccess {
    type: typeof LOAD_BORROWS_SUCCESS;
    payload: { borrows: Borrow[] }
}
  
interface LoadBorrowsFailure {
    type: typeof LOAD_BORROWS_FAILURE;
    payload: { message: string };
}

interface BorrowBookRequest {
    type: typeof BORROW_BOOK_REQUEST;
}

interface BorrowBookSuccess {
    type: typeof BORROW_BOOK_SUCCESS;
    payload: Borrow;
}

interface BorrowBookFailure {
    type: typeof BORROW_BOOK_FAILURE;
    payload: { message: string }
}

interface ReturnBookRequest {
    type: typeof RETURN_BOOK_REQUEST;
}

interface ReturnBookSuccess {
    type: typeof RETURN_BOOK_SUCCESS;
    payload: Borrow;
}

interface ReturnBookFailure {
    type: typeof RETURN_BOOK_FAILURE;
    payload: { message: string }
}

export type BorrowActionTypes = | LoadBorrowsRequest | LoadBorrowsSuccess | LoadBorrowsFailure
                              | BorrowBookRequest | BorrowBookSuccess | BorrowBookFailure
                              | ReturnBookRequest | ReturnBookSuccess | ReturnBookFailure;

export interface BorrowState {
    loading: boolean;
    borrows: Borrow[];
    error: string | undefined;
    //page: number;
}
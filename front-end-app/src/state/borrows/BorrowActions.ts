import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { BorrowsApi } from '../../graphql/BorrowsApi';
import { Borrow } from '../../types/Borrow';

import {
    LOAD_BORROWS_SUCCESS,
    LOAD_BORROWS_FAILURE,
    LOAD_BORROWS_REQUEST,
    BORROW_BOOK_SUCCESS,
    BORROW_BOOK_FAILURE,
    BORROW_BOOK_REQUEST,
    RETURN_BOOK_REQUEST,
    RETURN_BOOK_FAILURE,
    RETURN_BOOK_SUCCESS,
    BorrowState
} from './BorrowStateTypes';

export function loadBorrows(): ThunkAction<Promise<Borrow[] | Error>, BorrowState, null, Action<string>> {
    return (dispatch: any) => {
        dispatch({ type: LOAD_BORROWS_REQUEST });
        return BorrowsApi
            .getBorrows()
            .then((data) => {
                dispatch({
                    type: LOAD_BORROWS_SUCCESS,
                    payload: { borrows: data }
                })
            })
            .catch((error) => {
                dispatch({ type: LOAD_BORROWS_FAILURE, payload: error });
                return error;
            })
    };
}

export function borrowBookCopy(borrow: Borrow): ThunkAction<void, BorrowState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: BORROW_BOOK_REQUEST });
        try {
            const data = await BorrowsApi.borrowBookCopy(borrow);
            dispatch({ type: BORROW_BOOK_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: BORROW_BOOK_FAILURE, payload: error })
        }
    }
}

export function returnBookCopy(borrow: Borrow): ThunkAction<void, BorrowState, null, Action<string>> {
    return async (dispatch: any) => {
        dispatch({ type: RETURN_BOOK_REQUEST });
        try {
            const data = await BorrowsApi.returnBookCopy(borrow);
            dispatch({ type: RETURN_BOOK_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: RETURN_BOOK_FAILURE, payload: error })
        }
    }
}

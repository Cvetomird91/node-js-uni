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
    BorrowState,
    BorrowActionTypes
} from './BorrowStateTypes';

export const initialBorrowState: BorrowState = {
    borrows: [],
    loading: false,
    error: undefined
};

export function borrowReducer(
    state = initialBorrowState,
    action: BorrowActionTypes
) {
    switch(action.type) {
        case LOAD_BORROWS_REQUEST:
            return { ...state, loading: true, error: '' }
        case LOAD_BORROWS_SUCCESS:
            let borrows: Borrow[];
            borrows = action.payload.borrows;
            return {
                ...state,
                loading: false,
                borrows,
                error: ''
            }
        case LOAD_BORROWS_FAILURE:
            return {...state, loading: false, error: action.payload.message };
        //add title request
        case BORROW_BOOK_REQUEST:
            return { ...state, error: '' };
        case BORROW_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                borrows: [...state.borrows, action.payload],
                error: ''
            }
        case BORROW_BOOK_FAILURE:
            return { ...state, loading: false, error: action.payload.message }
        //update book request
        case RETURN_BOOK_REQUEST:
            return { ...state };
        case RETURN_BOOK_SUCCESS:
            return {
                ...state,
                borrows: state.borrows.map((borrows: Borrow) => {
                    return borrows._id === action.payload._id ?
                        Object.assign({}, borrows, action.payload)
                        : borrows;
                })
            }
        case RETURN_BOOK_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
}
import {borrowReducer, initialBorrowState} from "../../../state/borrows/BorrowReducer";
import {MOCK_BORROWS} from "../../__mocks__/MockBorrows";
import {
    LOAD_BORROWS_REQUEST,
    LOAD_BORROWS_SUCCESS,
    LOAD_BORROWS_FAILURE,
    BORROW_BOOK_REQUEST,
    BORROW_BOOK_SUCCESS,
    BORROW_BOOK_FAILURE,
    RETURN_BOOK_REQUEST,
    RETURN_BOOK_FAILURE,
    RETURN_BOOK_SUCCESS
} from '../../../../src/state/borrows/BorrowStateTypes';
import Book from "../../../types/Book";
import Borrow from "../../../types/Borrow";
import Reader from "../../../types/Reader";
import {bookReducer, initialBookState} from "../../../state/books/BookReducer";
import {UPDATE_BOOK_FAILURE, UPDATE_BOOK_SUCCESS} from "../../../state/books/BookStateTypes";
import {MOCK_BOOKS} from "../../__mocks__/MockBooks";

describe('borrow reducer', () => {
    test('should request all borrows', () => {
        const currentState = { ...initialBorrowState };
        const loadingState = {
            ...initialBorrowState,
            loading: true,
            error: ''
        };

        expect(
            borrowReducer(currentState, {
                type: LOAD_BORROWS_REQUEST,
            })
        ).toEqual(loadingState)
    });

    test('should return all borrows', () => {
        const borrows = MOCK_BORROWS;
        const currentState = { ...initialBorrowState };
        const loadedState = {
            loading: false,
            borrows,
            error: ''
        };

        expect(
            borrowReducer(currentState, {
                type: LOAD_BORROWS_SUCCESS,
                payload: { borrows }
            })
        ).toEqual(loadedState);
    });

    test('load borrows failure', () => {
        const currentState = { ...initialBorrowState };
        const loadedState = {
            loading: false,
            error: 'load borrows failure',
            borrows: []
        };

        expect(
            borrowReducer(currentState, {
                type: LOAD_BORROWS_FAILURE,
                payload: { message: 'load borrows failure' }
            })
        ).toEqual(loadedState);

    });

    test('borrow book failure', () => {
        const currentState = { ...initialBorrowState };
        const loadedState = {
            loading: false,
            error: 'borrow book failure',
            borrows: []
        };

        expect(
            borrowReducer(currentState, {
                type: BORROW_BOOK_FAILURE,
                payload: { message: 'borrow book failure' }
            })
        ).toEqual(loadedState);
    });

    test('borrow book copy success', () => {
        const currentState = { borrows: MOCK_BORROWS, loading: false, error: '' };
        const newBorrow = new Borrow({
                                        book: new Book({
                                                           _id: "abcdefg123455",
                                                           image: "img",
                                                           author: "Ivan Vazov",
                                                           title: "Opalchentsite",
                                                           date: "1885-01-01",
                                                           ISBN: "1234567abc",
                                                           numberOfCopies: 0
                                                       }),
                                        reader: new Reader({
                                                            status: 1,
                                                            fristName: "a",
                                                            lastName: "b"
                                                           }),
                                         dateFrom: "2023-01-01",
                                         dateTo: "2023-01-02",
                                         status: 1,
                                         bookCopyId: "asd"
                                     });
        const successState = {
            ...initialBorrowState,
            loading: false,
            borrows: [...currentState.borrows, newBorrow],
            error: ''
        };

        expect(
            borrowReducer(currentState, {
                type: BORROW_BOOK_SUCCESS,
                payload: newBorrow
            })
        ).toEqual(successState)
    });

    test('should request to borrow a book copy', () => {
        const currentState = { ...initialBorrowState };
        const loadingState = {
            ...initialBorrowState,
            loading: false,
            error: ''
        };

        expect(
            borrowReducer(currentState, {
                type: BORROW_BOOK_REQUEST
            })
        ).toEqual(loadingState)
    });

    test('update book request', () => {
        const currentState = { ...initialBorrowState };
        const loadingState = {
            ...initialBorrowState,
            loading: false
        };

        expect(
            borrowReducer(currentState, {
                type: RETURN_BOOK_REQUEST
            })
        ).toEqual(loadingState)
    });

    test('return book failure', () => {
        const currentState = { ...initialBorrowState };
        const loadedState = {
            loading: false,
            error: 'return book failure',
            borrows: []
        };

        expect(
            borrowReducer(currentState, {
                type: RETURN_BOOK_FAILURE,
                payload: { message: 'return book failure' }
            })
        ).toEqual(loadedState);
    });

    test('should update an existing borrow', () => {
        const borrow = MOCK_BORROWS[0];
        const updatedBorrow = Object.assign(new Borrow(), borrow, {
            dateFrom: "2024-01-01",
        })
        const currentState = { ...initialBorrowState, borrows: [borrow]};
        const updatedState = {
            ...initialBorrowState,
            borrows: [updatedBorrow]
        };
        expect(
            borrowReducer(currentState, {
                type: RETURN_BOOK_SUCCESS,
                payload: updatedBorrow
            })
        ).toEqual(updatedState)
    });
});
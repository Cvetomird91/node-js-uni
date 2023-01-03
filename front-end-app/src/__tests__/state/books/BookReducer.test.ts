import { render } from '@testing-library/react';
import { bookReducer, initialBookState } from '../../../../src/state/books/BookReducer';
import { MOCK_BOOKS } from '../../__mocks__/MockBooks';
import { LOAD_BOOKS_REQUEST, UPDATE_BOOK_SUCCESS } from '../../../../src/state/books/BookStateTypes';
import Book from '../../../types/Book';

describe('book reducer', () => {
    test('should update an existing book', () => {
        const book = MOCK_BOOKS[0];
        const updatedBook = Object.assign(new Book(), book, {
            title: book.title + ' updated',
        })
        const currentState = { ...initialBookState, books: [book]};
        const updatedState = {
            ...initialBookState,
            books: [updatedBook]
        };
        expect(
            bookReducer(currentState, {
                type: UPDATE_BOOK_SUCCESS,
                payload: updatedBook
            })
        ).toEqual(updatedState)
    });

    test('should request all books', () => {
        const currentState = { ...initialBookState };
        const loadingState = {
            ...initialBookState,
            loading: true,
            error: ''
        };

        expect(
            bookReducer(currentState, {
                type: LOAD_BOOKS_REQUEST
            })
        ).toEqual(loadingState)
    });

    test('should return all books', () => {

    });
});
import { bookReducer, initialBookState } from '../../../../src/state/books/BookReducer';
import { MOCK_BOOKS } from '../../__mocks__/MockBooks';
import { LOAD_BOOKS_SUCCESS,
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
    ADD_TITLE_FAILURE } from '../../../../src/state/books/BookStateTypes';
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
        const books = MOCK_BOOKS;
        const currentState = { ...initialBookState };
        const loadedState = {
            loading: false,
            books,
            error: ''
        };

        expect(
            bookReducer(currentState, {
                type: LOAD_BOOKS_SUCCESS,
                payload: { books }
            })
        ).toEqual(loadedState);
    });

    test('load books failure', () => {
        const currentState = { ...initialBookState };
        const loadedState = {
            loading: false,
            error: 'load books failure',
            books: []
        };

        expect(
            bookReducer(currentState, {
                type: LOAD_BOOKS_FAILURE,
                payload: { message: 'load books failure' }
            })
        ).toEqual(loadedState);

    })

    test('update book request', () => {
        const currentState = { ...initialBookState };
        const loadingState = {
            ...initialBookState,
            loading: false
        };

        expect(
            bookReducer(currentState, {
                type: UPDATE_BOOK_REQUEST
            })
        ).toEqual(loadingState)

    })
});
import {bookReducer, initialBookState} from '../../../../src/state/books/BookReducer';
import {MOCK_BOOKS} from '../../__mocks__/MockBooks';
import {
    ADD_COPY_FAILURE,
    ADD_COPY_REQUEST,
    ADD_COPY_SUCCESS,
    ADD_TITLE_FAILURE,
    ADD_TITLE_REQUEST,
    ADD_TITLE_SUCCESS,
    LOAD_BOOKS_FAILURE,
    LOAD_BOOKS_REQUEST,
    LOAD_BOOKS_SUCCESS,
    UPDATE_BOOK_FAILURE,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS
} from '../../../../src/state/books/BookStateTypes';
import Book from '../../../types/Book';
import BookCopy from "../../../types/BookCopy";

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

    });

    test('update book failure', () => {
        const currentState = { ...initialBookState };
        const loadedState = {
            loading: false,
            error: 'update book failure',
            books: []
        };

        expect(
            bookReducer(currentState, {
                type: UPDATE_BOOK_FAILURE,
                payload: { message: 'update book failure' }
            })
        ).toEqual(loadedState);
    });

    test('add copy failure', () => {
        const currentState = { ...initialBookState };
        const loadedState = {
            loading: false,
            error: 'add copy failure',
            books: []
        };

        expect(
            bookReducer(currentState, {
                type: ADD_COPY_FAILURE,
                payload: { message: 'add copy failure' }
            })
        ).toEqual(loadedState);
    });

    test('add title failure', () => {
        const currentState = { ...initialBookState };
        const loadedState = {
            loading: false,
            error: 'add title failure',
            books: []
        };

        expect(
            bookReducer(currentState, {
                type: ADD_TITLE_FAILURE,
                payload: { message: 'add title failure' }
            })
        ).toEqual(loadedState);
    });

    test('should request to add book copy', () => {
        const currentState = { ...initialBookState };
        const loadingState = {
            ...initialBookState,
            loading: false,
            error: ''
        };

        expect(
            bookReducer(currentState, {
                type: ADD_COPY_REQUEST
            })
        ).toEqual(loadingState)
    });

    test('should request to add book title', () => {
        const currentState = { ...initialBookState };
        const loadingState = {
            ...initialBookState,
            loading: false,
            error: ''
        };

        expect(
            bookReducer(currentState, {
                type: ADD_TITLE_REQUEST
            })
        ).toEqual(loadingState)
    });

    test('add title success', () => {
        const currentState = { books: MOCK_BOOKS, loading: false, error: '' };
        const newTitle = new Book({
                                    _id: "abcdefg123455",
                                    image: "img",
                                    author: "Ivan Vazov",
                                    title: "Opalchentsite",
                                    date: "1885-01-01",
                                    ISBN: "1234567abc",
                                    numberOfCopies: 0
                                  })
        const successState = {
            ...initialBookState,
            loading: false,
            books: [...currentState.books, newTitle],
            error: ''
        };

        expect(
            bookReducer(currentState, {
                type: ADD_TITLE_SUCCESS,
                payload: newTitle
            })
        ).toEqual(successState)
    });

    test('add copy success', () => {
        const book = MOCK_BOOKS[0];
        const updatedBook = Object.assign(new Book(), book, {
            copies: [new BookCopy({
                                    bookId: "6099af74ca928252960fe17b"})],
        })
        const currentState = { ...initialBookState, books: [book]};
        const updatedState = {
            ...initialBookState,
            books: [updatedBook]
        };
        expect(
            bookReducer(currentState, {
                type: ADD_COPY_SUCCESS,
                payload: updatedBook
            })
        ).toEqual(updatedState)
    });
});
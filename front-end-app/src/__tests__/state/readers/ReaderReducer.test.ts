import {readerReducer, initialReaderState} from '../../../../src/state/readers/ReaderReducer';
import {MOCK_READERS} from '../../__mocks__/MockReaders';
import {
    LOAD_READERS_REQUEST,
    LOAD_READERS_SUCCESS,
    LOAD_READERS_FAILURE,
    UPDATE_READER_REQUEST,
    UPDATE_READER_FAILURE,
    UPDATE_READER_SUCCESS,
    DELETE_READER_REQUEST,
    DELETE_READER_FAILURE,
    DELETE_READER_SUCCESS,
    ADD_READER_SUCCESS,
    ADD_READER_FAILURE,
    ADD_READER_REQUEST
} from '../../../../src/state/readers/ReaderStateTypes';
// @ts-ignore
import { Reader } from '../../../types/readers/Reader';

describe('reader reducer', () => {

    test('should load all readers', () => {
        const currentState = { ...initialReaderState };
        const loadingState = {
            ...initialReaderState,
            loading: false,
            error: ''
        };

        expect(
            readerReducer(currentState, {
                type: LOAD_READERS_REQUEST
            })
        ).toEqual(loadingState);
    });

    test('load readers failure', () => {
        const currentState = { ...initialReaderState };
        const loadedState = {
            loading: false,
            error: 'load readers failure',
            readers: []
        };

        expect(
            readerReducer(currentState, {
                type: LOAD_READERS_FAILURE,
                payload: { message: 'load readers failure' }
            })
        ).toEqual(loadedState);

    });

    test('should return all readers', () => {
        const readers = MOCK_READERS;
        const currentState = { ...initialReaderState };
        const loadedState = {
            loading: false,
            readers,
            error: ''
        };

        expect(
            readerReducer(currentState, {
                type: LOAD_READERS_SUCCESS,
                payload: { readers }
            })
        ).toEqual(loadedState);
    });

    test('should request to add reader', () => {
        const currentState = { ...initialReaderState };
        const loadingState = {
            ...initialReaderState,
            loading: false,
            error: ''
        };

        expect(
            readerReducer(currentState, {
                type: ADD_READER_REQUEST
            })
        ).toEqual(loadingState)
    });

    test('add reader failure', () => {
        const currentState = { ...initialReaderState };
        const loadedState = {
            loading: false,
            error: 'add reader failure',
            readers: []
        };

        expect(
            readerReducer(currentState, {
                type: ADD_READER_FAILURE,
                payload: { message: 'add reader failure' }
            })
        ).toEqual(loadedState);
    });

    test('add reader success', () => {
        const currentState = { readers: MOCK_READERS, loading: false, error: '' };
        const newReader = new Reader({firstName: "Ivan", lastName: "Ivanov", status: 1});
        const successState = {
            ...initialReaderState,
            loading: false,
            readers: [...currentState.readers, newReader],
            error: ''
        };

        expect(
            readerReducer(currentState, {
                type: ADD_READER_SUCCESS,
                payload: newReader
            })
        ).toEqual(successState)
    });

    //asd

    test('should update an existing reader', () => {
        const reader = MOCK_READERS[0];
        const updatedReader = Object.assign(new Reader(), reader, {
            firstName: reader.firstName + ' updated',
        })
        const currentState = { ...initialReaderState, readers: [reader]};
        const updatedState = {
            ...initialReaderState,
            readers: [updatedReader]
        };
        expect(
            readerReducer(currentState, {
                type: UPDATE_READER_SUCCESS,
                payload: updatedReader
            })
        ).toEqual(updatedState)
    });

    test('update reader failure', () => {
        const currentState = { ...initialReaderState };
        const loadedState = {
            loading: false,
            error: 'update reader failure',
            readers: []
        };

        expect(
            readerReducer(currentState, {
                type: UPDATE_READER_FAILURE,
                payload: { message: 'update reader failure' }
            })
        ).toEqual(loadedState);
    });

    test('update reader request', () => {
        const currentState = { ...initialReaderState };
        const loadingState = {
            ...initialReaderState,
            loading: false
        };

        expect(
            readerReducer(currentState, {
                type: UPDATE_READER_REQUEST
            })
        ).toEqual(loadingState)

    });

    test('should delete an existing reader', () => {
        const reader = MOCK_READERS[0];
        const updatedReader = Object.assign(new Reader(), reader, {
            status: 0
        });
        const currentState = { ...initialReaderState, readers: [reader]};
        const updatedState = {
            ...initialReaderState,
            readers: [updatedReader]
        };
        expect(
            readerReducer(currentState, {
                type: DELETE_READER_SUCCESS,
                payload: updatedReader
            })
        ).toEqual(updatedState)
    });

    test('delete reader failure', () => {
        const currentState = { ...initialReaderState };
        const loadedState = {
            loading: false,
            error: 'delete reader failure',
            readers: []
        };

        expect(
            readerReducer(currentState, {
                type: DELETE_READER_FAILURE,
                payload: { message: 'delete reader failure' }
            })
        ).toEqual(loadedState);
    });

    test('delete reader request', () => {
        const currentState = { ...initialReaderState };
        const loadingState = {
            ...initialReaderState,
            loading: false
        };

        expect(
            readerReducer(currentState, {
                type: DELETE_READER_REQUEST
            })
        ).toEqual(loadingState)

    });

});
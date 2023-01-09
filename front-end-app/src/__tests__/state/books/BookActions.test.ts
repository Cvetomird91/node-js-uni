import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { initialAppState } from '../../../state';
import { MOCK_BOOKS } from '../../__mocks__/MockBooks';
import { 
    LOAD_BOOKS_REQUEST,
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_FAILURE
} from '../../../state/books/BookStateTypes';
import { loadBooks } from '../../../state/books/BookActions';
jest.mock('../../../graphql/BooksApi', () => require('../../__mocks__/graphql/BooksApi'))

const middlewares = [ReduxThunk];
const mockStoreCreator = configureMockStore(middlewares);

describe('Book Actions', () => {
    let store: any;
  
    beforeEach(() => {
        store = mockStoreCreator(initialAppState);
    });

    test('should load books successfully', () => {
        const expectedActions = [
            {type: LOAD_BOOKS_REQUEST},
            {
                type: LOAD_BOOKS_SUCCESS,
                payload: {books: MOCK_BOOKS}
            }
        ];

        return store.dispatch(loadBooks()).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
    });
});


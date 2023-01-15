import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { initialAppState } from '../../../state';
import { MOCK_BORROWS } from '../../__mocks__/MockBorrows';
import {
    LOAD_BORROWS_REQUEST,
    LOAD_BORROWS_SUCCESS,
    LOAD_BORROWS_FAILURE
} from '../../../state/borrows/BorrowStateTypes';
import { loadBorrows } from '../../../state/borrows/BorrowActions';
jest.mock('../../../graphql/BorrowsApi', () => require('../../__mocks__/graphql/BorrowsApi'));

const middlewares = [ReduxThunk];
const mockStoreCreator = configureMockStore(middlewares);

describe('Borrow actions', () => {
    let store: any;

    beforeEach(() => {
        store = mockStoreCreator(initialAppState);
    });

    test('should load borrows successfully', () => {
        const expectedActions = [
            {type: LOAD_BORROWS_REQUEST},
            {
                type: LOAD_BORROWS_SUCCESS,
                payload: {borrows: MOCK_BORROWS}
            }
        ];

        return store.dispatch(loadBorrows()).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
    });

});
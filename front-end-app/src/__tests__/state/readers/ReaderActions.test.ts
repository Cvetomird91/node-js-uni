import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { initialAppState } from '../../../state';
import { MOCK_READERS } from '../../__mocks__/MockReaders';
import {
    LOAD_READERS_REQUEST,
    LOAD_READERS_SUCCESS,
    LOAD_READERS_FAILURE
} from '../../../state/readers/ReaderStateTypes';
import { loadReaders } from '../../../state/readers/ReaderActions';
jest.mock('../../../graphql/ReadersApi', () => require('../../__mocks__/graphql/ReadersApi'))

const middlewares = [ReduxThunk];
const mockStoreCreator = configureMockStore(middlewares);

describe('Reader actions', () => {
    let store: any;

    beforeEach(() => {
        store = mockStoreCreator(initialAppState);
    });

    test('should load readers successfully', () => {
        const expectedActions = [
            {type: LOAD_READERS_REQUEST},
            {
                type: LOAD_READERS_SUCCESS,
                payload: {readers: MOCK_READERS}
            }
        ];

        return store.dispatch(loadReaders()).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });
    });

});
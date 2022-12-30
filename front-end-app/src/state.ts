import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { combineReducers } from 'redux';
import {
  initialBookState,
  bookReducer,
} from './state/books/BookReducer';
import {
  initialReaderState,
  readerReducer,
} from './state/readers/ReaderReducer';
import {
  initialBorrowState,
  borrowReducer,
} from './state/borrows/BorrowReducer';
import { BookState } from './state/books/BookStateTypes';
import { ReaderState } from './state/readers/ReaderStateTypes';
import { BorrowState } from './state/borrows/BorrowStateTypes';

const reducer = combineReducers({
  bookState: bookReducer,
  readerState: readerReducer,
  borrowState: borrowReducer
});

export default function configureStore(preloadedState: any) {
  const middlewares = [ReduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  //Thunk is middleware
  //DevTools is an enhancer (actually changes Redux)
  //applyMiddleware wraps middleware and returns an enhancer

  // to use only thunk middleware
  // const enhancer = compose(middlewareEnhancer);

  //to use thunk & devTools
  const enhancer = composeWithDevTools(middlewareEnhancer);

  const store = createStore(reducer, preloadedState, enhancer);
  return store;
}

export interface AppState {
  bookState: BookState;
  readerState: ReaderState;
  borrowState: BorrowState;
}

export const initialAppState: AppState = {
    bookState: initialBookState,
    readerState: initialReaderState,
    borrowState: initialBorrowState
};

export const store = configureStore(initialAppState);

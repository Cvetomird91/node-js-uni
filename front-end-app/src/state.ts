import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { combineReducers } from 'redux';
import {
  initialBookState,
  bookReducer,
} from './state/BookReducer';
import {
  initialReaderState,
  readerReducer,
} from './state/ReaderReducer';
import { BookState } from './state/BookStateTypes';
import { ReaderState } from './state/ReaderStateTypes';

const reducer = combineReducers({
  bookState: bookReducer,
  readerState: readerReducer
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
}

export const initialAppState: AppState = {
    bookState: initialBookState,
    readerState: initialReaderState,
};

export const store = configureStore(initialAppState);

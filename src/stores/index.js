import { applyMiddleware, compose, createStore } from 'redux';
import { devTools, persistState as persistDevToolsState } from 'redux-devtools';
import rootReducer from 'reducers';
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import storeEnhancer from 'redux-history-transitions';
import { fromJS } from 'immutable';

const middleware = [thunk, multi];

if ( __DEBUG__ ) {
  middleware.push(loggerMiddleware());
}

const storage = compose(
  filter(['play', 'clubs', 'router'])
)(adapter(window.localStorage));

const reducer = compose(
  mergePersistedState((initialState, persistedState) => {
    return {
      play: fromJS(initialState.play).merge(fromJS(persistedState.play)),
      clubs: fromJS(initialState.clubs).merge(fromJS(persistedState.clubs))
    };
  }),
)(rootReducer);


const history = createHistory();

let createStoreWithMiddleware;

if (__DEBUG__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    reduxReactRouter({history}),
    storeEnhancer(history),
    persistState(storage, 'golftracr_dev'),
    devTools(),
    persistDevToolsState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    reduxReactRouter(history),
    storeEnhancer(history),
    persistState(storage, 'golftracr')
  )(createStore);
}


export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

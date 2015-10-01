import { applyMiddleware, compose, createStore } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import rootReducer from 'reducers';
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';
import multi from 'redux-multi';

import { fetchClubsIfNeeded } from 'actions';

let engine = createEngine('golfstats');

engine = storage.decorators.immutablejs(engine, [
    ['clubs'],
    ['play'],
    ['holes'],
    ['nav']
]);

const IGNORE_ACTIONS = [ 'REQUEST_CLUBS', 'REQUEST_HOLES', 'REQUEST_SCORECARDS', 'FILTER_ITEMS' ];
const middleware = [thunk, multi, storage.createMiddleware(engine, IGNORE_ACTIONS)];

if ( __DEBUG__ ) {
  middleware.push(loggerMiddleware());
}

let createStoreWithMiddleware;

if (__DEBUG__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
}

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  const load = storage.createLoader(engine);
  load(store)
    .then(() => store.dispatch(fetchClubsIfNeeded()))
    .catch((e) => window.console.warn(e, 'Failed to load previous state'));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

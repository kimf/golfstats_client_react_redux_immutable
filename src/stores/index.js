import { applyMiddleware, compose, createStore } from 'redux';
import { devTools } from 'redux-devtools';
import rootReducer from 'reducers';
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';
import { fetchClubsIfNeeded } from 'actions';

let engine = createEngine('golfstats');

engine = storage.decorators.immutablejs(engine, [
    ['clubs'],
    ['play'],
    ['holes']
]);

const middleware = [thunk, storage.createMiddleware(engine, [ 'REQUEST_CLUBS', 'REQUEST_HOLES' ])];

if ( __DEBUG__ ) {
  middleware.push(loggerMiddleware());
}

let createStoreWithMiddleware;

if (__DEBUG__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    devTools()
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
}

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  const load = storage.createLoader(engine);
  load(store)
    .then(() => store.dispatch(fetchClubsIfNeeded()))
    .catch(() => window.console.log('Failed to load previous state'));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

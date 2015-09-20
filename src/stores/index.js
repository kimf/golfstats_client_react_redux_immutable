import { applyMiddleware, compose, createStore } from 'redux';
import { devTools } from 'redux-devtools';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';

// const middleware = [thunk];
const middleware = __DEBUG__ ? [require('redux-immutable-state-invariant')(), thunk] : [thunk];

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

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

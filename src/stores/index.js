import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'
import createActionBuffer from 'redux-action-buffer'
import localForage from 'localforage'
import thunk from 'redux-thunk'

import rootReducer from 'reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      createActionBuffer(REHYDRATE)
    ),
    autoRehydrate()
  )
)

persistStore(store, { storage: localForage }) // .purge()

export default store
